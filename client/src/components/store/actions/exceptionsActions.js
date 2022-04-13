import {GET_EXCEPTIONS, EXCEPTIONS_ERROR} from '../types'
import axios from 'axios'

export const getExceptions = () => async dispatch => {
    
    try{
        const res = await axios.get(`http://127.0.0.1:4545/exception/getCurrentException`)
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