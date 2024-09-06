import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import styles from '../../styles'
import {ShopItemType, ShopType} from '../../interfaces'
import {ShopCard} from '../../components'
import {fetchApi, themeColors, themeFonts} from '../../utils'
import {ActivityIndicator, Text} from 'react-native-paper'
import Pagination from '../../components/Pagination'

const ShopsScreen: React.FC = () => {
    const [shops, setShops] = useState<ShopType | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)

        fetchApi('GET', `shops?page=${page}&limit=20`)
            .then((res: Response) => res.json())
            .then(data => setShops(data))
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
            {shops && shops?.items?.length > 0 && (
                <FlatList
                    data={shops?.items}
                    renderItem={({item}: {item: ShopItemType}) => <ShopCard shop={item} />}
                    keyExtractor={(item: ShopItemType): string => 'key_' + item.id}
                    initialNumToRender={10}
                    numColumns={2}
                    scrollEnabled={false}
                    onRefresh={handleOnRefreshing}
                    refreshing={refreshing}
                />
            )}

            {shops?.items?.length === 0 && (
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

            {shops && (
                <Pagination
                    totalItems={shops?.meta?.totalItems}
                    page={page}
                    totalPage={shops?.meta?.totalPages}
                    onChange={setPage}
                />
            )}
        </SafeAreaView>
    )
}

export default ShopsScreen
