import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../../assets/colors'
import { tutors } from '../../rawData/tutors'
import EditModalNumber from '../../reusable-components/EditModalNumber'
import EditModalAvailability from '../../reusable-components/EditModalAvailability'
import EditModalCourses from '../../reusable-components/EditModalCourses'
import { setInfo, updateUserInfoText } from '../../store/actions/actions'

const ProfessionalDetails = ({userDetails, setInfo}) => {

  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(true)
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [showCourseEdit, setShowCourseEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [refresh, setRefresh] = useState(false)


useEffect(() => {
    setUserInfo([...(userDetails !== null ? userDetails : [])])
    setFetching(false)
  }, [userDetails])

  useEffect(() => {
    handleUserInfo()
  },[visible, showCourseEdit, show, refresh])


  const handleRemoveSubject = (val, list) => {
    let listCourses = list.split(',')

    if(listCourses.length === 1){
      ToastAndroid.show("Courses can not be empty.", ToastAndroid.LONG);
      return
    }

    Alert.alert("Remove a Course", 
    `Are you sure you want to remove ${val} from your tutoring courses?`,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Remove", 
      onPress: () => handleRemoveCourse(val, list) }
    ])
  }

const handleRemoveCourse = (val, list) => {
 let arrCourses = list.split(',')
 let index  = arrCourses.indexOf(val)
 let updatedCourseString = '';

 if(index > -1){
   arrCourses.splice(index, 1)
   updatedCourseString = arrCourses.join(',')

   updateUserInfoText(updatedCourseString, "courses", (res, status) => {
    if(status){
       setRefresh(true)
      ToastAndroid.show("Course deleted successfully.", ToastAndroid.SHORT);
    }
    else{
      ToastAndroid.show("Can not remove a course, Try again.", ToastAndroid.SHORT);
    }
   }
    )
 }
 else{
  ToastAndroid.show("Can not remove a course, Try again.", ToastAndroid.SHORT);
 }
}

  const handleNewSubject = (data, label) => {
    setData([data, label])
    setShowCourseEdit(true)
   }

   const handleEditIconNumber = (val, label, valTo, labelTo) => {
    setData([val, label, valTo, labelTo])
    setVisible(true)
     }

     const handleEditIconAvailability = (val, label, valTo, labelTo) => {
      setData([val, label, valTo, labelTo])
      setShow(true)
       }


    const handleUserInfo = async () => {
        setInfo( (data, status) => {
      if(status){
        console.log('success')
      }
        })
      }


return(
  <ScrollView
      showsVerticalScrollIndicator={false}
      >
    <View style={styles.container}>
    {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
        : <>
        <View style={styles.subjectWrapper}>
        {userDetails && userDetails.length ?   
            userInfo.map((item) => (
              item.courses.split(',').map((item, index) => (
           <TouchableOpacity 
            activeOpacity={0.6} 
            key={index} 
            onPress={() => handleRemoveSubject(item, userInfo[0].courses)} >
             <View style={styles.subjectsBg}>
             <Text>{item}</Text>
              <AntDesign name="closecircleo" color={COLORS.success} size={16} style={{paddingLeft:5}}/>
            </View>
            </TouchableOpacity>
              ))
            
           )):null}
           <TouchableOpacity
           onPress={() => handleNewSubject(userInfo[0].courses, "courses")}
           >
           <View style={{...styles.subjectsBg, backgroundColor:COLORS.textColor, flexDirection:'row', alignItems:'center'}}>
               <AntDesign name="plus" color={COLORS.grey} size={15}/>
               <Text style={{fontSize:14, color:COLORS.grey,paddingLeft:5}}>New Course</Text>
            </View>
           </TouchableOpacity>
             
         </View>
         {userDetails && userDetails.length ?   
            userInfo.map((item, index) => (
         <View style={{...styles.card, marginTop:20}} key={index}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:2, fontWeight:'bold'}}>Monthly Salary Range</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:5, textAlign:'right'}}>{`RWF ${item.salary}-${item.salaryTo}K`}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconNumber(item.salary, "salary", item.salaryTo, "salaryTo")}
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
                onPress={() => handleEditIconAvailability(item.availability, "availability", item.availableTime, "availableTime" )}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
             </View>
             </View>

             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>My Ratings</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:5, textAlign:'right'}}>{(Number(item.ratings) + 2.5).toFixed(1)} / 5</Text>
               <View style={{flex:1}}></View>
             </View>
             </View>
             <EditModalNumber visible={visible} value={data} setVisible={setVisible} />
             <EditModalAvailability visible={show} value={data} setVisible={setShow} />
             <EditModalCourses visible={showCourseEdit} value={data} setVisible={setShowCourseEdit} />
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
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'space-around'
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

      const mapDispatchToProps = {
        setInfo,
      }
    
    export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetails)