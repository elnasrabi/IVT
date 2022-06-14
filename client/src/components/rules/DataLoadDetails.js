import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Avatar,
  TextField
} from '@mui/material';
import axios from 'axios'
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { DatePicker,DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';



const LoadType = [
  {
    value: 'All',
    label: 'All Files'
  },
  {
    value: 'Sell',
    label: 'Sell'
  },
  {
    value: 'Buy',
    label: 'Buy'
  }
  ,{
    value: 'Fuel',
    label: 'Fuel'
  }
];

export const DataLoadDetails = (props) => {
  const [load, setload] = useState('All');
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');
  const [InvoiceWeek, setInvoiceWeek] = useState('null');
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setload(event.target.value);
  };
  function LoadFiles(load){

    setIsLoading(true)
    return new Promise((resolve, reject) => {
      
      setAlertContent('File load Started...');
        setAlert(3);

      setTimeout(() => {
        
        
           
           const res =  axios.post('http://localhost:5051/api/admin/IVTDataLoad',{ Type: load.Type,InvoiceWeek:load.InvoiceWeek } ).then(response => {
             
            
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
             setAlertContent('Error in Loading the data - '+ error.message);
             setAlert(2);
            })
           //setstate({ Message: response.data }
           //setMsg(response.data.Msg)
        resolve();
      }, 60000);
    });
 
    
    }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      
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
        {(alert==1) ? <Alert severity='success'>  <span className="alert-text"><strong>Success : </strong> {alertContent} </span></Alert> :
         (alert==2)?<Alert severity='error'>  <span className="alert-text"><strong>Error : </strong> {alertContent} </span></Alert> :
        (alert==3)?<div>
           <Avatar
          alt="Rule"
          src='/static/images/rules/loading.svg'
          variant="square"
        />
          <Alert severity='info' color="primary">
          <span className="alert-text"><strong>Progressing : </strong>{load}{' Related '} {alertContent} </span>
          </Alert>
      </div>: 
      <></> }

<Card>
        <CardHeader
          subheader="Please provide the Invoice week"
          
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
 <DatePicker
         value={InvoiceWeek}
         margin="dense"
         required
         inputVariant="outlined"
         error={!InvoiceWeek}
         disableFuture
         format="dd-MM-yyyy"
         onChange={(inv)=>{setInvoiceWeek(inv); setIsLoading(false)}}
         label="Invoice Week"
         // openTo="year"
         // views={["year", "month", "day"]}
         showTodayButton
         helperText={'Please Enter the Invoice Week'}
      />
</MuiPickersUtilsProvider>
         
              
            </Grid>
          </Grid>
        </CardContent>
      
      </Card>
      <Card>
        <CardHeader
          subheader="Select the file type"
          
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select file Type"
                name="load"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={load}
                variant="outlined"
              >
                {LoadType.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
         
              
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={()=>{LoadFiles({Type:load,InvoiceWeek:InvoiceWeek})}}
            disabled={isLoading}
          >
            Load Files 
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default DataLoadDetails;