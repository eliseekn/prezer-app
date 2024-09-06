import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Searchbar, Text} from 'react-native-paper'
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native'
import styles from '../styles'
import {fetchApi, themeColors, themeFonts} from '../utils'
import {NavigationStack, ProductItemType, ProductType, ShopItemType, ShopType} from '../interfaces'
import {ProductCard, ShopCard} from '../components'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

const HomeScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [shops, setShops] = useState<ShopType | undefined>(undefined)
    const [products, setProducts] = useState<ProductType | undefined>(undefined)
    const [loadingShops, setLoadingShops] = useState<boolean>(false)
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)

    useEffect(() => {
        setLoadingShops(true)

        fetchApi('GET', 'shops?page=1&limit=5')
            .then((res: Response) => res.json())
            .then(data => setShops(data))
            .finally(() => setLoadingShops(false))
    }, [])

    useEffect(() => {
        setLoadingProducts(true)

        fetchApi('GET', 'products?page=1&limit=6')
            .then((res: Response) => res.json())
            .then(data => setProducts(data))
            .finally(() => setLoadingProducts(false))
    }, [refreshing])

    const handleOnRefreshing = (): void => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1000)
    }

    return (
        <SafeAreaView style={[styles.container, styles.baseTopPadding]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={[
                        styles.baseHorizontalPadding,
                        {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'},
                    ]}>
                    <View>
                        <Text style={{color: themeColors.black, fontFamily: themeFonts.Lato, fontSize: 14}}>
                            Bonjour !
                        </Text>
                        <Text
                            style={{
                                color: themeColors.blue,
                                fontFamily: themeFonts.PoppinsBold,
                                fontSize: 24,
                                lineHeight: 50,
                            }}>
                            Prezier. 👋
                        </Text>
                    </View>
                </View>

                <View style={[styles.baseHorizontalPadding, {paddingTop: 20}]}>
                    <Searchbar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Rechercher un article"
                        inputStyle={{fontFamily: themeFonts.Lato}}
                        elevation={1}
                        style={{
                            backgroundColor: '#C7E9FD',
                            borderRadius: 12,
                            borderWidth: 0,
                        }}
                        onEndEditing={() => navigation.navigate('ProductsScreen', {searchQuery: searchQuery})}
                    />
                </View>

                <View style={{paddingTop: 10}}>
                    <View
                        style={[
                            styles.baseHorizontalPadding,
                            {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
                        ]}>
                        <Text
                            style={{
                                color: themeColors.black,
                                fontFamily: themeFonts.LatoBold,
                                fontSize: 18,
                                lineHeight: 50,
                            }}>
                            Boutiques
                        </Text>

                        <Text
                            style={{color: themeColors.black, fontFamily: themeFonts.Lato, fontSize: 14}}
                            onPress={() => navigation.navigate('ShopsScreen')}>
                            Toutes nos boutiques
                        </Text>
                    </View>

                    {shops && shops?.items?.length > 0 && (
                        <ScrollView
                            horizontal
                            decelerationRate={0}
                            snapToAlignment="center"
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15}}>
                            {shops?.items?.map((shop: ShopItemType, i: number) => (
                                <ShopCard key={i} shop={shop} fullWidth={false} />
                            ))}
                        </ScrollView>
                    )}

                    {loadingShops && (
                        <View style={{justifyContent: 'center'}}>
                            <ActivityIndicator animating={true} color={themeColors.blue} size="small" />
                        </View>
                    )}
                </View>

                <View style={styles.baseHorizontalPadding}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text
                            style={{
                                color: themeColors.black,
                                fontFamily: themeFonts.LatoBold,
                                fontSize: 18,
                                lineHeight: 50,
                            }}>
                            Articles
                        </Text>

                        <Text
                            style={{
                                color: themeColors.black,
                                fontFamily: themeFonts.Lato,
                                fontSize: 14,
                            }}
                            onPress={() => navigation.navigate('ProductsScreen', {})}>
                            Tous nos articles
                        </Text>
                    </View>

                    {products && products?.items?.length > 0 && (
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
                    )}

                    {loadingProducts && (
                        <View style={{justifyContent: 'center'}}>
                            <ActivityIndicator animating={true} color={themeColors.blue} size="small" />
                        </View>
                    )}

                    <View style={{marginBottom: 10}} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
