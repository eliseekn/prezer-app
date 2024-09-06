import React from 'react'
import {Text} from 'react-native-paper'
import {Image, View} from 'react-native'
import {themeColors, themeFonts} from '../../utils'

export type Props = {
    image: any
    title: string
    description: string
}

const Page: React.FC<Props> = ({image, title, description}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}}>
            <Image source={image} />
            <Text
                style={{
                    color: themeColors.dark,
                    fontFamily: themeFonts.PoppinsBold,
                    fontSize: 22,
                    textAlign: 'center',
                    lineHeight: 32,
                }}>
                {title}
            </Text>
            <Text
                style={{
                    paddingTop: 15,
                    color: themeColors.dark,
                    fontFamily: themeFonts.Lato,
                    fontSize: 16,
                    textAlign: 'center',
                    lineHeight: 18,
                }}>
                {description}
            </Text>
        </View>
    )
}

export default Page
