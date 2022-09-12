import { useState,useEffect, } from 'react';
import React, { Fragment } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes, { object } from 'prop-types';
import axios from 'axios'
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,IconButton,
  Typography
} from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/AddAlarm";
import tableIcons from "../TableIcons.js";
import { getInitials } from '../../utils/get-initials';
import MaterialTable , { MTableAction } from "material-table";
import { useNavigate } from "react-router-dom";
import Link from 'next/link'






export const PrefixeListResults = ({ Prefixes, ...rest }) => {


  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const [data, setData] = useState(Prefixes);

  function getNewDataBulkEdit(changes, copyData) {
    // key matches the column data id
    const keys = Object.keys(changes);
    for (let i = 0; i < keys.length; i++) {
      if (changes[keys[i]] && changes[keys[i]].newData) {
        // Find the data item with the same key in copyData[]
        let targetData = copyData.find((el) => el.id === keys[i]);
        if (targetData) {
          let newTargetDataIndex = copyData.indexOf(targetData);
          copyData[newTargetDataIndex] = changes[keys[i]].newData;
        }
      }
    }
    return copyData;
  }

  function newPrefix(prefix){

    const res =  axios.post('https://127.0.0.1:5050/api/rules/newPrefix', prefix).then(response => {
      
    console.log('response.data.success',response.data);
      if(response.data.Msg)
        {
          setAlertContent(response.data.Msg);
          setAlert(1);
        }
      else
        {
          setAlertContent( error.message);
          setAlert(2);
        }
     }).catch(error=>{
      setAlertContent('Error in Creating the Prefix - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }


  function updateSinglePrefix(prefix){

    const res =  axios.post('https://127.0.0.1:5050/api/rules/updatePrefix', prefix).then(response => {
      
    console.log('response.data.success',response.data);
      if(response.data.Msg)
        {
          setAlertContent(response.data.Msg);
          setAlert(1);
        }
      else
        {
          setAlertContent( error.message);
          setAlert(2);
        }
     }).catch(error=>{
      setAlertContent('Error in Updating the Prefix - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }

    function deleteSinglePrefix(prefix){

      const res =  axios.post('https://127.0.0.1:5050/api/rules/deletePrefix', prefix).then(response => {
        
      console.log('response.data.success',response.data);
        if(response.data.Msg)
          {
            setAlertContent(response.data.Msg);
            setAlert(1);
          }
        else
          {
            setAlertContent( error.message);
            setAlert(2);
          }
       }).catch(error=>{
        setAlertContent('Error in deleteing the Prefix - '+ error.message);
        setAlert(2);
       })
      //setstate({ Message: response.data }
      //setMsg(response.data.Msg)
      
      }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <div className="App">
        <NextLink
        href="/rules"
        passHref
      >
        <Button
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          IVT Admin Panel
        </Button>
      </NextLink>
        {(alert==1) ? <Alert severity='success'>{alertContent}</Alert> : (alert==2)?<Alert severity='error'>{alertContent}</Alert> : <></> }
      <MaterialTable
        title="prefixes"
        icons={tableIcons}
        
        // icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Id", field: "Id" , editable: 'never',hidden:true},
          { title: "Customer", field: "Customercode" },  //editable: 'never'
          { title: "Prefix", field: "Prefix",initialEditValue:0 },
          { title: "Carrier", field: "Carrier",initialEditValue:0 },
          { title: "Del Com", field: "DeliveryComment",lookup: { true: '1', false: '0' } ,initialEditValue:0} ,
          { title: "Cust Ref", field: "CustomerReference",lookup: { true: '1', false: '0' },initialEditValue:0},
          //{ title: "Old Month", field: "Old_Connote_Month",initialEditValue:0,hidden:true },
          { title: "GM <", field: "GM_Below",initialEditValue:0},
          { title: "GM >", field: "GM_Above",initialEditValue:0 },
          { title: "GM MV", field: "GM_Movement",initialEditValue:0 },
          // { title: "Fuel >", field: "FuelDiff_Above",initialEditValue:0,hidden:true },
          // { title: "Fuel <", field: "FuelDiff_Below",initialEditValue:0,hidden:true },
          // { title: "Fuel Freight", field: "Fuel_Freight_Ratio",initialEditValue:0,hidden:true },
          { title: "TotalSell", field: "TotalSell_Threshold",initialEditValue:0 },
          { title: "Cubic", field: "Cubic_Threshold",initialEditValue:0 },
          { title: "Weight", field: "Weight_Threshold",initialEditValue:0},
          { title: "Pallet", field: "Pallet_Threshold",initialEditValue:0},
          { title: "ChgWeight Diff", field: "ChgWeight_Weight_Diff",initialEditValue:0},
          { title: "International", field: "International_Check",initialEditValue:0},
          { title: "DELCOM Format", field: "DEL_COM_Format",initialEditValue:0},
          { title: "CusRef Digits", field: "CusRef_Digits",initialEditValue:0},
          { title: "GM Months", field: "GM_Month",initialEditValue:0},
          { title: "#Jobs Prefixed", field: "No_Jobs_Prefixed",initialEditValue:0},
          { title: "Moveit Dups", field: "Moveit_Dups_Check",initialEditValue:0},
          { title: "Moveit Customer", field: "Moveit_Customer_Check",initialEditValue:0},
          // { title: "Custom_Rule_1", field: "Custom_Rule_1",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_2", field: "Custom_Rule_2",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_3", field: "Custom_Rule_3",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_4", field: "Custom_Rule_4",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_5", field: "Custom_Rule_5",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_6", field: "Custom_Rule_6",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_7", field: "Custom_Rule_7",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_8", field: "Custom_Rule_8",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_9", field: "Custom_Rule_9",initialEditValue:0,hidden:true },
          // { title: "Custom_Rule_10", field: "Custom_Rule_10",initialEditValue:0,hidden:true },
      
        ]}
        data={Prefixes}
        onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.tableData.id)}
        onSelectionChange={(row)=>setSelectedRows(row)}
        options={{
          filtering: true,
          showTitle: false,
          actionsColumnIndex: -1,
          // Paging//
          paging:true,
          pageSize:6,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[6,12,20,50], 
          // Export//
          exportAllData:true,
          exportButton: {
            csv: true,
            pdf: true,
         },
          searchFieldStyle: {
            color: "black"
        },
          
          headerStyle: {
              backgroundColor: "#fff",
          },
          selection: true,
       showFirstLastPageButtons: false,

       rowStyle: (rowData) => ({
        backgroundColor:
          selectedRow === rowData.tableData.id ? "#6ABAC9" : "#FFF",
      }),

        }}
        

      //   onSelectionChange={(evt, rowData) => {
      //     handleCheckboxClick(rowData);
      // }}

      
      editable={{
        onBulkUpdate: (changes) => {
          return new Promise((resolve, reject) => {
            const rows=Object.values(changes);
            console.log('...Prefixes',...Prefixes)
            let updatedrows = [...Prefixes];
              //setData(getNewDataBulkEdit(changes, copyData));
              let index;
              rows.map(prefix=>{
                //console.log('prefix.oldData.Id',prefix.oldData.tableData.id)
                index=prefix.oldData.tableData.id
               // console.log('prefix.newData',prefix.newData)
                updatedrows[index]=prefix.newData

              })
             // console.log('updatedrows',updatedrows)
            setTimeout(() => {
              for(var i=0;i<rows.length;i++){
                updateSinglePrefix(rows[i].newData) 
               }
            
             setData(updatedrows)
             Prefixes=data;
              resolve();
            }, 2000);
          })
        },
        onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
        onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
        onRowAdd: (newData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              //newData.id = "uuid-" + Math.random() * 10000000;
              newPrefix(newData);
              setData([...Prefixes, newData]);
              Prefixes=data;
              resolve();
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataCopy = [...Prefixes];
              // Find the index of the updated row - we have to use old data since
              // new data is not part of state yet
              const index2 = dataCopy.indexOf(oldData)
              // Update the found index with the new data
              dataCopy[index2] = newData;
              // Update our state
              setData(dataCopy);
              Prefixes=data;
              console.log('...Prefixes',data)
              if(Prefixes)
              {
                const dataUpdate = [...Prefixes];
                // In dataUpdate, find target
                const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
                const index = dataUpdate.indexOf(target);
                dataUpdate[index] = newData;
               // setData([...dataUpdate]);
               
              }

              updateSinglePrefix(newData);
           
              resolve();
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...Prefixes];
              const target = dataDelete.find((el) => el.Id === oldData.Id);
              const index = dataDelete.indexOf(target);
              console.log('index',index)
              dataDelete.splice(index, 1);
              // let _data = [...Prefixes];
              // dataDelete.forEach(rd => {
              //   _data = _data.filter(t => t.tableData.id !== rd.tableData.Id);
              // });
              // setData(_data);
              
              deleteSinglePrefix(oldData);
              setData([...dataDelete]);
              Prefixes=data;
              resolve();
            }, 1000);
          });
        },
      }}
      />
    </div>
        </Box>
      </PerfectScrollbar>
  
    </Card>
  );
};

PrefixeListResults.propTypes = {
  prefixes: PropTypes.array.isRequired
};
