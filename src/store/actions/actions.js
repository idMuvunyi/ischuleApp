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

export const updateUserNames = async (first, last, callback)  => {
    try {
        const uid = auth().currentUser.uid
        const res = 
        await firestore()
        .collection('users')
        .doc(uid)
        .update({
            FirstName: first,
            lastName:last
        })

       callback(res, true)
    } catch (error) {
        callback(error.message, false)
    }
}

export const updateUserInfoText = async (value, label, callback)  => {
    try {
        
        const uid = auth().currentUser.uid
        const res = 
        await firestore()
        .collection('users')
        .doc(uid)
        .update({
            [label]: value
        })

       callback(res, true)
    } catch (error) {
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



