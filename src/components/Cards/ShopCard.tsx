import React from 'react'
import {Card, Text} from 'react-native-paper'
import {NavigationStack, ShopItemType} from '../../interfaces'
import {Dimensions, Image, View} from 'react-native'
import {themeColors, themeFonts} from '../../utils'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

type Props = {
    shop: ShopItemType
    fullWidth?: boolean
}

const ShopCard: React.FC<Props> = ({shop, fullWidth = true}) => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const {width} = Dimensions.get('window')
    const itemWidth: number = fullWidth ? (width - 60) / 2 : 130

    return (
        <View style={{flex: 1}}>
            <Card
                style={{
                    width: 130,
                    margin: 8,
                    marginRight: 15,
                    backgroundColor: 'white',
                    minWidth: itemWidth,
                    maxWidth: itemWidth,
                    paddingBottom: 10,
                }}
                mode="elevated"
                onPress={() => navigation.navigate('CategoriesScreen', {shopId: shop.id})}>
                <Card.Content style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image source={{uri: shop.logo}} width={120} height={60} resizeMode="stretch" />

                    <Text
                        style={{
                            textAlign: 'center',
                            color: themeColors.blue,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 16,
                        }}>
                        {shop.shopName}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    )
}

export default ShopCard
