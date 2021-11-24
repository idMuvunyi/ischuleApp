import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import COLORS from '../../assets/colors'
import { connect } from 'react-redux'

const AcademicDetails = ({userDetails}) => {

  const [userInfo, setUserInfo] = useState([])
  const [fetching, setFetching] = useState(true)

useEffect(() => {
    setUserInfo([...(userDetails !== null ? userDetails : [])])
    setFetching(false)
  }, [userDetails])

  return(
  <ScrollView
      showsVerticalScrollIndicator={false}
      >
    <View style={styles.container}>
    {fetching ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> 
         :
         <>
    {userInfo && userInfo.length ?   
            userInfo.map((item, index) => (
              <View style={styles.card} key={index}>
              <View style={styles.cardContent}>
                <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Education Level</Text>
                <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.edLevel}</Text>
              </View>
 
              <View style={styles.cardContent}>
                <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Field of study</Text>
                <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.studyField}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Institution</Text>
                <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.institution}</Text>
              
              </View>
              <View style={{...styles.cardContent, borderBottomWidth:0}}>
                <Text style={{...styles.textContent, flex:1, fontWeight:'bold'}}>Graduated</Text>
                <Text style={{...styles.textContent, flex:2, textAlign:'right'}}>{item.graduated}</Text>
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
        marginVertical:30
    },
    card:{
        backgroundColor:COLORS.white,
        borderRadius:3,
        elevation:0.5,
        alignItems:'center',
        paddingVertical:30,
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

export default connect(mapStateToProps, null)(AcademicDetails)