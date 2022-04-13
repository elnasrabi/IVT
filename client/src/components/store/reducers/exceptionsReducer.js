import {GET_EXCEPTIONS} from '../types'

const initialState = {
    exceptions:[],
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_EXCEPTIONS:
        return {
            ...state,
            exceptions:action.payload,
            loading:false

        }
        default: return state
    }

}