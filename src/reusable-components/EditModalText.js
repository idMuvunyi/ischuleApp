import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors'
import { updateUserInfoText } from '../store/actions/actions'
import { SuccessButton } from './Button'


export default function EditModalText(props) {

    const{ visible, value, setVisible } = props

    const [showModal, setShowModal] = useState(visible)
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const [isValid, setValid] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        toggleModal()
    }, [visible])

    const toggleModal = () => {
        if (visible) {
            setShowModal(true)
        }
        else {
            setShowModal(false)
        }
    }
   
    // Update user Info
    const updateUserText = (val) => {

        let label = value[1]
        if(!text){
            setError("Input is required *")
            setValid(false)
            return
         }
        

         setError("")
         setLoading(true)

     updateUserInfoText(val, label, (res, status) => {
         if(status){
             setLoading(false)
             setText("")
             setVisible(false)
         }
         else{
            ToastAndroid.show(res, ToastAndroid.SHORT);
         }
     })
         
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
        >
            <View style={styles.modalBg}>
                <View style={[styles.modalContainer]}>
                <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 18, color: COLORS.success }}>Edit Profile</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setVisible(false)}
                        >
                            <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>
                <View style={{ marginVertical: 20 }}>
                        <TextInput
                            style={{...styles.input, height:value[1] === "about" ? 120 : 60 }}
                            defaultValue={value[0]}
                            //value={text}
                            autoFocus={true}
                            placeholder="Type something!"
                            multiline={true}
                            numberOfLines={5}
                            scrollEnabled={true}
                            onChangeText={val => {
                                setError
                                setText(val)
                            }}
                            error={isValid}
                        />
                         {error ? (
               <View>
                <Text style={styles.errorTextStyle}>{error}</Text>
              </View>
              ) : null}
                    </View>

                    {loading ? <ActivityIndicator color={COLORS.success} size="large" style={{justifyContent:'center', alignItems:'center'}}/> : null}
                   
                    <View style={{ marginTop: 10 }}>
                        <SuccessButton title="Save" onPress={() => updateUserText(text)} />
                    </View>
                </View>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: "95%",
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 10
    },
    input: {
        justifyContent:'flex-start',
        textAlignVertical:'top',
        borderWidth: 0.5,
        fontSize: 17,
        color: '#333',
        borderRadius:5
    },
    modalHeader:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    errorTextStyle:{
        color:'red',
        paddingTop:10,
        fontSize:15
    }
})