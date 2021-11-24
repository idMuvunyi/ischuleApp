import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Platform, 
    TouchableOpacity, StatusBar, ScrollView, Alert, ActivityIndicator
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../assets/colors'
import { register } from '../store/actions/actions'

const TutorSignUpScreen = ({route, navigation}) => {
   const {role} = route.params
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [secureTextEntry, setTextSecureTextEntry] = useState(true)
    const [password, setPassword] = useState("")
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState("")
    const [isValid, setValid] = useState(true)
        

    const ChangeSecureTextEntry = () => {
        setTextSecureTextEntry(!secureTextEntry)
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSignUp = () => {
        // implement some validations
        const trimmedPass = password.trim()
        if(!firstName){
            setError("First Name required *")
            setValid(false)
            return
         }
         else if(!lastName){
            setError("Last Name required *")
            setValid(false)
            return
         }
         else if(!email){
            setError("Email required *")
            setValid(false)
            return
         } else if (!trimmedPass || password.length < 6) {
            setError("Weak password, minimum 6 chars")
            setValid(false)
            return
          } else if (!validateEmail(email)) {
            setError("Invalid Email")
            setValid(false)
            return
          }

          setError("")
          setFetching(true)

        register(email, password, firstName, lastName, role, (res, stats) => {
            
            if(stats){
               setFetching(false)
               setFirstName("")
               setLastName("")
               setEmail("")
               setPassword("")
                Alert.alert("Success ✅", "Account created successfully")
                
            }
            else if(res.includes("auth/email-already-in-use")){
                setFetching(false)
                Alert.alert("Sign Up","The email address is already in use by another account.") 
            }

            
        })

    }
   

    return (
        <View style={styles.containerStyle}>
            <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
            <View style={styles.header}>
                <Text style={{fontSize:16}}>Create an account, </Text>
               <Text style={styles.textHeader}>iShur App</Text>
            </View>
            
            <Animatable.View
             animation="fadeInUpBig"
            style={styles.footer}
            >
                {fetching && <ActivityIndicator color={COLORS.primary} size="large"/>}
            <ScrollView 
            showsVerticalScrollIndicator={false}
            >
              <Text style={{...styles.text_footer}}>First Name</Text>
               <View style={styles.inputWrapper}>
               <FontAwesome name="user-o"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter first name"
               value={firstName}
               style={styles.TextInput}
               autoCapitalize="none"
               onChangeText={text => {
                setError
                setFirstName(text)
              }}
              error={isValid}
               />
               </View>
              

               <Text style={{...styles.text_footer, marginTop:35}}>Last Name</Text>
               <View style={styles.inputWrapper}>
               <FontAwesome name="user-o"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter last name"
               value={lastName}
               style={styles.TextInput}
               autoCapitalize="none"
               onChangeText={(value) => {
                   setError
                   setLastName(value)
                }}
                error={isValid}
               />
               </View>

               <Text style={{...styles.text_footer, marginTop:35}}>Email</Text>
               <View style={styles.inputWrapper}>
               <FontAwesome name="user-o"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter your email"
               value={email}
               keyboardType="email-address"
               style={styles.TextInput}
               autoCapitalize="none"
               onChangeText={text => {
                setError
                setEmail(text)
              }}
              error={isValid}
               />
               </View>
              
               
               <Text style={{...styles.text_footer, marginTop:35}}>Password</Text>
               <View style={styles.inputWrapper}>
               <Feather name="lock"  color={COLORS.grey} size={20}/>
               <TextInput 
               placeholder="Enter your password"
               secureTextEntry={secureTextEntry ? true : false}
               style={styles.TextInput}
               value={password}
               autoCapitalize="none"
               onChangeText={(value) => {
                   setError
                setPassword(value)
               } 
                
               }
               error={isValid}
               />
               <TouchableOpacity
               onPress={ChangeSecureTextEntry}
               >
            {secureTextEntry ?
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
               {error ? (
               <View>
                <Text style={styles.errorTextStyle}>{error}</Text>
              </View>
              ) : null}
    
               <View style={styles.button}>
               <TouchableOpacity
               onPress={() => handleSignUp()}
                   style={styles.signIn}
                   >
                  <LinearGradient
                  colors={[COLORS.secondary, COLORS.primary]}
                  style={styles.signIn}
                  >
                      <Text style={styles.textSign}>Sign Up</Text>
                  </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  style={{...styles.signIn,
                     borderColor:COLORS.primary,
                    borderWidth:1,
                    marginTop:15
                }}
                  >
                      <Text style={{...styles.textSign, color:COLORS.primary}}>Sign In</Text>
                  </TouchableOpacity>
               </View>
               </ScrollView>
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
        paddingBottom: 50,
    },
    footer:{
        flex:3,
        backgroundColor:"#fff",
        paddingHorizontal:20,
        paddingVertical:30,
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
    errorTextStyle:{
        color:'red',
        paddingTop:10
    }
})



export default TutorSignUpScreen;
