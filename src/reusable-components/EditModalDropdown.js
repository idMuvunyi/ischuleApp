import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors'
import { updateUserInfoText } from '../store/actions/actions'
import { SuccessButton } from './Button'
import { districts } from '../rawData/districtAPI'
import { education } from '../rawData/educationAPI'
import { years } from '../rawData/yearAPI'



export default function EditModalDropdown(props) {

    const{ visible, value, setVisible } = props

    const [showModal, setShowModal] = useState(visible)
    const [error, setError] = useState("")
    const [selectedValue, setSelectedValue] = useState(value[0])
    const [loading, setLoading] = useState(false)
    const genderList = ['Male', 'Female']

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

        if(!selectedValue){
            setError("Input is required *")
            return
         }
        

         setError("")
         setLoading(true)

     updateUserInfoText(val, label, (res, status) => {
         if(status){
             setLoading(false)
             setSelectedValue("")
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
                        <Picker
                            style={styles.input}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}  
                        >
                            {value && value[1] === 'gender' ? (
                                genderList.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index}/>
                                ))
                            
                            ): null}

                            {value && value[1] === 'address' ? (
                                districts.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index}/>
                                ))
                            
                            ): null}

                            {value && value[1] === 'edLevel' ? (
                                education.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index}/>
                                ))
                            
                            ): null}

                            {value && value[1] === 'graduated' ? (
                                years.map((item, index) => (
                            <Picker.Item label={item} value={item} key={index}/>
                                ))
                            
                            ): null}
                           
                        </Picker>

                {error ? (
               <View>
                <Text style={styles.errorTextStyle}>{error}</Text>
              </View>
              ) : null}
                    </View>

                    {loading ? <ActivityIndicator color={COLORS.success} size="large" style={{justifyContent:'center', alignItems:'center'}}/> : null}
                   
                    <View style={{ marginTop: 10 }}>
                        <SuccessButton title="Save" onPress={() => updateUserText(selectedValue)} />
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
        height: 30,
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