import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { Modal, ModalContent, ModalButton, ModalFooter, SlideAnimation, ModalTitle } from 'react-native-modals';
import StarRating from 'react-native-star-rating-widget';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react/cjs/react.development';
import userFemale from '../assets/avatar1.png'
import userMale from '../assets/avatar2.png'
import COLORS from '../assets/colors';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55
const MAX_HEIGHT = 170


const TutorDetailsScreen = ({route, navigation}) => {

    const { gender, name, location, subjects, salary } = route.params.details
     
    const [ratings, setRatings] = useState(0)
    const [visible, setVisible] = useState(false)

    const handleModalPressed = () => {
      setVisible(true)
    }

    const handleRating = (rate) => {
      setRatings(rate)
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
             <TouchableOpacity 
             activeOpacity={0.6}
             onPress={() => handleModalPressed()}
             >
             <View style={styles.callBg}>
                <Feather name="message-square" color={COLORS.grey} size={25} />
             </View>
             </TouchableOpacity>
           </View>

           {/* automatic messaging to the tutor from interested employer popup */}
           <Modal
    visible={visible}
    width={0.9}
    modalTitle={<ModalTitle title='Esther' />}
    onTouchOutside={() => setVisible(false)}
    modalAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
    footer={
        <ModalFooter>
          <ModalButton
            text="Leave Contact"
            onPress={() => {}}
          />
          <ModalButton
            text="Discard"
            onPress={() => setVisible(false)}
          />
        </ModalFooter>
      }
  >
    <ModalContent>
        <View>
            <Text style={{fontSize:15, lineHeight:22}}>{`Hello I am James, I just want to talk about tutoring service you offer. I left my contact, reach out to me for a conversation. Thanks`}</Text>
        </View>
    </ModalContent>
  </Modal>

           <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>I like to teach english, I was born in family of five children
             where education was as important as existence. I came with that open 
             mind to give back to my community throught tuturing.</Text>
            </View>
        
         <View style={styles.card}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Full Name</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{name}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Gender</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Male</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Email</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>muvunyiiddy@gmail.com</Text>
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Address</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{location}</Text>
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

         <View style={styles.personalWrapper}>
             <Text style={styles.title}>Professional Details</Text>
        
         <View style={styles.subjectWrapper}>
           {subjects.map((item, index) => (
           <View style={styles.subjectsBg} key={index}>
           <Text style={styles.subjectText}>{item}</Text>
           </View>
           ))}
         </View>

         <View style={{...styles.card, marginVertical:30}}>
         
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Overall Rating</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>4.2 / 5</Text>
             </View>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Availability</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>Mon - Friday | 4:30PM - 9:00PM</Text>
             </View>
            
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:2, fontWeight:'bold'}}>Monthly Salary Range</Text>
               <Text style={{...styles.textContent, flex:1, textAlign:'right'}}>RWF {salary}</Text>
             </View>
             </View>
         </View>

         <View style={styles.personalWrapper}>
         <Text style={styles.title}>Rate me</Text>
         <View style={{...styles.subjectWrapper, flexWrap:'nowrap'}}>
            <StarRating 
            rating={ratings}
            onChange={(rate) => handleRating(rate)}
            starSize={40}
            />
         </View>
         </View>

     </View>
     
    
    </ImageHeaderScrollView>
        </View>
    )
}

export default TutorDetailsScreen

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