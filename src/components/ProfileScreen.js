import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, useWindowDimensions, ActivityIndicator, TouchableOpacity, Alert} from 'react-native'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view'
import Feather from 'react-native-vector-icons/Feather'
import userImage from '../assets/user-male.png'
import userFemale from '../assets/avatar1.png'
import COLORS from '../assets/colors'
import ProfessionalDetails from './profileScreens/ProfessionalDetails'
import AcademicDetails from './profileScreens/AcademicDetails'
import PersonalDetails from './profileScreens/PersonalDetails'
import { connect } from 'react-redux'
import EditModal from '../reusable-components/EditModal'
import { setInfo } from '../store/actions/actions'




const renderScene = SceneMap({
    first: PersonalDetails,
    second: AcademicDetails,
    third: ProfessionalDetails
})



const ProfileScreen = ({userDetails, setInfo}) => {

    const [userInfo, setUserInfo] = useState([])
    const [fetching, setFetching] = useState(true)
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        handleUserInfo()
      },[visible])
  
  useEffect(() => {
      if(userDetails !== null && userDetails.length !== 0){
        setFetching(false)
      }
      setUserInfo([...(userDetails !== null ? userDetails : [])])
    }, [userDetails])


    const handleEditIcon = (first, last) => {
       setData([first, last])
       setVisible(true)
    }

    const handleUserInfo = async () => {
        setInfo( (data, status) => {
      if(status){
        console.log('sucess')
      }
        })
      }


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
          <StatusBar backgroundColor={COLORS.secondary} barStyle='light-content' />
            {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
        : <>
            <View style={styles.headerView}>
                <View style={styles.headerWrapper}>
                <Image source={userDetails && userDetails.length ? (userInfo[0].gender === "Female" ? userFemale : userImage) : null} style={styles.userImage}/>
                <View style={styles.nameIcon}>
                <Text style={{fontSize:18, fontWeight:'bold', marginRight:10}}>{userDetails && userDetails.length ? `${userInfo[0].FirstName} ${userInfo[0].lastName}` : null}</Text>
                <TouchableOpacity
                onPress={() => handleEditIcon(userInfo[0].FirstName, userInfo[0].lastName)}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
                </View>
                </View>
            </View>
            
            <View style={styles.footerView}>
              {userInfo[0].userType === 'tutor' ? 
            <TabView 
                 navigationState={{index, routes}}
                 renderScene={renderScene}
                 onIndexChange={setIndex}
                 initialLayout={{width: layout.width}}
                 renderTabBar={renderTabBar}
                />
               :
               <View>
               <View style={styles.emplSeparator}>
               </View>
               <PersonalDetails />
               </View>
               
              }
            </View>
            <EditModal visible={visible} value={data} setVisible={setVisible} />
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
        paddingHorizontal:10,
        paddingTop:25,
        paddingBottom:15
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
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    nameIcon:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10
    },
    emplSeparator:{
        backgroundColor:COLORS.primary,
        marginHorizontal:5,
        height:10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }
    
})

const mapDispatchToProps = {
    setInfo,
  }

const mapStateToProps = state => {
    const { userAuth } = state;
      return{
        userDetails: userAuth
      }
    }
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)