import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import styles from '../../styles'
import {CategoryItemType, CategoryType, NavigationStack} from '../../interfaces'
import {CategoryCard} from '../../components'
import {RouteProp, useRoute} from '@react-navigation/native'
import {fetchApi, themeColors, themeFonts} from '../../utils'
import {ActivityIndicator, Text} from 'react-native-paper'
import Pagination from '../../components/Pagination'

type RouteProps = RouteProp<NavigationStack, 'CategoriesScreen'>

const CategoriesScreen: React.FC = () => {
    const route = useRoute<RouteProps>()
    const [categories, setCategories] = useState<CategoryType | undefined>(undefined)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)

        fetchApi('GET', `products-categories/shop/${route.params.shopId}?page=${page}&limit=20`)
            .then((res: Response) => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false))
    }, [refreshing])

    const handleOnRefreshing = (): void => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1000)
    }

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
                <ActivityIndicator animating={true} color={themeColors.blue} size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[styles.container, styles.baseHorizontalPadding, {paddingTop: 10}]}>
            {categories && categories?.items?.length > 0 && (
                <FlatList
                    data={categories?.items}
                    renderItem={({item}: {item: CategoryItemType}) => <CategoryCard category={item} />}
                    keyExtractor={(item: CategoryItemType): string => 'key_' + item.id}
                    initialNumToRender={10}
                    numColumns={2}
                    scrollEnabled={false}
                    onRefresh={handleOnRefreshing}
                    refreshing={refreshing}
                />
            )}

            {categories?.items?.length === 0 && (
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Text
                        style={{
                            color: themeColors.black,
                            fontFamily: themeFonts.Lato,
                            fontSize: 14,
                            marginTop: 8,
                            marginBottom: 10,
                        }}>
                        Aucun résultat trouvé
                    </Text>
                </View>
            )}

            {categories && (
                <Pagination
                    totalItems={categories?.meta?.totalItems}
                    page={page}
                    totalPage={categories?.meta?.totalPages}
                    onChange={setPage}
                />
            )}
        </SafeAreaView>
    )
}

export default CategoriesScreen
