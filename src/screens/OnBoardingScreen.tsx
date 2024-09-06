import React, {useCallback, useRef, useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NavigationStack} from '../interfaces'
import {SafeAreaView, View} from 'react-native'
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view'
import {Page, PrimaryButton} from '../components'
import {RadioButton} from 'react-native-paper'
import styles from '../styles'
import {Props as PageProps} from '../components/OnBoarding/Page'

type NavigationProps = NativeStackNavigationProp<NavigationStack>

const screens: PageProps[] = [
    {
        image: require('../../assets/OnBoarding/Screen1.png'),
        title: 'Bienvenue dans le jardin des secrets avec Prezer',
        description: 'Votre nouvelle destination sex shop en ligne.',
    },

    {
        image: require('../../assets/OnBoarding/Screen2.png'),
        title: 'Prêt à explorer \n Prezer ?',
        description: 'Découvrez une nouvelle façon de faire vos courses en ligne.',
    },
]

const OnBoardingScreen: React.FC = () => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const pagerRef: React.RefObject<PagerView> = useRef<PagerView>(null)
    const [page, setPage] = useState<number>(0)

    const handleChangePage = (pageNumber: number): void => {
        if (pagerRef.current) {
            setPage(pageNumber)
            pagerRef.current.setPage(pageNumber)
        }
    }

    return (
        <SafeAreaView style={[styles.container, styles.baseVerticalPadding]}>
            <PagerView
                style={{flex: 1}}
                initialPage={page}
                ref={pagerRef}
                onPageSelected={(e: PagerViewOnPageSelectedEvent) => setPage(e.nativeEvent.position)}>
                {screens.map((screen: PageProps, i: number) => {
                    return (
                        <View key={i}>
                            <Page image={screen.image} title={screen.title} description={screen.description} />
                        </View>
                    )
                })}
            </PagerView>

            <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <RadioButton.Item
                        label=""
                        value="first"
                        status={page === 0 ? 'checked' : 'unchecked'}
                        style={{paddingHorizontal: 0}}
                    />
                    <RadioButton.Item
                        label=""
                        value="second"
                        status={page === 1 ? 'checked' : 'unchecked'}
                        style={{paddingHorizontal: 0}}
                    />
                </View>
            </View>

            <View style={styles.baseHorizontalPadding}>
                {page === 0 && <PrimaryButton label="Suivant" onPress={() => handleChangePage(1)} />}
                {page === 1 && <PrimaryButton label="Commencer" onPress={() => navigation.navigate('TabStack')} />}
            </View>
        </SafeAreaView>
    )
}

export default OnBoardingScreen
