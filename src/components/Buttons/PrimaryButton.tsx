import React from 'react'
import {themeColors, themeFonts} from '../../utils'
import {Button} from 'react-native-paper-form-components'

type Props = {
    label: string
    onPress: () => void
    icon?: string
    bgColor?: string
    color?: string
}

const PrimaryButton: React.FC<Props> = ({label, onPress, icon, bgColor, color}) => {
    return (
        <Button
            mode="elevated"
            icon={icon}
            iconColor={color ?? 'white'}
            iconSize={25}
            bgColor={bgColor ?? themeColors.blue}
            labelColor={color ?? 'white'}
            label={label}
            labelStyle={{fontFamily: themeFonts.Poppins, fontSize: 16}}
            height={60}
            onPress={onPress}
            uppercase
            compact
            rounded={12}
        />
    )
}

export default PrimaryButton
