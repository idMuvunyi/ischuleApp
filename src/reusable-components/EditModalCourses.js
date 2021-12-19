import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors'
import { updateUserInfoText } from '../store/actions/actions'
import { SuccessButton } from './Button'
import { courses } from '../rawData/coursesAPI'



export default function EditModalCourses(props) {

    const{ visible, value, setVisible } = props

    const [showModal, setShowModal] = useState(visible)
    const [error, setError] = useState("")
    const [selectedValue, setSelectedValue] = useState()
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
        let updatedValues = `${value[0]}, ${val}`
        let valArray = value[0].split(',')

        console.log(valArray.length)

        if(!val){
            setError("Input change is required *")
            return
         }
         else if(valArray.length > 5){
            setError("Only six courses can be choosen!")
            return
         }
         else if(value[0].includes(val)){
            setError("Course already chosen!")
            return
         }
         else{
             setError("")
             setLoading(true)
    
         updateUserInfoText(updatedValues, label, (res, status) => {
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
                             {value && value[1] === 'courses' ? (
                                courses
                                .filter(course => !course.includes(value[0]))
                                .map((item, index) => (
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