import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors'
import { updateUserNames } from '../store/actions/actions'
import { SuccessButton } from './Button'


export default function EditModal(props) {

    const{ visible, value, setVisible } = props

    const [showModal, setShowModal] = useState(visible)
    const [editFirst, setEditFirst] = useState("")
    const [editLast, setEditLast] = useState("")
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
    const updateUserInfo = (first, last) => {
        if(!editFirst){
            setError("First name is required *")
            setValid(false)
            return
         }
         else if(!editLast){
            setError("Last name is required *")
            setValid(false)
            return
         }

         setError("")
         setLoading(true)

     updateUserNames(first, last, (res, status) => {
         if(status){
             setLoading(false)
             setEditFirst("")
             setEditLast("")
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
                            style={styles.input}
                            placeholder={value[0]}
                            value={editFirst}
                            onChangeText={text => {
                                setError
                                setEditFirst(text)
                            }}
                            error={isValid}
                           
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={value[1]}
                            value={editLast}
                            onChangeText={text => {
                                setError
                                setEditLast(text)
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
                        <SuccessButton title="Save" onPress={() => updateUserInfo(editFirst, editLast)} />
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
        textAlignVertical:'top',
        borderWidth: 0.5,
        fontSize: 17,
        marginTop:10,
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