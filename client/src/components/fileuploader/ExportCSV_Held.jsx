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
        { label: "AM", key: "HeldBy" },
        { label: "InvoiceWeek", key: "InvoiceWeek" },
        { label: "Hold/Release", key: "HoldRelease" },
        { label: "Comment", key: "Comment" },
        { label: "FinanceGroup", key: "FinanceGroup" },
        { label: "CustomerName", key: "CustomerName" },
        { label: "CustomerCode", key: "Customer" },
        { label: "Carrier", key: "Carrier" },
        { label: "Connote", key: "Connote" },
        { label: "Cons_date", key: "Cons_date" },
        { label: "ShortErrDesc", key: "ShortErrDesc" },
        { label: "Reason", key: "Reason" },
        { label: "Sub Reason", key: "Sub_Reason" },
        { label: "Jno", key: "Jno" },
        { label: "from_loc", key: "from_loc" },
        { label: "Colsubzone", key: "Colsubzone" },
        { label: "To", key: "To" },
        { label: "Delsubzone", key: "Delsubzone" },
        { label: "Option_code", key: "Option_code" },
        { label: "Work_code", key: "Work_code" },
        { label: "Freight_charges", key: "Freight_charges" },
        { label: "Other_charges", key: "Other_charges" },
        { label: "Fuel_surch", key: "Fuel_surch" },
        { label: "Total_nett", key: "Total_nett" },
        { label: "Cus_ref", key: "Cus_ref" },
        { label: "Buy_Freight_Charges", key: "Buy_Freight_Charges" },
        { label: "Buy_Other_Charges", key: "Buy_Other_Charges" },
        { label: "Buy_Fuel_Surch", key: "Buy_Fuel_Surch" },
        { label: "Buy_TotalNett", key: "Buy_TotalNett" },
        { label: "gross", key: "gross" },
        { label: "items", key: "items" },
        { label: "space", key: "space" },
        { label: "lift", key: "lift" },
        { label: "pallet", key: "pallet" },
        { label: "hours", key: "hours" },
        { label: "cubic", key: "cubic" },
        { label: "del_com", key: "del_com" },
        { label: "col_post", key: "col_post" },
        { label: "del_post", key: "del_post" },
        { label: "weight", key: "weight" },
        { label: "chg_kg", key: "chg_kg" },
        { label: "del_ref", key: "del_ref" },
        { label: "unit", key: "unit" },
        { label: "Col_loc", key: "Col_loc" },
        { label: "Del_loc", key: "Del_loc" },
        { label: "Margin%", key: "Margin" },
        { label: "BuyFuel%", key: "BuyFuelPerc" },
        { label: "SellFuel%", key: "SellFuelPerc" },
        { label: "Cubic_Items", key: "Cubic_Items" },
        { label: "Dead_WeightBased", key: "Dead_WeightBased" },
        { label: "AP_InternalComment", key: "AP_InternalComment" },
        { label: "Held Type", key: "HeldType" },
        { label: "Held At", key: "HeldAt" }
      ];
      var d =  new Date,
      dformat = [d.getDate(),
                 d.getMonth()+1,
                 d.getFullYear()].join('/')+' '+
                [d.getHours(),
                 d.getMinutes(),
                 d.getSeconds()].join(':');

      var fname="IVT_Held_Consignments_";
    function fetchData(){

        let loginname=''
  
        loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
       
     const payload = {
       // make payload here using values
       LoginName: loginname // 'mnasir'//loginname
     }
    
     setIsLoading(true);
   
     axios.post('https://afs-web01:5051/api/exception/getHeldConnotefordownload', payload).then(response => {
        
        
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