import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import styles from '../../styles'
import {ActivityIndicator, IconButton, Searchbar, Text} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {ProductType, NavigationStack, ProductItemType} from '../../interfaces'
import {useNavigation} from '@react-navigation/native'
import {fetchApi, themeColors, themeFonts} from '../../utils'
import {ProductCard} from '../../components'
import {useRoute} from '@react-navigation/native'
import type {RouteProp} from '@react-navigation/native'
import Pagination from '../../components/Pagination'

type NavigationProps = NativeStackNavigationProp<NavigationStack>
type RouteProps = RouteProp<NavigationStack, 'ProductsScreen'>

const ProductsScreen: React.FC = () => {
    const route = useRoute<RouteProps>()
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const [searchQuery, setSearchQuery] = useState<string>(route.params?.searchQuery ?? '')
    const [products, setProducts] = useState<ProductType | undefined>(undefined)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)

        fetchApi('GET', `products/category/${route.params.categoryId}?page=${page}&limit=20&search=${searchQuery}`)
            .then((res: Response) => res.json())
            .then(data => setProducts(data))
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
        <SafeAreaView style={[styles.container, styles.baseTopPadding]}>
            <View style={[styles.baseHorizontalPadding, {flexDirection: 'row', alignItems: 'center'}]}>
                <IconButton
                    icon="arrow-left"
                    style={{marginHorizontal: 0, flex: 1, marginRight: 5}}
                    size={28}
                    onPress={() => navigation.goBack()}
                />

                <Searchbar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Rechercher un article"
                    inputStyle={{fontFamily: themeFonts.Lato}}
                    style={{
                        width: 282,
                        backgroundColor: '#C7E9FD',
                        borderRadius: 12,
                        borderColor: themeColors.grey,
                        borderWidth: 1,
                        marginBottom: 10,
                        flex: 10,
                        marginLeft: 5,
                    }}
                    onEndEditing={() =>
                        navigation.navigate('ProductsScreen', {
                            searchQuery: searchQuery,
                            categoryId: route.params.categoryId,
                        })
                    }
                    right={() => (
                        <IconButton
                            icon="filter"
                            style={{marginHorizontal: 0}}
                            size={28}
                            onPress={() => navigation.navigate('FiltersScreen')}
                        />
                    )}
                />
            </View>

            {products && products?.items?.length > 0 && (
                <View style={[styles.baseHorizontalPadding, {paddingTop: 20}]}>
                    <FlatList
                        data={products?.items}
                        renderItem={({item}: {item: ProductItemType}) => <ProductCard product={item} />}
                        keyExtractor={(item: ProductItemType): string => 'key_' + item.id}
                        initialNumToRender={5}
                        numColumns={2}
                        scrollEnabled={false}
                        onRefresh={handleOnRefreshing}
                        refreshing={refreshing}
                    />
                </View>
            )}

            {products?.items?.length === 0 && (
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

            {products && (
                <Pagination
                    totalItems={products?.meta?.totalItems}
                    page={page}
                    totalPage={products?.meta?.totalPages}
                    onChange={setPage}
                />
            )}
        </SafeAreaView>
    )
}

export default ProductsScreen
