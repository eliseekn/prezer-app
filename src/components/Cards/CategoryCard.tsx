import React from 'react'
import {Card, Text} from 'react-native-paper'
import {NavigationStack, CategoryItemType} from '../../interfaces'
import {Dimensions, Image, View} from 'react-native'
import {themeColors, themeFonts} from '../../utils'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

type Props = {
    category: CategoryItemType
}

type NavigationProps = NativeStackNavigationProp<NavigationStack>

const CategoryCard: React.FC<Props> = ({category}) => {
    const navigation: NavigationProps = useNavigation<NavigationProps>()
    const {width} = Dimensions.get('window')
    const itemWidth: number = (width - 60) / 2

    return (
        <View style={{flex: 1}}>
            <Card
                style={{
                    width: 130,
                    margin: 8,
                    marginRight: 15,
                    backgroundColor: 'white',
                    minWidth: itemWidth,
                    maxWidth: itemWidth,
                    paddingBottom: 10,
                }}
                onPress={() => navigation.navigate('ProductsScreen', {categoryId: category.id})}
                mode="elevated">
                <Card.Content style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image source={{uri: category.image}} width={120} height={60} style={{marginBottom: 10}} />

                    <Text
                        style={{
                            textAlign: 'center',
                            color: themeColors.dark,
                            fontFamily: themeFonts.Lato,
                            fontSize: 16,
                        }}>
                        {category.name}
                    </Text>

                    <Text
                        style={{
                            color: themeColors.accent,
                            fontFamily: themeFonts.Poppins,
                            fontSize: 14,
                        }}>
                        {category.products?.length ?? 0} article(s)
                    </Text>
                </Card.Content>
            </Card>
        </View>
    )
}

export default CategoryCard
