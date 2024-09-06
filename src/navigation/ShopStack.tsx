import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationStack} from '../interfaces'
import {ShopsScreen, ProductsScreen, FiltersScreen, CategoriesScreen, ProductDetailsScreen} from '../screens'
import {themeFonts} from '../utils'

const Stack = createNativeStackNavigator<NavigationStack>()

const ShopStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="ShopsScreen">
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
        </Stack.Navigator>
    )
}

export default ShopStack
