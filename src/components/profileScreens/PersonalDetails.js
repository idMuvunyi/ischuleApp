import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import COLORS from '../../assets/colors'

const PersonalDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.aboutContainer}>
        <Text style={{fontSize:17, fontWeight:'bold'}}>About</Text>
        <Text style={styles.aboutText}>I like to teach english, I was born in family of five children
             where education was as important as existence. I came with that open 
             mind to give back to my community throught tuturing.</Text>
            </View>

            <View style={styles.card}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Full Name</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Twiringiyimana Eduard</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Email</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>muvunyiiddy@gmail.com</Text>
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Address</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Nyaruguru District</Text>
             </View>
         </View>
    </View>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:20
    },
    aboutContainer:{
        marginVertical:20,
        paddingHorizontal:20
    },
    aboutText:{
        fontSize:15,
        color:COLORS.grey,
        textAlign:'justify',
        paddingTop:5
    },
    card:{
        backgroundColor:COLORS.white,
        borderRadius:3,
        elevation:0,
        alignItems:'center',
        paddingVertical:25,
        marginBottom:5,
        margin:10
       },
       cardContent:{
         flexDirection:'row',
         justifyContent:'space-between',
         borderBottomWidth:1,
         borderBottomColor:COLORS.textColor,
         paddingVertical:7,
         width:'95%',
       },
       textContent:{
         fontSize:14,
         color:COLORS.grey
       },

})