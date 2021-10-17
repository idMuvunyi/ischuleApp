import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../assets/colors'

const LoginScreen = ({navigation, route}) => {
    const{ role } = route.params

    const [data, setData] = useState({
        email:'',
        password:'',
        checkTextInput:false,
        secureTextEntry:true
    })

    const textInputChange = (val) => {
       if(val.length !== 0){
           setData({
               ...data, 
               email:val,
               checkTextInput:true
           })
       }else{
        setData({
            ...data, 
            email:val,
            checkTextInput:false
        })
       }
    }

    const handlePassword = (value) => {
        setData({
            ...data, 
            password:value
        })
    }

    const ChangeSecureTextEntry = () => {
        setData({
            ...data, 
            secureTextEntry:!data.secureTextEntry
        })
    }

    const handleSignUp = () => {
     navigation.navigate('TutorSignUpScreen', {role: role})  
    }
    const handleSignIn = () => {
        navigation.navigate('BottomNavigator', {role: role})
    }
    const handleChangePassword = () => {
        navigation.navigate('ForgotPassword')
    }

    return (
        <View style={styles.containerStyle}>
            <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
            <View style={styles.header}>
                <Text style={{fontSize:16}}>Welcome To, </Text>
               <Text style={styles.textHeader}>iSchule</Text>
            </View>
            <Animatable.View
             animation="fadeInUpBig"
            style={styles.footer}
            >
               <Text style={styles.text_footer}>Email</Text>
               <View style={styles.inputWrapper}>
               <FontAwesome name="user-o"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter your email"
               style={styles.TextInput}
               autoCapitalize="none"
               onChangeText={(value) => textInputChange(value)}
               />
               {data.checkTextInput ? 
               <Animatable.View 
               animation="bounceIn"
               >
               <Feather
               name="check-circle"
               color={COLORS.success}
               size={20}
               />
               </Animatable.View>
               : null
                   }
               </View>
               
               <Text style={{...styles.text_footer, marginTop:35}}>Password</Text>
               <View style={styles.inputWrapper}>
               <Feather name="lock"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter your password"
               secureTextEntry={data.secureTextEntry ? true : false}
               style={styles.TextInput}
               autoCapitalize="none"
               onChangeText={(value) => handlePassword(value)}
               />
               <TouchableOpacity
               onPress={ChangeSecureTextEntry}
               >
            {data.secureTextEntry ?
               <Feather
               name="eye-off"
               color={COLORS.grey}
               size={20}
               />
               :
                <Feather
               name="eye"
               color={COLORS.grey}
               size={20}
               />
            }
            </TouchableOpacity>
               </View >
               <View style={styles.button}>
                   <TouchableOpacity
                   style={styles.signIn}
                   onPress={() => handleSignIn()}
                   >
                   <LinearGradient
                  colors={[COLORS.secondary, COLORS.primary]}
                  style={styles.signIn}
                  >
                      <Text style={styles.textSign}>Sign In</Text>
                  </LinearGradient>
                    </TouchableOpacity>
                  
                  <TouchableOpacity 
                  onPress={() => handleSignUp()}
                  style={{...styles.signIn,
                     borderColor:COLORS.primary,
                    borderWidth:1,
                    marginTop:15
                }}
                  >
                      <Text style={{...styles.textSign, color:COLORS.primary}}>Sign Up</Text>
                  </TouchableOpacity>
               </View>
               <View>
                   <TouchableOpacity
                   onPress={() => handleChangePassword()}
                   >
                       <Text style={styles.textForgot}>Forgot Password?</Text>
                   </TouchableOpacity>
               </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle:{
        flex:1,
        backgroundColor:COLORS.secondary
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingHorizontal:20,
        paddingBottom: 50
    },
    footer:{
        flex:3,
        backgroundColor:"#fff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    textHeader:{
        fontSize:35,
        color:'#fff',
        fontWeight:'bold',
    },
    text_footer:{
        color:COLORS.grey,
        fontSize:18
    },
    inputWrapper:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    TextInput:{
        flex:1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft:10,
        fontSize:15
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    }, 
    textForgot:{
        fontSize:16,
        color:COLORS.grey,
        textAlign:'center',
        padding:20
    }
})

export default LoginScreen
