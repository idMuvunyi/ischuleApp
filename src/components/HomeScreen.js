import React from 'react'
import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image, Dimensions } from 'react-native'
import userImage from '../assets/user-male.png'
import userFemale from '../assets/avatar1.png'
import userMale from '../assets/avatar2.png'
import COLORS from '../assets/colors'
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'
import OptionsMenu from 'react-native-option-menu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HeaderTab from '../reusable-components/HeaderTab'
import { tutors } from '../rawData/tutors'




const width = Dimensions.get("screen").width

const HomeScreen = ({navigation, user}) => {


    const TutorSpace = ({items}) => {
        return(
          <TouchableOpacity 
          onPress={() => navigation.navigate('TutorDetailsScreen', {title: items.name, details: items})}
          >
           <Animatable.View 
            animation="pulse" easing="ease-out"
            style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={items.gender === 'F' ? userFemale : userMale} 
              style={{width:60, height:60}} 
              />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
                <View style={styles.nameTick}>
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
               {items.name}
              </Text>
              { items.name === 'Muvunyi Idrissa' ?
              <View style={styles.tickBg}>
                <Feather name="check" color={COLORS.white} size={14} />
             </View>
             :
             null
              }
                </View>
              
              
             <Text style={{fontSize: 14, color:COLORS.grey }}> 
               {items.subjects.slice(0, 2).join(", ")}
                 </Text>
              
              <Text style={{fontSize: 14, color:COLORS.secondary }}>
               {items.location}
              </Text>
            </View>
            <View style={styles.salaryWrapper}>
              <Text style={{fontSize:13, color:COLORS.textColor, textAlign:'right'}}>RWF</Text>
              <Text>{items.salary}</Text>
            </View>
          </Animatable.View>
          </TouchableOpacity>
           
        )
    }

    const handleMenuOptions = () => {}
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar backgroundColor={COLORS.primary} barStyle={Platform.OS === 'android' ? 'light-content': 'default' }/>
            <View style={styles.homeStyle}>
            <View style={styles.header}>
                <View>
                   <Text style={styles.wlcmText}>Hello, </Text>
                   <Text style={{fontSize:18, color:COLORS.secondary, fontWeight:'600'}}>{user}</Text>
                </View>
                <TouchableOpacity>
                <View>
                <OptionsMenu
                   button={userImage}
                    buttonStyle={{ height: 50, width: 50, borderRadius: 20 }}
                    destructiveIndex={2}
                    options={["My Profile", "Share App" ,"Sign out"]}
                    actions={[handleMenuOptions]}
                  />
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.searchWrapper}>
                <TextInput 
                placeholder="Find a tutor..."
                autoCapitalize="none"
                style={styles.searchInput}
                />
                <AntDesign name="search1" color={COLORS.textColor} size={28}  />
            </View>
            <HeaderTab />
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={tutors}
            renderItem={
              (({item}) => <TutorSpace items={item} />)
            }
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:15
       
    },
    homeStyle:{
        paddingTop:30,
        marginBottom:5
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    wlcmText:{
        fontSize:20
    },
    searchWrapper:{
        flexDirection:'row',
        marginTop:20,
        borderColor:COLORS.secondary,
        borderWidth:1,
        paddingHorizontal:10,
        paddingTop:10,
        borderRadius:5,
    },
    searchInput:{
       flex:1,
       marginTop: Platform.OS === 'ios' ? 0 : -12,
       fontSize:15,
    },
    cardItem: {
            backgroundColor: COLORS.white,
            borderRadius: 5,
            elevation: 1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical:15,
            marginBottom:5,
            borderRightWidth:3,
            borderRightColor:COLORS.secondary
          },
    salaryWrapper:{
      paddingRight:5
    },
    tickBg:{
      paddingVertical:2,
      paddingHorizontal:2,
      backgroundColor:'#B5CDA3',
      borderRadius:12,
      marginLeft:5,
      alignItems:'center'
    },
    nameTick:{
      flexDirection:'row',
      alignItems:'center'
    }
    
})