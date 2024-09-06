import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationStack} from '../interfaces'
import {
    ProductDetailsScreen,
    ProductsScreen,
    ShopsScreen,
    CategoriesScreen,
    FiltersScreen,
    HomeScreen,
    CheckoutScreen,
    CartScreen,
    OrderStatusScreen,
} from '../screens'
import {themeFonts} from '../utils'

const Stack = createNativeStackNavigator<NavigationStack>()

const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen
                name="ShopsScreen"
                component={ShopsScreen}
                options={{headerTitle: 'Nos boutiques', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{headerShown: false}} />
            <Stack.Screen name="FiltersScreen" component={FiltersScreen} options={{headerShown: false}} />
            <Stack.Screen
                name="CategoriesScreen"
                component={CategoriesScreen}
                options={{headerTitle: 'Catégories', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={{headerTitle: "Détails de l'article", headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{headerTitle: 'Votre panier', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{headerTitle: 'Procéder au paiement', headerTitleStyle: {fontFamily: themeFonts.PoppinsBold}}}
            />
            <Stack.Screen name="OrderStatusScreen" component={OrderStatusScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default HomeStack
