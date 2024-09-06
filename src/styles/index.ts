import {Platform, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    baseVerticalPadding: {
        paddingVertical: 40,
    },

    baseTopPadding: {
        paddingTop: 40,
    },

    baseHorizontalPadding: {
        paddingHorizontal: 15,
    },

    boxShadow: {},
})

if (Platform.OS === 'ios') {
    styles.boxShadow = {
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
} else if (Platform.OS === 'android') {
    styles.boxShadow = {
        zIndex: -1,
        elevation: 3,
        shadowColor: '#000',
    }
}

export default styles
