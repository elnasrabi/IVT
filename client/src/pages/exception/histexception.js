import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { ExceptionListResults } from '../../components/exception/exception-list-results';
import { Users} from '../../components/exception/test-redux';
import { ExceptionListToolbar } from '../../components/exception/exception-list-toolbar';
import { TableTest } from '../../components/exception/tabletest';
import { DashboardLayout } from '../../components/dashboard-layout';
import { getLoginName } from '../../components/auth/getlogin';
import { exceptions } from '../../__mocks__/exceptions';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR,{ useSWRConfig } from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'
import {getHistExceptions} from '../../components/store/actions/exceptionsActions'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { SignInButton } from "../../components/Sign-in-Button";
import {
  Button,Avatar
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useIsAuthenticated } from "@azure/msal-react";
import { DatePicker,DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';

function HistExceptions({props,excep}){ 
  const { mutate } = useSWRConfig()
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const[result,setResult]=useState([]);
  const [InvoiceWeek, setInvoiceWeek] = useState('null');
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const Exc = getLoginName();
  let loginname=''
  if (isAuthenticated){
     loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
  }
 


  
    const payload = {
      // make payload here using values
      LoginName: loginname, // 'fhenderson'//loginname
      InvoiceWeek:InvoiceWeek
    }
    const address = `https://localhost:5050/api/exception/getHistoricalException`;
    const fetcher = async (url) => await axios.post(url,payload).then((res) => res.data);
    const { data, error } = useSWR(address, fetcher, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false
    });
    if (error) <p>Loading failed...</p>;
    if (!data) <h1>Loading...</h1>;




    function LoadData(){

    
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setAlertContent(' Loading...');
          setAlert(3);
  
             const res =  axios.post('https://localhost:5050/api/exception/getHistoricalException',{ LoginName: loginname,InvoiceWeek:InvoiceWeek } ).then(response => {
              
              if(response)
              {
                setAlertContent('Fetching Data Completed');
                setAlert(1);
              }
              
             }).catch(error=>{
              ;
             })
            //setstate({ Message: response.data }
            //setMsg(response.data.Msg)
         resolve();
       }, 5000);

       mutate(address);

     });
     
     }

  


  const ProtectedComponent = () => {
    if (!isAuthenticated) {
    return !isAuthenticated && <p>Please  <Link
    href={{
      pathname: '/login',
    }}  
  > sign in </Link>first to use the solution.</p>;
   
     }
    }

return(
  <div>
   
   
  {/* <spann>{ProtectedComponent()}</spann> */}
  <AuthenticatedTemplate>
    <Head>
      <title>
         Historical Exceptions | IVT
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
         <Box
              
              md={6}
              xs={6}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent:'space-around',
                p: 1
              }}
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
        onChange={(inv)=>{setInvoiceWeek(inv);  mutate(address);}}
        label="Invoice Week"
        // openTo="year"
        // views={["year", "month", "day"]}
        showTodayButton
        helperText={'Please Enter the Invoice Week'}
      />
</MuiPickersUtilsProvider>
          
          <Button
            color="primary"
            variant="contained"
            onClick={()=>{LoadData()}}
          >
            Fetch Data 
          </Button>
      
         {/* { (alert==1) ? <Alert severity='success'>  <span className="alert-text"><strong>Done: </strong> {alertContent} </span></Alert> : (alert==3)?<div>
           <Avatar
          alt="Rule"
          src='/static/images/rules/loading.svg'
          variant="square"
        />
          <Alert severity='info' color="primary">
          <span className="alert-text"><strong>Progressing : </strong> {alertContent} </span>
          </Alert>
      </div>: 
      <></> } */}

            </Box>
         
           
          
      
      <Container maxWidth={false}>
        {/* <ExceptionListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <ExceptionListResults exceptions={data}/>
          <Typography>Connotes which are not resolved yet...</Typography>
        </Box>
      
      </Container>
    </Box>
  </AuthenticatedTemplate>
  </div>
  )
};
HistExceptions.getLayout = (page) => (
  <div>
 
  {page}

 
  {/* <UnauthenticatedTemplate>
   <SignInButton/>
 </UnauthenticatedTemplate>  */}
 </div>
);





// export async function getStaticProps() {

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   try {

//     const result = await axios.get('https://localhost:5050/api/exception/getCurrentException');
//     const data = result.data;
//     return {
//         props: {
//           excep: data
//         }
//     }
// } catch (error) {
//     console.log(error);
// }
  

  

// }

export default HistExceptions
