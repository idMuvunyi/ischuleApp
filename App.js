import React from 'react'
import { View, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OnboardingScreen from './src/components/OnboardingScreen'
import RoleScreen from './src/components/RoleScreen'
import LoginScreen from './src/components/LoginScreen'
import TutorSignUpScreen from './src/components/TutorSignUpScreen'
import ForgotPassword from './src/components/ForgotPassword'
import BottomNavigator from './src/components/BottomNavigator'

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Onboarding" component={OnboardingScreen} />
       <Stack.Screen name="RoleScreen" component={RoleScreen} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="TutorSignUpScreen" component={TutorSignUpScreen} />
       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
       <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
       </Stack.Navigator>
    </NavigationContainer>
  )
}
