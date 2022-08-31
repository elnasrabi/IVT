import { CSVLink, CSVDownload } from "react-csv";
import React from 'react'
import { useState,useEffect, useRef} from 'react';
import {
   Avatar,
    IconButton
    
  } from '@mui/material';
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import {
    AuthenticatedTemplate,
    useMsal,
  } from '@azure/msal-react';
import axios from 'axios'
import { ja } from "date-fns/locale";
const MyCsvLink = (props) => {
     const {accounts } = useMsal();
     const csvLink = useRef(null);
    const[data,setData]=useState([]);
    const[isloading,setIsLoading]=useState(false);

    const headers = [
    
        { label: "ErrPriority", key: "ErrPriority" },
        { label: "ErrCode", key: "ErrCode" },
        { label: "AccountManager", key: "AccountManager" },
        { label: "Exception", key: "ErrDesc" },
        { label: "Sub Reason", key: "Sub_Reason" },
        { label: "CurrentWeek", key: "CurrentWeek" },
        { label: "Jno", key: "jno" },
        { label: "CustomerName", key: "CustomerName" },
        { label: "Cons_date", key: "cons_date" },
        { label: "Carrier", key: "carrier" },
        { label: "con_note", key: "con_note" },
        { label: "from_loc", key: "from_loc" },
        { label: "Colsubzone", key: "colsubzone" },
        { label: "To", key: "to_loc" },
        { label: "Delsubzone", key: "delsubzone" },
        { label: "Option_code", key: "option_code" },
        { label: "Work_code", key: "work_code" },
        { label: "Freight_charges", key: "freight_charges" },
        { label: "Other_charges", key: "other_charges" },
        { label: "Fuel_surch", key: "fuel_surch" },
        { label: "Total_nett", key: "total_nett" },
        { label: "gst", key: "gst" },
        { label: "gross", key: "gross" },
        { label: "items", key: "items" },
        { label: "quantity", key: "quantity" },
        { label: "space", key: "space" },
        { label: "lift", key: "lift" },
        { label: "pallet", key: "pallet" },
        { label: "hours", key: "hours" },
        { label: "cubic", key: "cubic" },
        { label: "del_com", key: "del_com" },
        { label: "del_ref", key: "del_ref" },
        { label: "Cus_ref", key: "cus_ref" },
        { label: "col_post", key: "col_post" },
        { label: "del_post", key: "del_post" },
        { label: "chg_kg", key: "chg_kg" },
        { label: "weight", key: "weight" },
        { label: "RecordedDate", key: "RecordedDate" },
        { label: "ShortErrDesc", key: "ShortErrDesc" },
        { label: "FinanceGroup", key: "FinanceGroup" },
        { label: "BusinessCountry", key: "BusinessCountry" },
        { label: "ActionTime", key: "ActionTime" }
      ];
      var d =  new Date,
      dformat = [d.getDate(),
                 d.getMonth()+1,
                 d.getFullYear()].join('/')+' '+
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');

      var fname="IVT_Quality_Exceptions_";
    function fetchData(){

        let loginname=''
  
        loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
       
     const payload = {
       // make payload here using values
       LoginName: loginname // 'mnasir'//loginname
     }
    
     setIsLoading(true);
   
     axios.post('https://localhost:5050/api/exception/getQualityExceptionForDownload', payload).then(response => {
        
        
        setData( response.data )
      
        setIsLoading(false);
       csvLink.current.link.click()
      })
   
        }


   
      return (
        <div>
          {/* <button onClick={fetchData}>Download CSV</button> */}
          {(isloading) ? <div>
           Working on it...
           <Avatar
          alt="Rule"
          src='/static/images/rules/loading.svg'
          variant="square"
        />
        
      </div>: 
      <></> }
          <IconButton  onClick={fetchData} aria-label="add" tooltip="download">
          Download CSV File 
                    <DownloadIcon tooltip="Download CSV File"> </DownloadIcon>
                  </IconButton>
          <CSVLink
            data={data}
            headers={headers}
            filename={fname.concat(dformat,'.csv')}
            className="hidden"
            target="_blank" 
            ref={csvLink}
         />
      </div>
      )
    
  };

  export default MyCsvLink;