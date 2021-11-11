import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import COLORS from '../../assets/colors'
import { tutors } from '../../rawData/tutors'
//import ModalSelector from 'react-native-modal-selector'

const ProfessionalDetails = () => {

        const addNewSubject = () => {
            alert('Item needs to be added')
        }
return(
    <View style={styles.container}>
        <View style={styles.subjectWrapper}>
           {tutors[5].subjects.map((item, index) => (
           <View style={styles.subjectsBg} key={index}>
           <Text style={styles.subjectText}>{item}</Text>
           </View>
           ))}
           <TouchableOpacity
           onPress={() => addNewSubject()}
           >
           <View style={{...styles.subjectsBg, backgroundColor:COLORS.textColor, flexDirection:'row', alignItems:'center'}}>
               <AntDesign name="plus" color={COLORS.grey} size={15}/>
               <Text style={{fontSize:14, color:COLORS.grey,paddingLeft:5}}>Add</Text>
            </View>
           </TouchableOpacity>
         </View>
         <View style={{...styles.card, marginTop:20}}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:2, fontWeight:'bold'}}>Monthly Salary Range</Text>
               <Text style={{...styles.textContent, flex:1, textAlign:'right'}}>RWF 30-70K</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Availability</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Mon - Friday | 4:30PM - 9:00PM</Text>
             </View>

             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>My Ratings</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>3.5</Text>
             </View>
             </View>
    </View>
)
}

export default ProfessionalDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30
    },
    subjectWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flexWrap:'wrap'
      },
      subjectsBg:{
        backgroundColor:'#CDF2CA',
        paddingVertical:10,
        paddingHorizontal:30,
        borderRadius:20,
        margin:3,
      },
    card:{
        backgroundColor:COLORS.white,
        borderRadius:3,
        elevation:0,
        alignItems:'center',
        paddingVertical:25,
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
       
    });