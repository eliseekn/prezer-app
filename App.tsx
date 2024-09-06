import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import {OnBoardingScreen} from './src/screens'
import {TabStack} from './src/navigation'
import ShopStack from './src/navigation/ShopStack'
import CartStack from './src/navigation/CartStack'
import {NavigationStack} from './src/interfaces'
import {useFonts} from 'expo-font'
import {Lato_400Regular, Lato_700Bold} from '@expo-google-fonts/lato'
import {Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'

const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    ...DefaultTheme.colors,
    colors: {
        primary: 'rgb(43, 88, 190)',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgb(218, 225, 255)',
        onPrimaryContainer: 'rgb(0, 24, 73)',
        secondary: 'rgb(88, 94, 113)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(221, 226, 249)',
        onSecondaryContainer: 'rgb(21, 27, 44)',
        tertiary: 'rgb(115, 84, 113)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(255, 214, 249)',
        onTertiaryContainer: 'rgb(43, 18, 43)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(254, 251, 255)',
        onBackground: 'rgb(27, 27, 31)',
        surface: 'rgb(254, 251, 255)',
        onSurface: 'rgb(27, 27, 31)',
        surfaceVariant: 'rgb(226, 226, 236)',
        onSurfaceVariant: 'rgb(69, 70, 79)',
        outline: 'rgb(117, 118, 128)',
        outlineVariant: 'rgb(197, 198, 208)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(48, 48, 52)',
        inverseOnSurface: 'rgb(242, 240, 244)',
        inversePrimary: 'rgb(179, 197, 255)',
        elevation: {
            level0: 'transparent',
            level1: 'rgb(243, 243, 252)',
            level2: 'rgb(237, 238, 250)',
            level3: 'rgb(231, 233, 248)',
            level4: 'rgb(229, 231, 247)',
            level5: 'rgb(225, 228, 246)',
        },
        surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
        onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
        backdrop: 'rgba(46, 48, 56, 0.4)',
    },
}

const Stack = createNativeStackNavigator<NavigationStack>()

const App: React.FC = () => {
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold,
        Poppins_400Regular,
        Poppins_700Bold,
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="OnBoarding">
                    <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{headerShown: false}} />
                    <Stack.Screen name="TabStack" component={TabStack} options={{headerShown: false}} />
                    <Stack.Screen name="ShopStack" component={ShopStack} options={{headerShown: false}} />
                    <Stack.Screen name="CartStack" component={CartStack} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </PaperProvider>
    )
}

export default App
