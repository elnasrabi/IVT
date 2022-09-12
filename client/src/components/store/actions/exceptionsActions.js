import {GET_EXCEPTIONS,SET_CURRENT_EXCEPTIONS, EXCEPTIONS_ERROR} from '../types'
import axios from 'axios'

export const getExceptions = () => async dispatch => {
    
    try{
        const res = await axios.get(`https://127.0.0.1:5050/api/exception/getCurrentException`)
        dispatch( {
            type: GET_EXCEPTIONS,
            payload: res.data.
            console.log('res data api:',res.data)
        })
    }
    catch(e){
        dispatch( {
            type: EXCEPTIONS_ERROR,
            payload: console.log(e),
        })
    }

}


export const setExceptions = (exception)  => ({
    
            type: SET_CURRENT_EXCEPTIONS,
            payload: exception,

}  );