import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import COLORS from '../../assets/colors'
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import EditModalText from '../../reusable-components/EditModalText'
import { setInfo } from '../../store/actions/actions'
import EditModalDropdown from '../../reusable-components/EditModalDropdown'

const PersonalDetails = ({userDetails, setInfo}) => {

  const [userInfo, setUserInfo] = useState([])
  const [data, setData] = useState([])
  const [fetching, setFetching] = useState(true)
  const [visible, setVisible] = useState(false)
  const [showGenderEdit, setShowGenderEdit] = useState(false)

  useEffect(() => {
    handleUserInfo()
  },[visible, showGenderEdit])

useEffect(() => {
    setUserInfo([...(userDetails !== null ? userDetails : [])])
    setFetching(false)
  }, [userDetails])

  const handleEditIconText = (val, label) => {
    setData([val, label])
    setVisible(true)
  }

  const handleEditIconDropdown = (val, label) => {
    setData([val, label])
    setShowGenderEdit(true)
  }

  const handleUserInfo = async () => {
    setInfo( (data, status) => {
  if(status){
    console.log('sucess')
  }
    })
  }

    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
         
        <View style={styles.container}>
        {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
         :
         <>
            <View style={styles.aboutContainer}>
                <Text style={{fontSize:17, fontWeight:'bold'}}>About</Text>
              <View style={styles.textIconWrapper}>
                <Text style={{...styles.aboutText, flex:6}}>{userDetails && userDetails.length ? userInfo[0].about : null}</Text>
                <TouchableOpacity
                onPress={() => handleEditIconText(userInfo[0].about, "about")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
              </View>
            </View>
            {userDetails && userDetails.length ?   
            userInfo.map((item, index) => (
            <View style={styles.card} key={index}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Full Name</Text>
                <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:6, textAlign:'right'}}>{`${item.FirstName} ${item.lastName}`}</Text>
              <View
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                ></View>
             </View>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Gender</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:6, textAlign:'right'}}>{item.gender}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconDropdown(item.gender, "gender")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
               </View>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Email</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:6, textAlign:'right'}}>{item.email}</Text>
              <View style={{flex:1}}></View>
             </View>
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Address</Text>
               <View style={{...styles.textIconWrapper, flex:2}}>
               <Text style={{...styles.textContent, flex:6, textAlign:'right'}}>{item.address}</Text>
               <TouchableOpacity
                onPress={() => handleEditIconDropdown(item.address, "address")}
                style={{flex:1, justifyContent:'center', alignItems:'center'}}
                >
                <Feather name="edit-2" color={COLORS.grey} size={18} />
                </TouchableOpacity>
              </View>
             </View>
             <EditModalText visible={visible} value={data} setVisible={setVisible} />
             <EditModalDropdown visible={showGenderEdit} value={data} setVisible={setShowGenderEdit} />
         </View>
          )): 
          null
            }
              </>
            }
    </View>
  
      </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        marginVertical:20,
        
    },
    aboutContainer:{
        marginVertical:20,
        paddingHorizontal:20
    },
    aboutText:{
        fontSize:15,
        color:COLORS.grey,
        textAlign:'justify',
        paddingTop:5
    },
    card:{
        backgroundColor:COLORS.white,
        borderRadius:3,
        elevation:1,
        alignItems:'center',
        paddingVertical:25,
        marginBottom:5,
        margin:10
       },
       cardContent:{
         flexDirection:'row',
         justifyContent:'space-between',
         borderBottomWidth:1,
         borderBottomColor:COLORS.textColor,
         paddingVertical:7,
         width:'95%',
       },
       textContent:{
         fontSize:14,
         color:COLORS.grey
       },
       textIconWrapper:{
         flexDirection:'row',
       }

})

const mapStateToProps = state => {
  const { userAuth } = state;
    return{
      userDetails: userAuth
    }
  }

  const mapDispatchToProps = {
    setInfo,
  }

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)