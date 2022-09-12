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






export const CubicListResults = ({ Cubics, ...rest }) => {


  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const [data, setData] = useState(Cubics);

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

  function newCubic(Cubic){

    const res =  axios.post('https://127.0.0.1:5050/api/rules/newCubic', Cubic).then(response => {
      
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
      setAlertContent('Error in Creating the Cubic - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }


  function updateSingleCubic(Cubic){

    const res =  axios.post('https://127.0.0.1:5050/api/rules/updateCubic', Cubic).then(response => {
      
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
      setAlertContent('Error in Updating the Cubic - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }

    function deleteSingleCubic(Cubic){

      const res =  axios.post('https://127.0.0.1:5050/api/rules/deleteCubic', Cubic).then(response => {
        
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
        setAlertContent('Error in deleteing the Cubic - '+ error.message);
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
        title="Cubics"
        icons={tableIcons}
        
        // icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Id", field: "Id" , editable: 'never',hidden:true},
          { title: "Customer", field: "Customer" },  //editable: 'never'
          { title: "Carrier", field: "Carrier"  },
          { title: "Ref Cubic", field: "RefCubic",type:"numeric" },
         
        ]}
        data={Cubics}
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
            let updatedrows = [...Cubics];
              //setData(getNewDataBulkEdit(changes, copyData));
              let index;
              rows.map(Cubic=>{
                console.log('Cubic.oldData.Id',Cubic.oldData.tableData.id)
                index=Cubic.oldData.tableData.id
                console.log('Cubic.newData',Cubic.newData)
                updatedrows[index]=Cubic.newData

              })
              console.log('updatedrows',updatedrows)
            setTimeout(() => {
              for(var i=0;i<rows.length;i++){
                updateSingleCubic(rows[i].newData) 
               }
            
             setData(updatedrows)
             Cubics=data;
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
              newCubic(newData);
              setData([...Cubics, newData]);
              Cubics=data;
              resolve();
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataCopy = [...Cubics];
              // Find the index of the updated row - we have to use old data since
              // new data is not part of state yet
              const index2 = dataCopy.indexOf(oldData)
              // Update the found index with the new data
              dataCopy[index2] = newData;
              // Update our state
              setData(dataCopy);
              Cubics=data;
              const dataUpdate = [...Cubics];
              // In dataUpdate, find target
              const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
              const index = dataUpdate.indexOf(target);
              dataUpdate[index] = newData;
             // setData([...dataUpdate]);
              updateSingleCubic(newData);
              resolve();
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...Cubics];
              const target = dataDelete.find((el) => el.Id === oldData.Id);
              const index = dataDelete.indexOf(target);
              console.log('index',index)
              dataDelete.splice(index, 1);
              // let _data = [...Cubics];
              // dataDelete.forEach(rd => {
              //   _data = _data.filter(t => t.tableData.id !== rd.tableData.Id);
              // });
              // setData(_data);
              
              deleteSingleCubic(oldData);
              setData([...dataDelete]);
              Cubics=data;
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

CubicListResults.propTypes = {
  Cubics: PropTypes.array.isRequired
};
