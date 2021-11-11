import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native'
import { Modal, ModalContent, ModalButton, ModalFooter, SlideAnimation, ModalTitle } from 'react-native-modals';
import COLORS from '../assets/colors'
import { messages } from '../rawData/messages'


const MessagesScreen = () => {

    const [visible, setVisible] = useState(false)
    const [modalData, setModalData] = useState([])

    const handleModalPress = (item) => {
        setVisible(true)
        setModalData(item)
    }

    const handleCallEmployer = () => {
         Linking.openURL(`tel:${modalData.senderNumber}`)
         setVisible(false)
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
            {messages.map((item, index) => (
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => handleModalPress(item)}
            key={index}
            >
            <View style={styles.msgWrapper}>
                <View style={styles.namesDate}>
                <Text style={{...styles.nameText, color:COLORS.primary, flex:1}}>{item.sender}</Text>
                   <Text style={styles.dateText}>{item.time}</Text>
                </View>
                <View>
                    <Text style={styles.textMsg}>{item.text}</Text>
                </View>
            </View>
            </TouchableOpacity>
            ))}
            </ScrollView>

            <Modal
    visible={visible}
    width={0.9}
    modalTitle={<ModalTitle title={modalData.sender} />}
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
            <Text style={{fontSize:15, lineHeight:22}}>{`You are about to call ${modalData.sender} for professional tutoring purpose.`}</Text>
        </View>
    </ModalContent>
  </Modal>

        </View>
    )
}

export default MessagesScreen

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