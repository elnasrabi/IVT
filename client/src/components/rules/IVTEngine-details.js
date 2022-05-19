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



const Tasks = [
  {
    value: 'All',
    label: 'All'
  },
  {
    value: 'P1',
    label: 'Priority 1 Rules'
  },
  {
    value: 'P2',
    label: 'Priority 2 Rules'
  }
  ,{
    value: 'P3',
    label: 'Priority 3 Rules'
  }
];

export const IVTEngineDetails = (props) => {
  const [task, setTask] = useState('All');
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function resetDashboard(){
    localStorage.setItem('CommonMeasure', '');
    localStorage.setItem('Top10excpetion', '');
    localStorage.setItem('TotalMeasure', '');
    localStorage.setItem('LastIVTInvoiceWeek', '');
    localStorage.setItem('FocusedCustomer', '');
  }
  
  const handleChange = (event) => {
    setTask(event.target.value);
  };
  function runIVT(task){
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        setAlertContent('IVT Engine Tasks Started...');
        setAlert(3);

           const res =  axios.post('https://afs-web01:5051/api/rules/runIVT',{ task: task } ).then(response => {
             
            
             if(response.data.Msg)
               {
                 setAlertContent(response.data.Msg);
                 setAlert(1);
                 resetDashboard()
               }
             else
               {
                 setAlertContent( error.message);
                 setAlert(2);
               }
            }).catch(error=>{
             setAlertContent('Error in running the engine - '+ error.message);
             setAlert(2);
            })
           //setstate({ Message: response.data }
           //setMsg(response.data.Msg)
        resolve();
      }, 5000);
      // Run the ML Model in background
      axios.get('https://afs-web01:5051/api/ML/getMLIFExceptions')
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
          <span className="alert-text"><strong>Progressing : </strong>{task}{' Related '} {alertContent} </span>
          </Alert>
      </div>: 
      <></> }

      <Card>
        <CardHeader
          subheader="Select the required task to be initiated"
          
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
                label="Select Task Type"
                name="task"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={task}
                variant="outlined"
              >
                {Tasks.map((option) => (
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
            onClick={()=>{runIVT(task)}}
            disabled={isLoading}
          >
            Run 
          </Button>
        </Box>
      </Card>
    </form>
  );
};


export default IVTEngineDetails;