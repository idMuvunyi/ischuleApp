import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, useWindowDimensions, ActivityIndicator} from 'react-native'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view'
import Feather from 'react-native-vector-icons/Feather'
import userImage from '../assets/user-male.png'
import userFemale from '../assets/avatar1.png'
import COLORS from '../assets/colors'
import ProfessionalDetails from './profileScreens/ProfessionalDetails'
import AcademicDetails from './profileScreens/AcademicDetails'
import PersonalDetails from './profileScreens/PersonalDetails'
import { connect } from 'react-redux'



const renderScene = SceneMap({
    first: PersonalDetails,
    second: AcademicDetails,
    third: ProfessionalDetails
})

const ProfileScreen = ({userDetails}) => {

    const [userInfo, setUserInfo] = useState([])
    const [fetching, setFetching] = useState(true)
  
  useEffect(() => {
      setUserInfo([...(userDetails !== null ? userDetails : [])])
      setFetching(false)
    }, [userDetails])

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0) 
    const [routes] = useState([
        {key: 'first', title:'Personal'},
        {key: 'second', title:'Academic'},
        {key: 'third', title:'Profession'}
    ])

    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: COLORS.primary, height:3,
             borderTopRightRadius:5, borderTopLeftRadius:5}}
          style={{ backgroundColor:'#F4F9F9', borderTopWidth:1, borderTopColor:COLORS.textColor }}
          inactiveColor={COLORS.grey}
          activeColor={COLORS.secondary}
          pressColor={COLORS.secondary}
        />
      );

    return (
        <View style={styles.container}>
            {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
        : <>
            <StatusBar backgroundColor={COLORS.secondary} barStyle='light-content' />
            <View style={styles.headerView}>
                <View style={styles.headerWrapper}>
                <Image source={userInfo && userInfo[0].gender === "Female" ? userFemale : userImage} style={styles.userImage}/>
                <View style={styles.nameIcon}>
                <Text style={{fontSize:18, fontWeight:'bold', marginRight:10}}>{userInfo && userInfo.length ? `${userInfo[0].FirstName} ${userInfo[0].lastName}` : null}</Text>
                <Feather name="edit-2" color={COLORS.grey} size={20} />
                </View>
                </View>
            </View>
            
            <View style={styles.footerView}>
            <TabView 
                 navigationState={{index, routes}}
                 renderScene={renderScene}
                 onIndexChange={setIndex}
                 initialLayout={{width: layout.width}}
                 renderTabBar={renderTabBar}
                />
            </View>
            </>
     }
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white
    },
    headerView:{
        flex:2,
        backgroundColor:'#F4F9F9',
        paddingHorizontal:20,
        paddingVertical:40,
    },
    footerView:{
        flex:4,
        backgroundColor:'#F4F9F9',
        
    },
    userImage:{
        width:130,
        height:130,
        borderRadius:65
    },
    headerWrapper:{
        alignItems:'center',
    },
    nameIcon:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
    },
    
})

const mapStateToProps = state => {
    const { userAuth } = state;
      return{
        userDetails: userAuth
      }
    }
  
export default connect(mapStateToProps, null)(ProfileScreen)