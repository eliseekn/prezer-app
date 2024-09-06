import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, View} from 'react-native'
import styles from '../../styles'
import {ActivityIndicator, IconButton, Text} from 'react-native-paper'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NavigationStack, CategoryType, CategoryItemType} from '../../interfaces'
import {useNavigation} from '@react-navigation/native'
import {fetchApi, themeColors, themeFonts} from '../../utils'
import {PrimaryButton} from '../../components'
import {Checkbox, Input} from 'react-native-paper-form-components'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

type Props = {
    category: CategoryItemType
}

const Category: React.FC<Props> = ({category}) => {
    const [checked, setChecked] = useState<boolean>(false)

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Checkbox
                label={category.name}
                checked={checked}
                setChecked={setChecked}
                checkedColor={themeColors.blue}
                uncheckedColor={themeColors.blue}
                style={{flexDirection: 'row-reverse', paddingHorizontal: 0}}
                labelStyle={{
                    color: themeColors.black,
                    fontFamily: themeFonts.Lato,
                    fontSize: 16,
                    marginLeft: 10,
                }}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                    style={{
                        color: themeColors.soft,
                        fontFamily: themeFonts.Lato,
                        fontSize: 16,
                    }}>
                    {category.products?.length ?? 0} article(s)
                </Text>
            </View>
        </View>
    )
}

const FiltersScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const [categories, setCategories] = useState<CategoryType | undefined>(undefined)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)

        fetchApi('GET', 'products-categories?page=1&limit=100')
            .then((res: Response) => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false))
    }, [refreshing])

    const handleOnRefreshing = (): void => {
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1000)
    }

    return (
        <SafeAreaView style={[styles.container, styles.baseHorizontalPadding, styles.baseTopPadding]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconButton
                        icon="arrow-left"
                        style={{marginHorizontal: 0, marginRight: 5}}
                        size={28}
                        onPress={() => navigation.goBack()}
                    />

                    <Text
                        style={{
                            color: themeColors.black,
                            fontFamily: themeFonts.PoppinsBold,
                            fontSize: 20,
                        }}>
                        Filtres de recherche
                    </Text>
                </View>

                <IconButton icon="refresh" style={{marginHorizontal: 0}} size={28} />
            </View>

            <View style={{flex: 1}}>
                <View style={{paddingTop: 10}}>
                    <Text
                        style={{
                            color: themeColors.black,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 18,
                        }}>
                        Plage de prix
                    </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View style={{flex: 1, marginRight: 5}}>
                            <Input
                                label=""
                                placeholder="Prix min"
                                bgColor="#C7E9FD"
                                value={''}
                                onChangeText={() => {}}
                                type="number"
                                contentStyle={{fontFamily: themeFonts.Lato}}
                                height={61}
                                rounded={14}
                                outlineStyle={[styles.boxShadow, {borderWidth: 0}]}
                                mode="outlined"
                            />
                        </View>

                        <View style={{flex: 1, marginLeft: 5}}>
                            <Input
                                label=""
                                placeholder="Prix max"
                                bgColor="#C7E9FD"
                                value={''}
                                onChangeText={() => {}}
                                type="number"
                                contentStyle={{fontFamily: themeFonts.Lato}}
                                height={61}
                                rounded={14}
                                outlineStyle={[styles.boxShadow, {borderWidth: 0}]}
                                mode="outlined"
                            />
                        </View>
                    </View>
                </View>

                <View style={{paddingTop: 15}}>
                    <Text
                        style={{
                            color: themeColors.black,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 18,
                            marginBottom: 10,
                        }}>
                        Catégories
                    </Text>

                    {categories && categories?.items?.length > 0 && (
                        <FlatList
                            data={categories?.items}
                            renderItem={({item}: {item: CategoryItemType}) => <Category category={item} />}
                            keyExtractor={(item: CategoryItemType): string => 'key_' + item.id}
                            initialNumToRender={10}
                            scrollEnabled={false}
                            onRefresh={handleOnRefreshing}
                            refreshing={refreshing}
                        />
                    )}

                    {loading && (
                        <View style={{justifyContent: 'center'}}>
                            <ActivityIndicator animating={true} color={themeColors.blue} size="small" />
                        </View>
                    )}
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <PrimaryButton
                    label="Appliquer les filtres"
                    onPress={() => navigation.navigate('ProductsScreen', {})}
                />
            </View>
        </SafeAreaView>
    )
}

export default FiltersScreen
