import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import COLORS from '../../assets/colors'

const AcademicDetails = () => (
    <View style={styles.container}>
         <View style={styles.card}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Education Level</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Bachelor Degree</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Field of study</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Computer Science with Education Management</Text>
             </View>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Institution</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>University of Tourism and Management Information systems</Text>
             
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Graduated</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>2019</Text>
             </View>
         </View>
    </View>
)

export default AcademicDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30
    },
    card:{
        backgroundColor:COLORS.white,
        borderRadius:3,
        elevation:0,
        alignItems:'center',
        paddingVertical:30,
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