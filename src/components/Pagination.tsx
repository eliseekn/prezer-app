import React from 'react'
import {View} from 'react-native'
import {themeColors} from '../utils'
import PrimaryButton from './Buttons/PrimaryButton'

type Props = {
    totalItems: number
    page: number
    totalPage: number
    onChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({totalItems, page, onChange, totalPage}) => {
    const handleRenderPages = () => {
        const pages = []
        const startPage = Math.max(1, page - Math.floor(3 / 2))
        const endPage = Math.min(totalPage, startPage + 3 - 1)

        if (startPage > 1) {
            pages.push(
                <View style={{flex: 1, marginRight: 5}} key="startEllipsis">
                    <PrimaryButton label="..." onPress={() => {}} />
                </View>,
            )
        }

        if (startPage !== endPage) {
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <View style={{flex: 1, marginRight: 5}} key={i}>
                        <PrimaryButton
                            label={`${i}`}
                            onPress={() => onChange(i)}
                            color={page === i ? themeColors.blue : themeColors.soft}
                        />
                    </View>,
                )
            }
        }

        if (endPage < totalPage) {
            pages.push(
                <View style={{flex: 1, marginRight: 5}} key="endEllipsis">
                    <PrimaryButton label="..." onPress={() => {}} />
                </View>,
            )
        }

        return pages
    }

    if (totalItems) {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                {page > 1 && (
                    <View style={{flex: 1, marginRight: 5}}>
                        <PrimaryButton label="" onPress={() => onChange(page - 1)} icon="chevron-left" />
                    </View>
                )}

                {handleRenderPages()}

                {page < totalPage && (
                    <View style={{flex: 1, marginRight: 5}}>
                        <PrimaryButton label="" onPress={() => onChange(page + 1)} icon="chevron-right" />
                    </View>
                )}
            </View>
        )
    }

    return <></>
}

export default Pagination
