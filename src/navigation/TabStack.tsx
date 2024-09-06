import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationStack} from '../interfaces'
import {Badge, IconButton} from 'react-native-paper'
import {themeColors, themeFonts} from '../utils'
import {View} from 'react-native'
import ShopStack from './ShopStack'
import CartStack from './CartStack'
import HomeStack from './HomeStack'
import {useCartStore} from '../stores/useCartStore'

const Stack = createBottomTabNavigator<NavigationStack>()

const TabStack: React.FC = () => {
    const {cart} = useCartStore()

    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => {
                    switch (route.name) {
                        case 'HomeStack':
                            return <IconButton icon="home" iconColor={color} size={34} />
                        case 'ShopStack':
                            return <IconButton icon="store" iconColor={color} size={34} />
                        case 'CartStack':
                            return (
                                <View>
                                    <IconButton icon="cart" iconColor={color} size={34} />
                                    {cart.length > 0 && (
                                        <Badge
                                            size={12}
                                            style={{
                                                position: 'absolute',
                                                top: 15,
                                                right: 14,
                                                borderColor: 'white',
                                                borderWidth: 1,
                                                backgroundColor: '#FFA902',
                                            }}
                                        />
                                    )}
                                </View>
                            )
                        default:
                            return <IconButton icon="account" iconColor={color} size={34} />
                    }
                },

                tabBarActiveTintColor: themeColors.blue,
                tabBarInactiveTintColor: themeColors.soft,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: themeColors.soft,
                    paddingVertical: 5,
                },
            })}>
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Accueil',
                    tabBarLabelStyle: {fontFamily: themeFonts.PoppinsBold},
                }}
            />
            <Stack.Screen
                name="ShopStack"
                component={ShopStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Nos boutiques',
                    tabBarLabelStyle: {fontFamily: themeFonts.PoppinsBold},
                }}
            />
            <Stack.Screen
                name="CartStack"
                component={CartStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Votre panier',
                    tabBarLabelStyle: {fontFamily: themeFonts.PoppinsBold},
                }}
            />
        </Stack.Navigator>
    )
}

export default TabStack
