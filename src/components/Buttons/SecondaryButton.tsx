import React from 'react'
import {themeColors, themeFonts} from '../../utils'
import {Button} from 'react-native-paper-form-components'

type Props = {
    label: string
    onPress: () => void
    bgColor?: string
    color?: string
    icon?: string
}

const SecondaryButton: React.FC<Props> = ({label, onPress, bgColor, color, icon}) => {
    return (
        <Button
            mode="elevated"
            icon={icon}
            iconColor={color ?? themeColors.blue}
            iconSize={20}
            bgColor={bgColor ?? '#C7E9FD'}
            labelColor={color ?? themeColors.blue}
            label={label}
            labelStyle={{fontFamily: themeFonts.Lato, fontSize: 12}}
            onPress={onPress}
            compact
            rounded={12}
        />
    )
}

export default SecondaryButton
