import {Text} from 'react-native-paper'
import React from 'react'
import {Image, SafeAreaView, View} from 'react-native'
import {themeColors, themeFonts} from '../../utils'
import styles from '../../styles'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {NavigationStack} from '../../interfaces'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {PrimaryButton} from '../../components'

type RouteProps = RouteProp<NavigationStack, 'OrderStatusScreen'>
type NavigationProps = NativeStackNavigationProp<NavigationStack>

const OrderStatusScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const route = useRoute<RouteProps>()

    const getPageData = () => {
        switch (route.params.status) {
            case 'success':
                return {
                    image: require('../../../assets/icon-success.png'),
                    title: 'Commande passée avec succès',
                }

            case 'error':
                return {
                    image: require('../../../assets/icon-success.png'),
                    title: 'Commande passée avec succès',
                }

            default:
                return {
                    image: require('../../../assets/icon-network-error.png'),
                    title: 'Erreur réseau',
                }
        }
    }

    return (
        <SafeAreaView style={[styles.container, styles.baseVerticalPadding]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}}>
                <Image source={getPageData().image} />
                <Text
                    style={{
                        color: themeColors.dark,
                        fontFamily: themeFonts.LatoBold,
                        fontSize: 22,
                        textAlign: 'center',
                        lineHeight: 32,
                        marginVertical: 20,
                    }}>
                    {getPageData().title}
                </Text>

                <PrimaryButton label="Retour" onPress={() => navigation.navigate('CartScreen')} />
            </View>
        </SafeAreaView>
    )
}

export default OrderStatusScreen
