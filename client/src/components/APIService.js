import axios from 'axios'
import {useState} from 'react'
export default class APIService {
  
  

     static  DeleteRule(rule_id){

        
 
const res =  axios.post('http://localhost:5051/api/deleteRule', rule_id).then(response => print(response));;
//setstate({ Message: response.data }

 


}
}