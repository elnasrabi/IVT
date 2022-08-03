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






export const AMPortfolioListResults = ({ AMPortfolios, ...rest }) => {


  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const [data, setData] = useState(AMPortfolios);

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

  function newAMPortfolio(AMPortfolios){

    const res =  axios.post('https://localhost:5050/api/rules/newAMPortfolio', AMPortfolios).then(response => {
      
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
      setAlertContent('Error in Creating the AMPortfolio - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }


  function updateSingleAMPortfolio(AMPortfolio){

    const res =  axios.post('https://localhost:5050/api/rules/updateAMPortfolio', AMPortfolio).then(response => {
      
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
      setAlertContent('Error in Updating the AMPortfolio - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }

    function deleteSingleAMPortfolio(AMPortfolio){

      const res =  axios.post('https://localhost:5050/api/rules/deleteAMPortfolio', AMPortfolio).then(response => {
        
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
        setAlertContent('Error in deleteing the AMPortfolio - '+ error.message);
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
        title="AMPortfolios"
        icons={tableIcons}
        
        // icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Id", field: "Id" , editable: 'never',hidden:true},
          { title: "Customer", field: "CustomerCode" },  //editable: 'never'
          { title: "Account Manager", field: "AccountManager"  },
          { title: "LoginName", field: "LoginName" },
       
        ]}
        data={AMPortfolios}
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
            let updatedrows = [...AMPortfolios];
              //setData(getNewDataBulkEdit(changes, copyData));
              let index;
              rows.map(AMPortfolio=>{
                console.log('AMPortfolio.oldData.Id',AMPortfolio.oldData.tableData.id)
                index=AMPortfolio.oldData.tableData.id
                console.log('AMPortfolio.newData',AMPortfolio.newData)
                updatedrows[index]=AMPortfolio.newData

              })
              console.log('updatedrows',updatedrows)
            setTimeout(() => {
              for(var i=0;i<rows.length;i++){
                updateSingleAMPortfolio(rows[i].newData) 
               }
            
             setData(updatedrows)
             AMPortfolios=data;
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
              newAMPortfolio(newData);
              setData([...AMPortfolios, newData]);
              AMPortfolios=data;
              resolve();
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataCopy = [...AMPortfolios];
              // Find the index of the updated row - we have to use old data since
              // new data is not part of state yet
              const index2 = dataCopy.indexOf(oldData)
              // Update the found index with the new data
              dataCopy[index2] = newData;
              // Update our state
              setData(dataCopy);
              AMPortfolios=data;

              const dataUpdate = [...AMPortfolios];
              // In dataUpdate, find target
              const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
              const index = dataUpdate.indexOf(target);
              dataUpdate[index] = newData;
             // setData([...dataUpdate]);
              updateSingleAMPortfolio(newData);
              resolve();
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...AMPortfolios];
              const target = dataDelete.find((el) => el.Id === oldData.Id);
              const index = dataDelete.indexOf(target);
              console.log('index',index)
              dataDelete.splice(index, 1);
              // let _data = [...AMPortfolios];
              // dataDelete.forEach(rd => {
              //   _data = _data.filter(t => t.tableData.id !== rd.tableData.Id);
              // });
              // setData(_data);
              
              deleteSingleAMPortfolio(oldData);
              setData([...dataDelete]);
              AMPortfolios=data;
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

AMPortfolioListResults.propTypes = {
  AMPortfolios: PropTypes.array.isRequired
};
