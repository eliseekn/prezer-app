import React, {useState} from 'react'
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native'
import styles from '../../styles'
import {ActivityIndicator, Text} from 'react-native-paper'
import {fetchApi, themeColors, themeFonts} from '../../utils'
import {PrimaryButton} from '../../components'
import MapView, {Marker, Region} from 'react-native-maps'
import {useCartStore} from '../../stores/useCartStore'
import {NavigationStack} from '../../interfaces'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {OpenStreetMapSearchPlace, LocationType} from 'react-native-openstreetmap-search-places'
import {Input} from 'react-native-paper-form-components'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

const CheckoutScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const [location, setLocation] = useState<LocationType | undefined>(undefined)
    const [phoneNumber, setPhoneNumber] = React.useState<string>('')
    const [region] = useState<Region>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 180,
        longitudeDelta: 180,
    })
    const {cart, clearCart} = useCartStore()
    const [loading, setLoading] = useState<boolean>(false)

    const handleGetTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.quantity * item.product.price
        }, 0)
    }

    const handleProcessCheckout = () => {
        setLoading(true)

        fetchApi('POST', 'orders', {
            body: JSON.stringify({
                user_contact: phoneNumber,
                longitude: location?.lon,
                latitude: location?.lat,
                totalPrice: handleGetTotalPrice(),
                orderProducts: cart,
                status: 0,
            }),
        })
            .then((res: Response) => res.json())
            .then(d => {
                if (d.status === 200) {
                    clearCart()
                }

                navigation.navigate('OrderStatusScreen', {status: d.status === 200 ? 'success' : 'error'})
            })
            .catch(() => navigation.navigate('OrderStatusScreen', {status: 'network-error'}))
            .finally(() => setLoading(false))
    }

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, {justifyContent: 'center'}]}>
                <ActivityIndicator animating={true} color={themeColors.blue} size="large" />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                styles.baseHorizontalPadding,
                {paddingTop: 20, flex: 1, justifyContent: 'space-between'},
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    label="Numéro de téléphone"
                    labelStyle={{color: themeColors.dark, fontFamily: themeFonts.Poppins, fontSize: 14}}
                    placeholder="Saisissez votre numéro de téléphone"
                    mode="outlined"
                    height={61}
                    bgColor="#C7E9FD"
                    outlineStyle={[styles.boxShadow, {borderWidth: 0, marginHorizontal: 2}]}
                    rounded={14}
                    type="number"
                    contentStyle={{fontFamily: themeFonts.Lato}}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    leftIcon="cellphone"
                    iconSize={24}
                />

                <Text
                    style={{
                        color: themeColors.dark,
                        fontFamily: themeFonts.Poppins,
                        fontSize: 14,
                        marginTop: 20,
                    }}>
                    Adresse de livraison
                </Text>

                <OpenStreetMapSearchPlace
                    placeHolder="Entrez votre adresse de livraison"
                    searchPlaceHolder="Rechercher"
                    noResultFoundText="Aucun résultat trouvé"
                    location={location}
                    setLocation={setLocation}
                    mode="outlined"
                    dismissable
                    modalBgColor="white"
                    loaderSize="small"
                    style={{height: 61, backgroundColor: '#C7E9FD'}}
                    contentStyle={{fontFamily: themeFonts.Lato}}
                    outlineStyle={[styles.boxShadow, {borderRadius: 14, borderWidth: 0, marginHorizontal: 2}]}
                    searchBarStyle={{
                        backgroundColor: '#C7E9FD',
                        borderRadius: 12,
                        borderWidth: 0,
                        marginTop: 2,
                    }}
                    searchBarInputStyle={{fontFamily: themeFonts.Lato}}
                    searchResultLabelStyle={{fontSize: 14, fontFamily: themeFonts.Lato}}
                    loaderColor={themeColors.blue}
                    iconSize={24}
                    lang="fr"
                />

                <View style={{height: 450, marginTop: 20}}>
                    <MapView initialRegion={region} style={StyleSheet.absoluteFillObject}>
                        {location && (
                            <Marker
                                title={location.display_name}
                                coordinate={{
                                    latitude: parseFloat(location.lat),
                                    longitude: parseFloat(location.lon),
                                }}
                            />
                        )}
                    </MapView>
                </View>
            </ScrollView>

            {location && phoneNumber && (
                <View style={{marginVertical: 20}}>
                    <PrimaryButton label="Commander" onPress={handleProcessCheckout} icon="truck-delivery-outline" />
                </View>
            )}
        </SafeAreaView>
    )
}

export default CheckoutScreen
