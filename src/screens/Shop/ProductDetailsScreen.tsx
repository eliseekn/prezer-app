import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    View,
    Image,
    Dimensions,
    Animated,
    GestureResponderEvent,
    PanResponderGestureState,
    PanResponder,
    ScrollView,
} from 'react-native'
import styles from '../../styles'
import {Text, IconButton, RadioButton, ActivityIndicator} from 'react-native-paper'
import {fetchApi, formatPrice, themeColors, themeFonts} from '../../utils'
import {PrimaryButton} from '../../components'
import {type RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NavigationStack, ProductImageType, ProductItemType} from '../../interfaces'
import {useCartStore} from '../../stores/useCartStore'

type RouteProps = RouteProp<NavigationStack, 'ProductDetailsScreen'>
type NavigationProps = NativeStackNavigationProp<NavigationStack>

const ProductDetailsScreen: React.FC = () => {
    const {width} = Dimensions.get('window')
    const [imageIndex, setImageIndex] = useState<number>(0)
    const imageOffsetX = new Animated.Value(0)
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const [product, setProduct] = useState<ProductItemType | undefined>(undefined)
    const route = useRoute<RouteProps>()
    const [loading, setLoading] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const {addItem, itemExist, updateQuantity} = useCartStore()

    useEffect(() => {
        setLoading(true)

        fetchApi('GET', `products/${route?.params?.productId}`)
            .then((res: Response) => res.json())
            .then(data => setProduct(data))
            .finally(() => setLoading(false))
    }, [])

    const handleImageSwipe = (direction: 'left' | 'right') => {
        Animated.timing(imageOffsetX, {
            toValue: direction === 'left' ? -width : width,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            setImageIndex(
                (imageIndex + (direction === 'left' ? 1 : -1) + product?.productImages.length!) %
                    product?.productImages.length!,
            )
            imageOffsetX.setValue(0)
        })
    }

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            imageOffsetX.setValue(gestureState.dx)
        },
        onPanResponderRelease: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            if (Math.abs(gestureState.dx) > width * 0.25) {
                handleImageSwipe(gestureState.dx > 0 ? 'right' : 'left')
            } else {
                Animated.spring(imageOffsetX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start()
            }
        },
    })

    const handleIncreaseQuantity = () => {
        if (quantity < 5) {
            setQuantity(quantity + 1)
        }
    }

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        if (itemExist(product?.id!)) {
            updateQuantity(product?.id!, quantity)
        } else {
            addItem({
                id: product?.id!,
                quantity: quantity,
                product: product!,
            })
        }

        navigation.navigate('CartScreen')
    }

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
                <ActivityIndicator animating={true} color={themeColors.blue} size="large" />
            </SafeAreaView>
        )
    }

    if (!product) {
        return (
            <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Text
                        style={{
                            color: themeColors.black,
                            fontFamily: themeFonts.Lato,
                            fontSize: 14,
                            marginTop: 8,
                            marginBottom: 10,
                        }}>
                        Article indisponible
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Animated.View {...panResponder.panHandlers} style={{transform: [{translateX: imageOffsetX}]}}>
                    <Image
                        source={{uri: product?.productImages[imageIndex]?.photo}}
                        style={{width: width, height: '100%'}}
                    />
                </Animated.View>

                <View style={{alignItems: 'center'}}>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            top: -50,
                            position: 'absolute',
                        }}>
                        {product?.productImages?.map((image: ProductImageType, i: number) => {
                            return (
                                <RadioButton.Item
                                    key={image.id}
                                    label=""
                                    value={image.id.toString()}
                                    status={imageIndex === i ? 'checked' : 'unchecked'}
                                    style={{paddingHorizontal: 0}}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    paddingHorizontal: 30,
                    backgroundColor: 'white',
                }}>
                <Text
                    style={{
                        color: themeColors.blue,
                        fontFamily: themeFonts.LatoBold,
                        fontSize: 16,
                        marginBottom: 8,
                    }}
                    onPress={() => navigation.navigate('CategoriesScreen', {shopId: 1})}>
                    {product?.category?.name}
                </Text>
                <Text
                    style={{
                        color: themeColors.black,
                        fontFamily: themeFonts.LatoBold,
                        fontSize: 25,
                        marginBottom: 20,
                    }}>
                    {product?.name}
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{color: themeColors.dark, fontFamily: themeFonts.Lato, fontSize: 14}}>
                        {product?.description}
                    </Text>
                </ScrollView>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: 20,
                    }}>
                    <View>
                        <Text
                            style={{
                                color: themeColors.soft,
                                fontFamily: themeFonts.Lato,
                                fontSize: 14,
                            }}>
                            Prix
                        </Text>
                        <Text
                            style={{
                                color: themeColors.dark,
                                fontFamily: themeFonts.LatoBold,
                                fontSize: 24,
                            }}>
                            {formatPrice.format(product?.price as number)}
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
                                marginHorizontal: 10,
                            }}>
                            {quantity}
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

                <View style={{marginBottom: 20}}>
                    <PrimaryButton label="Ajouter au panier" icon="cart" onPress={handleAddToCart} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetailsScreen
