import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MessagesScreen = () => {
    return (
        <View style={styles.wrapper}>
            <Text>Messages Screen...</Text>
        </View>
    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})