import {GET_EXCEPTIONS} from '../types'
import {SET_CURRENT_EXCEPTIONS} from '../types'

const currentexceptions = {
    exceptions:[],
    loading:true
}

export default function(state = currentexceptions, action){

    switch(action.type){

        case GET_EXCEPTIONS:
        return {
            ...state,
            exceptions:action.payload,
            loading:false

        }
        case SET_CURRENT_EXCEPTIONS:
        return { 
            ...state,currentexceptions:{
            exceptions:action.payload,
            loading:false

        }}
        default: return {...state}
    }

}