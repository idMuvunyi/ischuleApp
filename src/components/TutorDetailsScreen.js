import React from 'react'
import { useEffect } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, Platform, Alert, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { Modal, ModalContent, ModalButton, ModalFooter, SlideAnimation, ModalTitle } from 'react-native-modals';
import StarRating from 'react-native-star-rating-widget';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import userFemale from '../assets/avatar1.png'
import userMale from '../assets/avatar2.png'
import COLORS from '../assets/colors';


const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55
const MAX_HEIGHT = 170


const TutorDetailsScreen = ({route, navigation, userDetails}) => {

    const {
          id, 
          gender, 
           FirstName,
           lastName, 
           address, 
           courses, 
           salary, 
           salaryTo, 
           about, 
           email,
           edLevel,
           studyField,
           institution,
           graduated,
           ratings,
           availability,
           availableTime,

          } = route.params.details
     
          const {userId, user, userPhone, userType} = route.params

     
    const [rating, setRating] = useState(0)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
     
    const message = `Hello ${lastName}, I just want to talk about tutoring service you offer. I left my contact, reach out to me for a conversation. Thank You`

    const handleModalPressed = () => {
      setVisible(true)
    }

    const handleMessage = async () => {
      
      try {
      setLoading(true)
      let dates = new Date()

      if(userPhone === ""){
       Alert.alert('Missing Info','Add phone number on profile to continue')
       setVisible(false)
      }else{
       await firestore()
        .collection("messages")
        .add({
          senderId: userId,
          senderPhone:userPhone,
          senderName:user,
          receiverId:id,
          receiverName:`${FirstName} ${lastName}`,
          textMessage:message,
          createdAt:dates.toLocaleString(),
          seen:false
        })
        setLoading(false)
        setVisible(false)
        Alert.alert('Message','Sent Successfully!')
        

      }
        
      } catch (error) {
        setLoading(false)
        Alert.alert('Message','Could not send message. Try again')
      }
      
      

    }

    const handleRating = (rate) => {
      setRating(rate)
      //ToastAndroid.show(`you rated ${lastName}'s service ${rate}`, ToastAndroid.SHORT)
    }

    return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
    <ImageHeaderScrollView
      maxHeight={MAX_HEIGHT}
      minHeight={MIN_HEIGHT}
      maxOverlayOpacity={0.6}
      minOverlayOpacity={0.3}
      renderHeader={() => (
          <Image source={require('../assets/Books_header.jpeg')} 
          style={styles.image}
          />
      )}      
      renderForeground={() => (
        <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
            <Image source={gender === 'F' ? userFemale : userMale} style={styles.profileImage} />
        </View>
      )}
    >
    <TriggeringView>
         <View style={styles.personalWrapper}>
           <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5, alignItems:'center'}}>
             <Text style={styles.title}>Personal Details</Text>
             {
               userType !== 'tutor' &&
               <TouchableOpacity 
             activeOpacity={0.6}
             onPress={() => handleModalPressed()}
             >
             <View style={styles.callBg}>
                <Feather name="message-square" color={COLORS.grey} size={25} />
             </View>
             </TouchableOpacity>
             }
             
           </View>

           {/* automatic messaging to the tutor from interested employer popup */}
           <Modal
    visible={visible}
    width={0.9}
    modalTitle={<ModalTitle title={`Message : ${lastName}`} />}
    onTouchOutside={() => setVisible(false)}
    modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
    footer={
        <ModalFooter>
          <ModalButton
            text="Leave Contact"
            onPress={() => handleMessage()}
          />
          <ModalButton
            text="Cancel"
            onPress={() => setVisible(false)}
          />
        </ModalFooter>
      }
  >
    <ModalContent>
        <View>
            <Text style={{fontSize:15, lineHeight:22, paddingTop:10}}>{message}</Text>
        </View>
        {loading ? <ActivityIndicator color={COLORS.success} size="large" style={{justifyContent:'center', alignItems:'center'}}/> : null}
    </ModalContent>
  </Modal>

           <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>{about}</Text>
            </View>
        
         <View style={styles.card}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Full Name</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{`${FirstName} ${lastName}`}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Gender</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{gender}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Email</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{email}</Text>
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Address</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{address}</Text>
             </View>
         </View>
         </View>
     </TriggeringView>

     <View style={styles.section}>
     <View style={styles.personalWrapper}>
             <Text style={styles.title}>Academic Details</Text>
        
         <View style={styles.card}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Education Level</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{edLevel}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Field of study</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{studyField}</Text>
             </View>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Institution</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{institution}</Text>
             
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Graduated</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{graduated}</Text>
             </View>
         </View>
         </View>

         <View style={styles.personalWrapper}>
             <Text style={styles.title}>Professional Details</Text>
        
         <View style={styles.subjectWrapper}>
           {courses.split(',').map((item, index) => (
           <View style={styles.subjectsBg} key={index}>
           <Text style={styles.subjectText}>{item}</Text>
           </View>
           ))}
         </View>

         <View style={{...styles.card, marginVertical:30}}>
         
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Overall Rating</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{(Number(ratings) + 2.5).toFixed(1)} / 5</Text>
             </View>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Availability</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{`${availability} | ${availableTime}`}</Text>
             </View>
            
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:2, fontWeight:'bold'}}>Monthly Salary Range</Text>
               <Text style={{...styles.textContent, flex:1, textAlign:'right'}}>RWF {`${salary}K - ${salaryTo}K` }</Text>
             </View>
             </View>
         </View>
         {userType !== 'tutor' &&
         <View style={styles.personalWrapper}>
         <Text style={styles.title}>Rate me</Text>
         <View style={{...styles.subjectWrapper, flexWrap:'nowrap'}}>
            <StarRating 
            rating={rating}
            onChange={(rate) => handleRating(rate)}
            starSize={40}
            />
         </View>
         </View>
        }

     </View>
     
    
    </ImageHeaderScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      height: MAX_HEIGHT,
      width: Dimensions.get('window').width,
      alignSelf: 'stretch',
      resizeMode: 'cover',
    },
    title: {
      fontSize: 18,
      color:COLORS.primary,
      marginBottom:15
    },
   profileImage:{
     width:80,
     height:80,
     borderRadius:40,
     marginTop:30
   },
   personalWrapper:{
    marginHorizontal:10,
    marginTop:40
   },
   section: {
    paddingBottom: 40,
    minHeight:300
  },
   card:{
    backgroundColor:COLORS.white,
    borderRadius:3,
    elevation:2,
    alignItems:'center',
    paddingVertical:20,
    marginBottom:5,
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
   subjectText:{
     fontSize:14,
     color:COLORS.grey
   },
   callBg:{
     paddingVertical:10,
     paddingHorizontal:10,
     backgroundColor:'#CDF2CA',
     borderRadius:25,
   },
   aboutContainer:{
    marginTop:10,
    marginBottom:15,
    paddingHorizontal:10
},
aboutText:{
    fontSize:15,
    color:COLORS.grey,
    textAlign:'justify',
    paddingTop:5
},
  });

  const mapStateToProps = state => {
    const { userAuth } = state;
      return{
        userDetails: userAuth
      }
    }
  
export default connect(mapStateToProps, null)(TutorDetailsScreen)