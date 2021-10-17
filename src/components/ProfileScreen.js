import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileScreen = () => {
    return (
        <View style={styles.wrapper}>
            <Text>Profile Screen...</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})