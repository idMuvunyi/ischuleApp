import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import COLORS from '../../assets/colors'
import { connect } from 'react-redux'

const PersonalDetails = ({userDetails}) => {

  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(true)

useEffect(() => {
    setUserInfo([...(userDetails !== null ? userDetails : [])])
    setFetching(false)
  }, [userDetails])


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
                <Text style={styles.aboutText}>{userInfo && userInfo.length ? userInfo[0].about : null}</Text>
            </View>
            {userInfo && userInfo.length ?   
            userInfo.map((item, index) => (
            <View style={styles.card} key={index}>
             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Full Name</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{`${item.FirstName} ${item.lastName}`}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Gender</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.gender}</Text>
             </View>

             <View style={styles.cardContent}>
               <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Email</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.email}</Text>
             </View>
             <View style={{...styles.cardContent, borderBottomWidth:0}}>
               <Text style={{...styles.textContent,flex:1, fontWeight:'bold'}}>Address</Text>
               <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.address}</Text>
             </View>
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
        elevation:0.5,
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

})

const mapStateToProps = state => {
  const { userAuth } = state;
    return{
      userDetails: userAuth
    }
  }

export default connect(mapStateToProps, null)(PersonalDetails)