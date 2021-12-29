import React, {useEffect} from 'react'
import { View, Text, Platform } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import auth,{firebase} from '@react-native-firebase/auth'
import COLORS from '../assets/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import MessagesScreen from './MessagesScreen'
import ProfileScreen from './ProfileScreen'


const Tab = createBottomTabNavigator()


const BottomNavigator = ({route, navigation}) => {
    const { role } = route.params 

    useEffect(() => {
        isTheUserAuthenticated()
    },[navigation])
    
    const isTheUserAuthenticated = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user === null){
                navigation.navigate('LoginScreen', {role: 'employer'})
            }
        })
       
    }

    return (
       <Tab.Navigator
       screenOptions={{
           tabBarStyle:{
              backgroundColor:COLORS.secondary,
              paddingVertical: 5,
              height:Platform.OS === 'ios' ? 90 : 60,
              elevation:5,
           },
       }}
       >
     <Tab.Screen name="HomeScreen" 
     children={() => <HomeScreen role={role} navigation={navigation}/>}
           options={{
               tabBarIcon:({focused}) => (
                   <Icon name="home" color={focused ? COLORS.success : COLORS.white} size={23} />
               ),
               tabBarLabel:"Home",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0},
               headerShown:false
           }}
           />
     
        <Tab.Screen name="MessagesScreen" component={MessagesScreen}
           options={{
               tabBarIcon:({focused}) => (
                   <Icon name="message1" color={focused ? COLORS.success : COLORS.white} size={23} />
               ),
               tabBarLabel:"Messages",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0},
               headerShadowVisible:false,
               headerTitle:"Messages",
               headerTitleAlign:'center',
               headerTitleStyle:{fontSize:18, color:COLORS.success}
           }}
           />

    <Tab.Screen name="ProfileScreen" component={ProfileScreen}
           options={{
               tabBarIcon:({focused}) => (
                <Icon name="contacts" color={focused ? COLORS.success : COLORS.white} size={23} />
               ),
               tabBarLabel:"Profile",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0,
            },
                headerShadowVisible:false,
                headerTitle:"My Profile",
                headerTitleAlign:'center',
                headerTitleStyle:{fontSize:18, color:COLORS.success},
               
              
           }}
           />
       </Tab.Navigator>
    )
}

export default BottomNavigator
