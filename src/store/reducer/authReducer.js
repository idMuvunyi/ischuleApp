import * as types from '../types/types'
const initialState = {
    userAuth:[],
    feesList:[]
}

export const authReducer = ( state = initialState, action) => {

    switch(action.type){
        case types.SET_USER:
            return {
                ...state, userAuth:[action.payload.list]
            }

            case types.SET_FEES_INFO:
                return {
                    ...state, feesList:[action.payload.fees]
                }

        default:
            return state;
    }
}