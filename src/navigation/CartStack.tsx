import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationStack} from '../interfaces'
import {OrderStatusScreen, CheckoutScreen, CartScreen} from '../screens'
import {themeFonts} from '../utils'

const Stack = createNativeStackNavigator<NavigationStack>()

const CartStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="CartScreen">
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{headerTitle: 'Votre panier', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{headerTitle: 'Passer la commande', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen name="OrderStatusScreen" component={OrderStatusScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default CartStack
