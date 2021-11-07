import React from 'react'
import { View, Text, Platform } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import COLORS from '../assets/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/FontAwesome'
import MessagesScreen from './MessagesScreen'
import FeedScreen from './FeedScreen'
import ProfileScreen from './ProfileScreen'


const Tab = createBottomTabNavigator()

const BottomNavigator = ({route, navigation}) => {
    const { role } = route.params 
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
     children={() => <HomeScreen user={role} navigation={navigation}/>}
           options={{
               tabBarIcon:({focused}) => (
                   <Icon name="home" color={focused ? COLORS.grey : COLORS.white} size={28} />
               ),
               tabBarLabel:"Home",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0},
               headerShown:false
           }}
           />
     
     <Tab.Screen name="FeedScreen" component={FeedScreen}
           options={{
               tabBarIcon:({focused}) => (
                   <Icons name="newspaper-o" color={focused ? COLORS.grey : COLORS.white} size={26} />
               ),
               tabBarLabel:"Feeds",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0},
               headerShadowVisible:false,
               headerTitle:"News Feed",
               headerTitleAlign:'left',
               headerTitleStyle:{fontSize:18, color:COLORS.grey}
           }}
           />
        <Tab.Screen name="MessagesScreen" component={MessagesScreen}
           options={{
               tabBarIcon:({focused}) => (
                   <Icon name="message1" color={focused ? COLORS.grey : COLORS.white} size={28} />
               ),
               tabBarLabel:"Messages",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0},
               headerShadowVisible:false,
               headerTitle:"Messages",
               headerTitleAlign:'left',
               headerTitleStyle:{fontSize:18, color:COLORS.grey}
           }}
           />

    <Tab.Screen name="ProfileScreen" component={ProfileScreen}
           options={{
               tabBarIcon:({focused}) => (
                <Icon name="contacts" color={focused ? COLORS.grey : COLORS.white} size={28} />
               ),
               tabBarLabel:"Profile",
               tabBarLabelStyle:{color:COLORS.white, 
                fontSize:13, paddingBottom:Platform.OS === 'android' ? 8 : 0,
            },
                headerShadowVisible:false,
                headerTitle:"My Profile",
                headerTitleAlign:'center',
                headerTitleStyle:{fontSize:18, color:COLORS.grey},
                headerTransparent:true
              
           }}
           />
       </Tab.Navigator>
    )
}

export default BottomNavigator
