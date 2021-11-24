import * as types from '../types/types'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const register = async(email, password, firstName, lastName, userType, callBack) => {

    const d = new Date()
    const dummyYear = d.getFullYear()
    
    try {
        let uid;
        await auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                if (userCredential.user) {
                    userCredential.user.updateProfile({
                        displayName: lastName
                    })
                        .catch(err => {
                            console.log(err)
                        })

                    uid = userCredential.user.uid
                }
            })

        if (uid) {
            firestore()
                .collection('users')
                .doc(uid)
                .set({
                    id: uid,
                    FirstName: firstName,
                    lastName:lastName,
                    gender:'',
                    email:email,
                    address:'',
                    edLevel:'Secondary School',
                    studyField:'',
                    institution:'',
                    graduated: dummyYear,
                    courses:'Maths, English',
                    ratings:'0',
                    availability:'',
                    availableTime:'',
                    salary:'0',
                    salaryTo:'0',
                    about:'I like to teach, and It will be my honor to help you perform well in your studies. connect with me today!',
                    imageUrl:'',
                    userType: userType
                })
        }

        callBack(uid ,true)

    } catch (error) {
        console.log(error)
        callBack(error.message, false)
    }
}


export const login = (email, password, callback) => async dispatch => {
    
    try {
            const res = await auth().signInWithEmailAndPassword(email, password)
            callback(res, true)

       
    } catch (error) {
        callback(error.message, false)
    }
}

export const setInfo = (callback) => async dispatch => {
    
    try {
            const uid = auth().currentUser.uid

            const userDetails =
                await firestore()
                .collection('users')
                .doc(uid)
                .get()
                
            let list = userDetails.data()

            dispatch({
                type:types.SET_USER,
                payload:{ list }
            }) 
       callback(userDetails, true)

    } catch (error) {
        dispatch({
            type:types.SET_USER,
            payload:{}
        })
        callback(error.message, false)
    }
}

export const logout = (callback) => async dispatch => {
    try {
        await auth().signOut()
        callback(true)
        dispatch({
            type:types.SET_USER,
            payload:{}
        })
    } catch (error) {
        callback(false)
    }
}

export const resetPassword = async (email, callback)  => {
    try {
       const res = await auth().sendPasswordResetEmail(email)
       callback(res, true)
    } catch (error) {
        callback(error.message, false)
    }
}



export const setFees = (callback) => async dispatch => {
    
    try {
        let clinic_id = 17;
        let encounter_id = 2665791;
        
        await fetch(`http://8754-49-204-132-22.ngrok.io/api/v1/checkout/encounters/${clinic_id}/${encounter_id}`)
        .then(data => {
            return data.json()
        })
        .then(fees => {

            dispatch({
                type: types.SET_FEES_INFO,
                payload:{fees}
            })

            callback(fees, true)
        })
 

    } catch (error) {
        callback(error, false)
    }
}