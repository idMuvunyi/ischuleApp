import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet,
     TextInput, TouchableOpacity, 
    ToastAndroid, ActivityIndicator, 
    Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-picker/picker'
import COLORS from '../assets/colors'
import { updateUserSalary } from '../store/actions/actions'
import { SuccessButton } from './Button'


export default function EditModalAvailability(props) {

    const{ visible, value, setVisible } = props

    const [showModal, setShowModal] = useState(visible)
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState("Mon")
    const [selectedVal, setSelectedVal] = useState("Fri")
    const [date, setDate] = useState(new Date());
    const [dateTwo, setDateTwo] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showTwo, setShowTwo] = useState(false);

    
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
   // From time methods
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

      // Until time methods
      const onChangeTwo = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowTwo(Platform.OS === 'ios');
        setDateTwo(currentDate);
      };

      const showModeTwo = (currentMode) => {
        setShowTwo(true);
        setMode(currentMode);
      };
    
    
      const showTimepickerTwo = () => {
        showModeTwo('time');
      };

      const time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
      .replace(/(:\d{2})$/, "");

      const timeTwo = dateTwo.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
      .replace(/(:\d{2})$/, "");

    // Update user Info
    const updateUserInfo = (first, last) => {

        let label = value[1]
        let labelTo = value[3]
        let days = `${selectedValue} - ${selectedVal}`
        let times = `${time} - ${timeTwo}`
        
         setLoading(true)

     updateUserSalary(days, label, times, labelTo, (res, status) => {
         if(status){
             setLoading(false)
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
                        <Text style={{ fontSize: 18, color: COLORS.success }}>Set Availability</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setVisible(false)}
                        >
                        <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>
                <View style={{ marginVertical: 20 }}>
                    <Text>from (Day)</Text>
                <Picker
                    style={styles.input}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}  
                    >
                    <Picker.Item label="Monday" value="Mon" />
                    <Picker.Item label="Tuesday" value="Tue" />
                    <Picker.Item label="Wednesday" value="Wed" />
                    <Picker.Item label="Thursday" value="Thu" />
                    <Picker.Item label="Friday" value="Fri" />
                    <Picker.Item label="Saturday" value="Sat" />
                    <Picker.Item label="Sunday" value="Sun" />
                </Picker>

                <Text>Until (Day)</Text>
                <Picker
                    style={styles.input}
                    selectedValue={selectedVal}
                    onValueChange={(itemValue, itemIndex) => setSelectedVal(itemValue)}  
                    >
                    <Picker.Item label="Monday" value="Mon" />
                    <Picker.Item label="Tuesday" value="Tue" />
                    <Picker.Item label="Wednesday" value="Wed" />
                    <Picker.Item label="Thursday" value="Thu" />
                    <Picker.Item label="Friday" value="Fri" />
                    <Picker.Item label="Saturday" value="Sat" />
                    <Picker.Item label="Sunday" value="Sun" />
                </Picker>

              <TouchableOpacity onPress={() => showTimepicker()}>
              <Text>From (Time)</Text>
                <TextInput
                    style={styles.input}
                    value={time} 
                    editable={false}
                    onPressIn={showTimepicker}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showTimepickerTwo()}
            style={{marginTop:12}}
            >
              <Text>Until (Time)</Text>
                <TextInput
                    style={styles.input}
                    value={timeTwo} 
                    editable={false}
                    onPressIn={showTimepicker}
                />
            </TouchableOpacity>

                {show && (
              <DateTimePicker
                testID="dateTimePicker"
                 value={date}
                 mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChange}
             />
              )}

            {showTwo && (
              <DateTimePicker
                testID="dateTimePicker"
                 value={dateTwo}
                 mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChangeTwo}
             />
              )}

                
                    </View>

                    {loading ? <ActivityIndicator color={COLORS.success} size="large" style={{justifyContent:'center', alignItems:'center'}}/> : null}
                   
                    <View style={{ marginTop: 10 }}>
                        <SuccessButton title="Save" onPress={() => updateUserInfo(selectedValue, selectedVal)} />
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
        marginTop:5,
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