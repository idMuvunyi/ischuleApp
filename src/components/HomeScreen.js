import React from 'react'
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native'
import COLORS from '../assets/colors'

const HomeScreen = ({navigation}) => {
    
    return (
        <View style={styles.wrapper}>
            <StatusBar backgroundColor={COLORS.primary} barStyle={Platform.OS === 'android' ? 'light-content': 'default' }/>
            <Text>Home Screen...</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})