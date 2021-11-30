import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Icons from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'

const PrimaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.btnPrimary}>
                <Icon name="align-center" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const SecondaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.btnPrimary, backgroundColor: COLORS.primary, marginHorizontal: 5, }}>
                <Icon name="chevrons-right" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const SuccessButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.btnPrimary, backgroundColor: COLORS.success, marginHorizontal: 5, width:'100%' }}>
                <Icon name="chevrons-right" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btnPrimary: {
        height: 50,
        width:150,
        marginHorizontal: 20,
        paddingHorizontal:10,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 17,
        fontWeight: '900',
        color: COLORS.white,
        paddingLeft: 20
    }
})

export { PrimaryButton, SecondaryButton, SuccessButton }