import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FeedScreen = () => {
    return (
        <View style={styles.wrapper}>
            <Text>Feed Screen...</Text>
        </View>
    )
}

export default FeedScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})