import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking, FlatList, ActivityIndicator } from 'react-native'
import { Modal, ModalContent, ModalButton, ModalFooter, SlideAnimation, ModalTitle } from 'react-native-modals';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import COLORS from '../assets/colors'
import { connect } from 'react-redux';


const MessagesScreen = ({userDetails}) => {

    const [visible, setVisible] = useState(false)
    const [modalData, setModalData] = useState([])
    const [messageList, setMessageList] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      setUserInfo([...(userDetails !== null ? userDetails : [])])
    }, [userDetails])


    useEffect(() => {
      setLoading(true)
     fetchMessages()
     return () => fetchMessages()
    },[])


    const fetchMessages = async () => {
      try {
         const uid = auth().currentUser.uid
          let list = []
          await firestore()
              .collection('messages')
              .get()
              .then(querySnapshot => {
                  //console.log(querySnapshot.size)
                  querySnapshot.forEach(doc => {
                    

                      const { createdAt, receiverId, receiverName, seen, senderId, senderName, senderPhone, textMessage} = doc.data()
                      if(senderId === uid || receiverId === uid){
                      list.push({
                          createdAt,
                          receiverId,
                          receiverName,
                          seen,
                          senderId,
                          senderName,
                          senderPhone,
                          textMessage
                      })
                    }
                     
                  })
              })

          setMessageList([...list])

            setLoading(false)
          

      } catch (error) {
          console.log(error)
      }
  }

    const handleModalPress = (item) => {
      if(userInfo[0].userType !== 'employer'){
        setVisible(true)
        setModalData(item)
      }
    }

    const handleCallEmployer = () => {
         Linking.openURL(`tel:${modalData.senderPhone}`)
         setVisible(false)
         
    }

    

    const MessageComponent = ({item, id}) => {
        return(
           <>    
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => handleModalPress(item)}
            key={id}
            >
            <View style={styles.msgWrapper}>
                <View style={styles.namesDate}>
                <Text style={{...styles.nameText, color:COLORS.primary, flex:1}}>{userInfo[0].userType === 'tutor' ? item.senderName: item.receiverName}</Text>
                   <Text style={styles.dateText}>{item.createdAt}</Text>
                </View>
                <View>
                    <Text style={styles.textMsg}>{item.textMessage}</Text>
                </View>
            </View>
            </TouchableOpacity>
           </>
        )
    }

    const NoMessageAvailable = () => {
        return(
          <View style={{alignItems:'center', color:COLORS.textColor, marginTop:50}}>
            <Text style={{fontSize:15}}>No Message Available !</Text>
          </View>
        )
      }



    return (
        <View style={styles.container}>
          {loading ? <ActivityIndicator color={COLORS.primary} size="large" style={{flex:1, justifyContent:'center', alignItems:'center'}}/>:
           
            <FlatList 
            showsVerticalScrollIndicator={false}
               data={messageList}
               renderItem={
                   (({item, index}) => <MessageComponent item={item} id={index} />)
               }
               ListEmptyComponent={() => <NoMessageAvailable />}
            />
              }

            <Modal
    visible={visible}
    width={0.9}
    modalTitle={<ModalTitle title={modalData.senderName} />}
    onTouchOutside={() => setVisible(false)}
    modalAnimation={new SlideAnimation({
        slideFrom: 'right',
      })}
    footer={
        <ModalFooter>
          <ModalButton
            text="Call"
            onPress={() => handleCallEmployer()}
          />
          <ModalButton
            text="Cancel"
            onPress={() => setVisible(false)}
          />
        </ModalFooter>
      }
  >
    <ModalContent>
        <View>
            <Text style={{fontSize:15, lineHeight:22}}>{`You are about to call employer ${modalData.senderName} for professional tutoring purpose.`}</Text>
        </View>
    </ModalContent>
  </Modal>

        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    msgWrapper:{
        backgroundColor:COLORS.textColor,
        margin:20,
        paddingVertical:10,
        paddingHorizontal:10,
        borderTopLeftRadius:20,
    },
    namesDate:{
      flexDirection:'row'
    },
    dateText:{
        fontSize:14,
        color:COLORS.secondary,
    },
    textMsg:{
        paddingVertical:5,
        fontSize:15,
        color:COLORS.grey,
        textAlign:'justify'
    }

})

const mapStateToProps = state => {
  const { userAuth } = state;
    return{
      userDetails: userAuth
    }
  }

export default connect(mapStateToProps, null)(MessagesScreen)