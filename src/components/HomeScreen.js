import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, TouchableOpacity, TextInput, FlatList, Image, Dimensions, Alert, ActivityIndicator } from 'react-native'
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
import auth,{firebase} from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { setInfo, setTutors, logout } from '../store/actions/actions'
import DoubleTapToClose from '../reusable-components/ExistAppHandler'
import { Colors } from 'react-native/Libraries/NewAppScreen'




const HomeScreen = ({navigation, role, user, tutor, setInfo, setTutors, logout}) => {

  const [userInfo, setUserInfo] = useState([])
  const [tutorInfo, setTutorInfo] = useState([])
  const [searchField, setSearchField] = useState("")
  const [fetching, setFetching] = useState(true)

// call this in bottomNavigator (parent)
useEffect(() => {
    handleUserInfo()
    handleTutorInfo()
  },[])


useEffect(() => {
    setUserInfo([...(user !== null ? user : [])])
  }, [user])

  useEffect(() => {
    setTutorInfo([...(tutor !== null ? tutor : [])])
  }, [tutor])

const handleUserInfo = async () => {
  // Set userAuth
  setInfo( (data, status) => {
if(status){
  setFetching(false)
}
  })

}

const handleTutorInfo = async () => {
// Set all tutors
setTutors( (data, status) => {
  if(status){
    setFetching(false)
  }
  
    })

}



  const goToPofile = () => {
    navigation.navigate('ProfileScreen')
  }
  const handleSignOut = () => {
    getMeOut()
  }

  const getMeOut = async () => {
    logout(stats => {
      if(stats){
        navigation.navigate('LoginScreen', {role:role})
      }else{
        Alert.alert('Sign Out', 'Can not sign out right now. Try again.')
      }
    })
  }

  const shareApp = () => {
     Alert.alert('Share', 'coming soon.')  
  }

    const TutorSpace = ({items}) => {
        return(
          <TouchableOpacity 
          onPress={() => {setSearchField(""),
          navigation.navigate('TutorDetailsScreen', {title: `${items.FirstName} ${items.lastName}`, userId:userInfo[0].id, user: `${userInfo[0].FirstName} ${userInfo[0].lastName}`, userPhone:userInfo[0].phone, userType:userInfo[0].userType, details: items})
          
        }}
          >
           <Animatable.View 
            animation="pulse" easing="ease-out"
            style={styles.cardItem}>
            <View style={{ elevation: 10 }}>
              <Image source={items.gender === 'Female' ? userFemale : userMale} 
              style={{width:60, height:60}} 
              />
            </View>
    
            <View
              style={{
                marginLeft: 10,
                flex: 1,
              }}> 
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
               {`${items.FirstName} ${items.lastName}`}
              </Text>
  
             <Text style={{fontSize: 14, color:COLORS.grey }}> 
               {items.courses.split(",", 2)}
                 </Text>
              
              <Text style={{fontSize: 14, color:COLORS.secondary }}>
               {items.address}
              </Text>
            </View>
            <View style={styles.salaryWrapper}>
              <Text style={{fontSize:13, color:COLORS.textColor, textAlign:'right'}}>RWF</Text>
              <Text>{`${items.salary}K - ${items.salaryTo}K ` }</Text>
            </View>
          </Animatable.View>
          </TouchableOpacity>
           
        )
    }

    const NoTutorsAvailable = () => {
      return(
        <View style={{alignItems:'center', color:COLORS.textColor}}>
          <Text style={{fontSize:15}}>Opps! No tutor Available</Text>
        </View>
      )
    }


     
    return (
        <SafeAreaView style={styles.wrapper}>
           <DoubleTapToClose />
        {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
        : <>
            <StatusBar backgroundColor={COLORS.primary} barStyle={Platform.OS === 'android' ? 'light-content': 'default' }/>
            <View style={styles.homeStyle}>
            <View style={styles.header}>
                <View>
                   <Text style={styles.wlcmText}>Hello, </Text>
                   <Text style={{fontSize:18, color:COLORS.secondary, fontWeight:'600'}}>{userInfo && userInfo.length ? userInfo[0].lastName : null}</Text>
                </View>
                <TouchableOpacity>
                <View>
                <OptionsMenu
                   button={user && user.length ? (userInfo[0].gender === "Female" ? userFemale : userImage): null}
                    buttonStyle={{ height: 50, width: 50, borderRadius: 20 }}
                    //destructiveIndex={1} ios only
                    options={["Sign out","Share App" ]}
                    actions={[handleSignOut, shareApp,]}
                  />
                </View>
                </TouchableOpacity>
            </View>
            <View style={styles.searchWrapper}>
                <TextInput 
                placeholder="Find a tutor..."
                value={searchField}
                onChangeText={text => setSearchField(text)}
                autoCapitalize="none"
                style={styles.searchInput}
                />
                <AntDesign name="search1" color={COLORS.textColor} size={28}  />
            </View>
            <HeaderTab />
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={tutorInfo.filter(item => item.gender !== "")
          .filter(item => (`${item.FirstName} ${item.lastName}`)
          .toLowerCase().includes(searchField.toLowerCase())
          )
          }
            renderItem={
              (({item}) => <TutorSpace items={item} />)
            }
            ListEmptyComponent={() => <NoTutorsAvailable />}
            keyExtractor={item => item.id}
            />
            </>
     }
        </SafeAreaView>
    )
}


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
      paddingHorizontal:3,
      backgroundColor:COLORS.secondary,
      borderRadius:12,
      marginLeft:5,
      alignItems:'center'
    },
    nameTick:{
      flexDirection:'row',
      alignItems:'center'
    }
    
})

const mapStateToProps = state => {
const { userAuth, tutors } = state;
  return{
    user: userAuth,
    tutor: tutors
  }
}
const mapDispatchToProps = {
  logout,
  setInfo,
  setTutors
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)