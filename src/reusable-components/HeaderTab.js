import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'
import { categories } from '../rawData/categories'


const width = Dimensions.get("screen").width * (45 / 100)

const HeaderTab = () => {
const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)


    return (
        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
        {categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedCategoryIndex(index)}>
            <View style={{...styles.categoryBtn, 
                backgroundColor: selectedCategoryIndex === index ? COLORS.secondary : COLORS.textColor }}>
                <View style={styles.categoryBtnBg}>
                  <AntDesign name={category.image} color={COLORS.secondary} size={20}/>
                </View>
                <Text style={{fontSize:15, fontWeight:'bold', marginLeft:10, color: selectedCategoryIndex === index ? COLORS.white : null}}>{category.name}</Text>
            </View>
        </TouchableOpacity>
        ))}
        </ScrollView>
    )
}


export default HeaderTab

const styles = StyleSheet.create({
    container:{
        paddingVertical:30,
        paddingHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    categoryBtn:{
        height:45,
        width: width,
        marginRight:7,
        borderRadius:15,
        alignItems:'center',
        paddingHorizontal:5,
        flexDirection:'row'
    },
    categoryBtnBg:{
        backgroundColor:COLORS.white,
        width:35,
        height:35,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    }
})