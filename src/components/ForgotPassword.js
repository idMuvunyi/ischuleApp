import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { resetPassword } from '../store/actions/actions'
import COLORS from '../assets/colors'


const ForgotPassword = ({navigation, role}) => {

    const [email, setEmail] = useState('')
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState("")
    const [isValid, setValid] = useState(true)

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleResetPassword = () => {

        if(!email){
            setError("Email required *")
            setValid(false)
            return
         }  else if (!validateEmail(email)) {
            setError("Invalid Email")
            setValid(false)
            return
          }

          setError("")
          setFetching(true)
        
      resetAsync()
    }

    const resetAsync = () => {
        resetPassword(email, (res, status) => {
            if(status === true){
             setFetching(false)
             Alert.alert('Password Reset','Please check your email to reset password.')
             navigation.navigate('LoginScreen', {role:role})
            }
            else if(res.includes("auth/invalid-email")){
             setFetching(false)
             Alert.alert('Password Reset','Email address provided is not valid.') 
         }
         else {
             setFetching(false)
             Alert.alert('Password Reset','Try password reset again.') 
         }
       })
    }

    const handleSignIn = () => {
     navigation.navigate('LoginScreen', {role: role})  
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
                 {fetching && <ActivityIndicator color={COLORS.primary} size="large"/>}
               <Text style={styles.text_footer}>Email</Text>
               <View style={styles.inputWrapper}>
               <FontAwesome name="user-o"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter your email"
               keyboardType="email-address"
               style={styles.TextInput}
               autoCapitalize="none"
               value={email}
               onChangeText={(value) => {
                setError   
                setEmail(value)
               }}
               error={isValid}
               />
               </View >
               {error ? (
               <View>
                <Text style={styles.errorTextStyle}>{error}</Text>
              </View>
              ) : null}
               <View style={styles.button}>
               <TouchableOpacity
                   style={styles.signIn}
                   onPress={() => handleResetPassword()}
                   >
                  <LinearGradient
                  colors={[COLORS.grey, COLORS.secondary]}
                  style={styles.signIn}
                  >
                      <Text style={styles.textSign}>Reset Password</Text>
                  </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => handleSignIn()}
                  style={{...styles.signIn,
                     borderColor:COLORS.primary,
                    borderWidth:1,
                    marginTop:15
                }}
                  >
                      <Text style={{...styles.textSign, color:COLORS.primary}}>Log In</Text>
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
        fontWeight:'bold'
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
    },
    errorTextStyle:{
        color:'red',
        paddingTop:10
    }
})



export default ForgotPassword
