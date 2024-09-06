import React from 'react'
import {FlatList, Image, Pressable, SafeAreaView, View} from 'react-native'
import styles from '../../styles'
import {CartItemType, NavigationStack} from '../../interfaces'
import {Divider, IconButton, Text} from 'react-native-paper'
import {formatPrice, themeColors, themeFonts, truncate} from '../../utils'
import {PrimaryButton} from '../../components'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {useCartStore} from '../../stores/useCartStore'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

type Props = {
    item: CartItemType
}

const CartItemCard: React.FC<Props> = ({item}) => {
    const {updateQuantity, removeItem} = useCartStore()
    const navigation: NavigationProps = useNavigation<NavigationProps>()

    const handleIncreaseQuantity = () => {
        if (item.quantity < 5) {
            updateQuantity(item.id, item.quantity + 1)
        }
    }

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1)
        }
    }

    const handleRemoveItem = () => removeItem(item.id)

    return (
        <View style={[styles.baseHorizontalPadding, {paddingVertical: 10}]}>
            <Pressable
                style={{flexDirection: 'row'}}
                onPress={() => navigation.navigate('ProductDetailsScreen', {productId: item.id})}>
                <Image
                    source={{uri: item.product.productImages[0].photo}}
                    width={65}
                    height={60}
                    style={{borderRadius: 12}}
                    resizeMode="stretch"
                />

                <View style={{marginLeft: 15}}>
                    <Text
                        style={{
                            color: themeColors.blue,
                            fontFamily: themeFonts.LatoBold,
                            fontSize: 18,
                            marginBottom: 5,
                            width: 300,
                        }}>
                        {item.product.name}
                    </Text>

                    <Text
                        style={{
                            color: themeColors.soft,
                            fontFamily: themeFonts.Lato,
                            fontSize: 14,
                            width: 300,
                        }}>
                        {truncate(item.product.description, 100)}
                    </Text>
                </View>

                <IconButton
                    icon="cart-off"
                    iconColor="white"
                    style={{
                        position: 'absolute',
                        borderWidth: 1,
                        borderRadius: 12,
                        backgroundColor: themeColors.accent,
                        right: 0,
                        top: -15,
                    }}
                    size={20}
                    onPress={handleRemoveItem}
                />
            </Pressable>

            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                        <Text
                            style={{
                                color: themeColors.accent,
                                fontFamily: themeFonts.LatoBold,
                                fontSize: 16,
                                left: 80,
                            }}>
                            {formatPrice.format(item.product.price)}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <IconButton
                            icon="minus"
                            iconColor="black"
                            style={{borderWidth: 1, borderRadius: 12, borderColor: themeColors.grey}}
                            size={20}
                            onPress={handleDecreaseQuantity}
                        />
                        <Text
                            style={{
                                color: themeColors.dark,
                                fontFamily: themeFonts.Lato,
                                fontSize: 18,
                                marginHorizontal: 5,
                            }}>
                            {item.quantity}
                        </Text>
                        <IconButton
                            icon="plus"
                            iconColor="black"
                            style={{borderWidth: 1, borderRadius: 12, borderColor: themeColors.grey}}
                            size={20}
                            onPress={handleIncreaseQuantity}
                        />
                    </View>
                </View>
            </View>

            <Divider />
        </View>
    )
}

const CartScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const {cart} = useCartStore()

    const handleGetTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.quantity * item.product.price
        }, 0)
    }

    return (
        <SafeAreaView style={[styles.container, {paddingTop: 10}]}>
            <FlatList
                data={cart}
                renderItem={({item}: {item: CartItemType}) => <CartItemCard item={item} />}
                keyExtractor={(item: CartItemType): string => 'key_' + item.id}
                initialNumToRender={10}
                scrollEnabled={false}
            />

            <View style={[styles.baseHorizontalPadding, {marginVertical: 20}]}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                    }}>
                    <Text style={{color: themeColors.dark, fontFamily: themeFonts.LatoBold, fontSize: 18}}>
                        Prix Total
                    </Text>

                    <Text style={{fontFamily: themeFonts.LatoBold, fontSize: 18, color: themeColors.accent}}>
                        {formatPrice.format(handleGetTotalPrice())}
                    </Text>
                </View>

                {handleGetTotalPrice() > 0 && (
                    <PrimaryButton label="Passer la commande" onPress={() => navigation.navigate('CheckoutScreen')} />
                )}
            </View>
        </SafeAreaView>
    )
}

export default CartScreen
