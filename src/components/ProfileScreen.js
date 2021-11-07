import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, useWindowDimensions} from 'react-native'
import { TabView, SceneMap, TabBar} from 'react-native-tab-view'
import Feather from 'react-native-vector-icons/Feather'
import COLORS from '../assets/colors'
import ProfessionalDetails from './profileScreens/ProfessionalDetails'
import AcademicDetails from './profileScreens/AcademicDetails'
import PersonalDetails from './profileScreens/PersonalDetails'



const renderScene = SceneMap({
    first: PersonalDetails,
    second: AcademicDetails,
    third: ProfessionalDetails
})

const ProfileScreen = () => {

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
            <View style={styles.headerView}>
                <View style={styles.headerWrapper}>
                <Image source={require('../assets/user-male.png')} style={styles.userImage}/>
                <View style={styles.nameIcon}>
                <Text style={{fontSize:20, fontWeight:'bold', marginRight:10}}>Tuyishime Edouard</Text>
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
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white
    },
    headerView:{
        flex:1,
        backgroundColor:'#F4F9F9',
        paddingHorizontal:20,
        paddingVertical:50,
    },
    footerView:{
        flex:3,
        backgroundColor:'#F4F9F9',
        
    },
    userImage:{
        width:130,
        height:130,
        borderRadius:65
    },
    headerWrapper:{
        alignItems:'center',
        paddingVertical:10,
    },
    nameIcon:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10
    },
    
})