import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'


const width = Dimensions.get("screen").width * (45 / 100)

const HeaderTab = () => {
const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)


    return (
        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        >
         <TouchableOpacity>
            <View style={{...styles.categoryBtn, 
                backgroundColor: selectedCategoryIndex === 0 ? COLORS.primary : COLORS.success }}>
                <View style={styles.categoryBtnBg}>
                  <AntDesign name="solution1" color={COLORS.secondary} size={20}/>
                </View>
                <Text style={{fontSize:15, fontWeight:'bold', marginLeft:10}}>All Tutors</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{...styles.categoryBtn, 
                backgroundColor: selectedCategoryIndex === 1 ? COLORS.primary : COLORS.secondary }}>
                <View style={styles.categoryBtnBg}>
                  <AntDesign name="swap" color={COLORS.secondary} size={20}/>
                </View>
                <Text style={{fontSize:15, fontWeight:'bold', marginLeft:10}}>Nearby Tutors</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={{...styles.categoryBtn, 
                backgroundColor: selectedCategoryIndex === 1 ? COLORS.primary : COLORS.secondary }}>
                <View style={styles.categoryBtnBg}>
                  <AntDesign name="star" color={COLORS.secondary} size={20}/>
                </View>
                <Text style={{fontSize:15, fontWeight:'bold', marginLeft:10}}>Most Rated</Text>
            </View>
        </TouchableOpacity>
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
        borderRadius:10,
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