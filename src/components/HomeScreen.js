import React from 'react'
import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image, Dimensions, ScrollView } from 'react-native'
import userImage from '../assets/user-male.png'
import userFemale from '../assets/avatar1.png'
import userMale from '../assets/avatar2.png'
import COLORS from '../assets/colors'
import * as Animatable from 'react-native-animatable'
import OptionsMenu from 'react-native-option-menu'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HeaderTab from '../reusable-components/HeaderTab'



const width = Dimensions.get("screen").width

const HomeScreen = ({navigation, user}) => {


    const TutorSpace = () => {
        return(
            <>
            <Animatable.View 
            animation="bounceIn"
            style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={userFemale} style={{width:60, height:60}} />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
               Tuyishime Eduard
              </Text>
              <Text style={{fontSize: 14, color:COLORS.grey }}>
               Math, English, Geography...
              </Text>
            </View>
          </Animatable.View>

          <View style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={userFemale} style={{width:60, height:60}} />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
               Twiringiyimana Esther
              </Text>
              <Text style={{fontSize: 14, color:COLORS.grey }}>
               computer science, English, Economy...
              </Text>
            </View>
          </View>
          <View style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={userMale} style={{width:60, height:60}} />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
               Tuyishime Eduard
              </Text>
              <Text style={{fontSize: 14, color:COLORS.grey }}>
               Math, English, Geography...
              </Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={userMale} style={{width:60, height:60}} />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
               Tuyishime Eduard
              </Text>
              <Text style={{fontSize: 14, color:COLORS.grey }}>
               Math, English, Geography...
              </Text>
            </View>
          </View>

          <View style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={userMale} style={{width:60, height:60}} />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
               Tuyishime Eduard
              </Text>
              <Text style={{fontSize: 14, color:COLORS.grey }}>
               Math, English, Geography...
              </Text>
            </View>
          </View>
          </>
        )
    }

    const handleMenuOptions = () => {}
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar backgroundColor={COLORS.primary} barStyle={Platform.OS === 'android' ? 'light-content': 'default' }/>
            <View style={styles.homeStyle}>
            <View style={styles.header}>
                <View>
                   <Text style={styles.wlcmText}>Welcome, </Text>
                   <Text style={{fontSize:18, color:COLORS.grey}}>{user}</Text>
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
              <TutorSpace />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:COLORS.white,
       
    },
    homeStyle:{
        paddingVertical:30,
        paddingHorizontal:15
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
            borderRadius: 10,
            elevation: 1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical:15,
            marginBottom:5
          },
})