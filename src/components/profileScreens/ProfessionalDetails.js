import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../../assets/colors'
import { tutors } from '../../rawData/tutors'

const ProfessionalDetails = ({userDetails}) => {

  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(true)

useEffect(() => {
    setUserInfo([...(userDetails !== null ? userDetails : [])])
    setFetching(false)
  }, [userDetails])

  const addNewSubject = () => {
  alert('Item needs to be added')
   }

   const handleEditIconNumber = (val, label) => {
    alert(label)
     }

return(
  <ScrollView
      showsVerticalScrollIndicator={false}
      >
    <View style={styles.container}>
    {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
        : <>
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
         {userInfo && userInfo.length ?   
            userInfo.map((item, index) => (
         <View style={{...styles.card, marginTop:20}} key={index}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:2, fontWeight:'bold'}}>Monthly Salary Range</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:5, textAlign:'right'}}>{`RWF ${item.salary}-${item.salaryTo}K`}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconNumber(item.salary, "salary")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
               </View>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Availability</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:5, textAlign:'right'}}>{`${item.availability} | ${item.availableTime}`}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconNumber(item.salary, "salary")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
             </View>
             </View>

             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>My Ratings</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:5, textAlign:'right'}}>{Number(item.ratings).toFixed(1)}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconNumber(item.salary, "salary")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
             </View>
             </View>
             </View>
             )): 
             null
               }
                 </>
            }
    </View>
    </ScrollView>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:30
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
        elevation:1,
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
       textIconWrapper:{
        flexDirection:'row'
      }

       
    });

    const mapStateToProps = state => {
      const { userAuth } = state;
        return{
          userDetails: userAuth
        }
      }
    
    export default connect(mapStateToProps, null)(ProfessionalDetails)