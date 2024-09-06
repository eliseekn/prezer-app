import React from 'react'
import {Card, Text} from 'react-native-paper'
import {NavigationStack, ProductItemType} from '../../interfaces'
import {Dimensions, View} from 'react-native'
import {formatPrice, themeColors, themeFonts} from '../../utils'
import SecondaryButton from '../Buttons/SecondaryButton'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useCartStore} from '../../stores/useCartStore'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

type Props = {
    product: ProductItemType
}

const ProductCard: React.FC<Props> = ({product}) => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const {width} = Dimensions.get('window')
    const itemWidth: number = (width - 60) / 2
    const {addItem, removeItem, itemExist} = useCartStore()

    const handleAddProductToCart = () => {
        addItem({
            id: product.id,
            product: product,
            quantity: 1,
        })
    }

    const handleRemoveProductFromCart = () => removeItem(product.id)

    const inCart = (): boolean => itemExist(product.id)

    return (
        <View style={{flex: 1}}>
            <Card
                mode="elevated"
                style={{
                    margin: 8,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    minWidth: itemWidth,
                    maxWidth: itemWidth,
                    paddingBottom: 10,
                }}
                onPress={() => navigation.navigate('ProductDetailsScreen', {productId: product.id})}>
                <Card.Cover source={{uri: product.productImages[0].photo}} style={{height: 140}} />
                <Card.Content style={{paddingVertical: 10}}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: themeColors.blue,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 16,
                        }}>
                        {product.name}
                    </Text>

                    <Text
                        style={{
                            textAlign: 'center',
                            color: themeColors.accent,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 14,
                            marginVertical: 10,
                        }}>
                        {formatPrice.format(product.price)}
                    </Text>

                    {!inCart() && (
                        <SecondaryButton label="Ajouter au panier" onPress={handleAddProductToCart} icon="cart" />
                    )}
                    {inCart() && (
                        <SecondaryButton
                            label="Retirer du panier"
                            onPress={handleRemoveProductFromCart}
                            icon="cart-off"
                            bgColor={themeColors.accent}
                            color="white"
                        />
                    )}
                </Card.Content>
            </Card>
        </View>
    )
}

export default ProductCard
