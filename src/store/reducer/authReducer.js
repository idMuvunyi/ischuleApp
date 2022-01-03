import * as types from '../types/types'
const initialState = {
    userAuth:[],
    tutors:[]
}

export const authReducer = ( state = initialState, action) => {

    switch(action.type){
        case types.SET_USER:
            return {
                ...state, userAuth:[action.payload.list]
            }

            case types.SET_TUTOR:
                return {
                    ...state, tutors:[...action.payload.tutors]
                }
           
        default:
            return state;
    }
}