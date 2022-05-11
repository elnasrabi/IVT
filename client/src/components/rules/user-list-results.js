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






export const UserListResults = ({ Users, ...rest }) => {


  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const [data, setData] = useState(Users);

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

  function newUser(Users){

    const res =  axios.post('https://afs-web01:5051/api/rules/newUser', Users).then(response => {
      
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
      setAlertContent('Error in Creating the User - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }


  function updateSingleUser(User){

    const res =  axios.post('https://afs-web01:5051/api/rules/updateUser', User).then(response => {
      
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
      setAlertContent('Error in Updating the User - '+ error.message);
      setAlert(2);
     })
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
    
    }

    function deleteSingleUser(User){

      const res =  axios.post('https://afs-web01:5051/api/rules/deleteUser', User).then(response => {
        
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
        setAlertContent('Error in deleteing the User - '+ error.message);
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
        title="Users"
        icons={tableIcons}
        
        // icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Id", field: "Id" , editable: 'never',hidden:true},
          { title: "User Name", field: "AccountManager" },  //editable: 'never'
          { title: "Login Name", field: "LoginName"  },
          { title: "Is Active?", field: "IsActive",type:"numeric" },
          { title: "User Type", field: "UserType",type:"numeric" },
         
         
        ]}
        data={data}
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
            let updatedrows = [...data];
              //setData(getNewDataBulkEdit(changes, copyData));
              let index;
              rows.map(User=>{
                console.log('User.oldData.Id',User.oldData.tableData.id)
                index=User.oldData.tableData.id
                console.log('User.newData',User.newData)
                updatedrows[index]=User.newData

              })
              console.log('updatedrows',updatedrows)
            setTimeout(() => {
              for(var i=0;i<rows.length;i++){
                updateSingleUser(rows[i].newData) 
               }
            
             setData(updatedrows)
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
              newUser(newData);
              setData([...data, newData]);
              resolve();
            }, 1000);
          });
        },
        onRowUpdate: (newData, oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataCopy = [...data];
              // Find the index of the updated row - we have to use old data since
              // new data is not part of state yet
              const index2 = dataCopy.indexOf(oldData)
              // Update the found index with the new data
              dataCopy[index2] = newData;
              // Update our state
              setData(dataCopy);

              const dataUpdate = [...data];
              // In dataUpdate, find target
              const target = dataUpdate.find((el) => el.id === oldData.tableData.id);
              const index = dataUpdate.indexOf(target);
              dataUpdate[index] = newData;
             // setData([...dataUpdate]);
              updateSingleUser(newData);
              resolve();
            }, 1000);
          });
        },
        onRowDelete: (oldData) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const target = dataDelete.find((el) => el.Id === oldData.Id);
              const index = dataDelete.indexOf(target);
              console.log('index',index)
              dataDelete.splice(index, 1);
              // let _data = [...data];
              // dataDelete.forEach(rd => {
              //   _data = _data.filter(t => t.tableData.id !== rd.tableData.Id);
              // });
              // setData(_data);
              
              deleteSingleUser(oldData);
              setData([...dataDelete]);
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

UserListResults.propTypes = {
  Users: PropTypes.array.isRequired
};
