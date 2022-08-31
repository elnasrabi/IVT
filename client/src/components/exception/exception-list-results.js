import { useState,useEffect, } from 'react';
import React, { Fragment } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import axios from 'axios'
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
import ViewIcon from "@material-ui/icons/Search";
import tableIcons from "../TableIcons.js";
import { getInitials } from '../../utils/get-initials';
import MaterialTable , { MTableAction } from "material-table";
import { useNavigate } from "react-router-dom";
import Link from 'next/link'
import {

  useMsal,
} from '@azure/msal-react';
import MyCsvLink from '../fileuploader/ExportCSV_Quality';





export const ExceptionListResults = ({props,exceptions, ...rest }) => {
  
  const [dataForTable, setDataForTable] = useState();

 
  const { accounts } = useMsal();
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    fabProgress: {
      color: green[500],
      position: "absolute",
      top: 6,
      left: 6,
      zIndex: 1
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    }
  }));
  
  const [Exception_id, setException_id] = useState(0);
 
  const tableRef = React.createRef();
  const addActionRef = React.useRef();
  const holdActionRef = React.useRef();
  const [loading, setLoading] = useState(-1);
  const classes = useStyles();

  const [selectedExceptionIds, setSelectedExceptionIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const handleSelectAll = (event) => {
    let newSelectedExceptionIds;

    if (event.target.checked) {
      newSelectedExceptionIds = exceptions.map((exception) => exception.jno);
    } else {
      newSelectedExceptionIds = [];
    }

    setSelectedExceptionIds(newSelectedExceptionIds);
  };

  const handleCheckboxClick = (rowData) => {
    rowData.tableData.checked = true
};


function DeleteExceptionApi(Exception_id){

   
 
  const res =  axios.post('https://localhost:5050/api/deleteException', Exception_id).then(response => {
    
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
    setAlertContent('Error in Holding the Connote - '+ error.message);
    setAlert(2);
   })
  //setstate({ Message: response.data }
  //setMsg(response.data.Msg)
   
  
  
  }

const deleteException = () =>{

 const res= DeleteExceptionApi({Exception_id});



}

const handleHoldConnote=(connoteparam)=>{
  let path = `../exception/HeldConnote`; 
  window.open(`../exception/HeldConnote`);
}

const handleSubmit=(event)=>{ 
  event.preventDefault()
  insertArticle()
  setTitle('')
  setBody('')
}

  const handleSelectOne = (event, jno) => {
    const selectedIndex = selectedExceptionIds.indexOf(jno);
    let newSelectedExceptionIds = [];

    if (selectedIndex === -1) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds, jno);
    } else if (selectedIndex === 0) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds.slice(1));
    } else if (selectedIndex === selectedExceptionIds.length - 1) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(selectedExceptionIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedExceptionIds = newSelectedExceptionIds.concat(
        selectedExceptionIds.slice(0, selectedIndex),
        selectedExceptionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedExceptionIds(newSelectedExceptionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleChangeRowsPerPage = (
  ) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
     
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
        <div className="App">
        {(alert==1) ? <Alert severity='success'>{alertContent}</Alert> : (alert==2)?<Alert severity='error'>{alertContent}</Alert> : <></> }
        <div>
       <MyCsvLink/>
        </div>
      <MaterialTable
        title="Exceptions"
        icons={tableIcons}
        
        // icons={{ Filter: () => <FiltersMenu /> }}
        columns={[
          { title: "Exception", field: "ShortErrDesc",editable:'never'},
          { title: "Customer", field: "FinanceGroup",editable:'never' },
          { title: "Connote", field: "con_note",editable:'never' },
          { title: "Week", field: "CurrentWeek",editable:'never' },
          { title: "Carrier", field: "carrier",editable:'never' },
          { title: "Account Manager", field: "AccountManager",editable:'never'},
         
          {
            title: "Actions",
            render: rowData => {
              return (
                <div>
                  {/* <IconButton
                    aria-label="edit"
                    disabled={loading===rowData.jno}
                    onClick={() => {
                      alert("You edit " + rowData.jno);
                    }}
                  >
                    <EditIcon />
                    {loading===rowData.jno && (
                      <CircularProgress
                        size={38}
                        className={classes.fabProgress}
                      />
                    )}
                  </IconButton> */}
                   <Link
            href={{
              pathname: '/exception/HeldConnote',
              query: { connote: JSON.stringify(rowData) },
            }}  as="/exception/HeldConnote"
          >
               <IconButton aria-label="add" tooltip="Hold Connote">
                    <AddIcon tooltip="Hold Connote"> </AddIcon>
                  </IconButton>
                 </Link>

                 <Link
            href={{
              pathname: '/exception/ViewConnote',
              query: { connote: JSON.stringify(rowData) },
            }}  as="/exception/ViewConnote"
          >
               <IconButton aria-label="add" tooltip="View Connote">
                    <ViewIcon tooltip="View Connote"> </ViewIcon>
                  </IconButton>
                 </Link>
                  
                </div>
              );
            }
          }
        ]}
        data={exceptions}
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
              rows.map(HeldConnote=>{
                console.log('HeldConnote.oldData.Id',HeldConnote.oldData.tableData.id)
                index=HeldConnote.oldData.tableData.id
                console.log('HeldConnote.newData',HeldConnote.newData)
                updatedrows[index]=HeldConnote.newData

              })
              console.log('updatedrows',updatedrows)
            setTimeout(() => {
              for(var i=0;i<rows.length;i++){
                updateSingleHeldConnote(rows[i].newData) 
               }
            
             setData(updatedrows)
              resolve();
            }, 2000);
          })
        },
      }}

      actions={[
      
        (rowData) => ({
          icon: () =>    <Link
          href={{
            pathname: '/exception/HeldBulkConnote',
            query: { connote: JSON.stringify(selectedRows) },
          }}  as="/exception/HeldBulkConnote"
        >
             <IconButton aria-label="add" tooltip="Hold Connote">
                  <AddIcon tooltip="Hold Connote"> </AddIcon>
                </IconButton>
               </Link>,
          isFreeAction: true,
          tooltip: 'Hold Connotes',
          onClick: (event, rowData) => console.log(selectedRows),
          disabled: rowData.birthYear < 2000
        })
      ]}
      />
    </div>
        </Box>
      </PerfectScrollbar>
  
    </Card>
  );
};

ExceptionListResults.propTypes = {
  exceptions: PropTypes.array.isRequired
};
