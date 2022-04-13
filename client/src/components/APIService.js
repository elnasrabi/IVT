import axios from 'axios'
import {useState} from 'react'
export default class APIService {
  
  

     static  DeleteRule(rule_id){

        
 
const res =  axios.post('http://127.0.0.1:4545/deleteRule', rule_id).then(response => print(response));;
//setstate({ Message: response.data }

 


}
}