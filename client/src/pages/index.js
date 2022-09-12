import Head from 'next/head';
import {useState,useEffect} from 'react'
import { Box, Container, Grid } from '@mui/material';
import { TotalException } from '../components/dashboard/total-exception';
import { TopExceptions } from '../components/dashboard/top-exceptions';
import { CustomerFocused } from '../components/dashboard/focused-customer';
import { LastIVTRunInvoiceWeek } from '../components/dashboard/LastIVTRunInvoiceWeek';
import { LastIVTRunInvoiceWeekException } from '../components/dashboard/LastIVTRunInvoiceWeek_Exception';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalGross } from '../components/dashboard/total-gross';
import { TotalHeldConnote } from '../components/dashboard/total-heldConnote';
import { TotalCarrier } from '../components/dashboard/total-carrier';
 import { CommonMeasures } from '../components/dashboard/Common-measures';
import {
  AuthenticatedTemplate,
  
  useMsal,
} from '@azure/msal-react';

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
const msalInstance = new PublicClientApplication(msalConfig);
import { PageLayout } from "../components/PageLayout";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/Sign-in-Button";
import { Redirect } from 'react-router-dom'
import { useRouter } from 'next/router';
import Link from 'next/link'
import axios from 'axios';
import {useSWR} from 'swr'
import useSWRImmutable from 'swr/immutable'
const Dashboard = () => {
  const router = useRouter();
 
  const { accounts } = useMsal();
  const [isAdmin, setIsAdmin] = useState(false)
  const [LoggedUser, setLoggedUser] = useState({UserType:0,AccountManager:'',IsActive:1});
  const [top10excpetion, setTop10excpetion] = useState([])
  const [LastIVTRunInvoiceWeekData, setLastIVTRunInvoiceWeekData] = useState([])
  const [CommonMeasure, setCommonMeasure] = useState()
  const [DashboardTotal, setDashboardTotal] = useState([])
  const [vTotalExceptions, setTotalException] = useState('0')
  const [vTotalCustomer, setTotalCustomer] = useState('0')
  const [vTotalCarrier, SetTotalCarrier] = useState('0')
  const [vTotalGross, SetTotalGross] = useState('0')
  const [vHeldCount, setHeldCount] = useState('0')
  const [FocusedCustomer, setFocusedCustomer] = useState([])

  let loginname=''
  const isAuthenticated = useIsAuthenticated();
  
  // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
  //console.log('isssssssssAuthenticated',accounts[0])
  if (isAuthenticated){
     loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    // console.log('loginname',loginname)
  }

  const https = require('https');
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });
  const payload = {
    // make payload here using values
    LoginName: loginname // 'mnasir'//loginname
  }

  const address = `https://127.0.0.1:5050/api/dashboard/getTotalMeasure`;
  const fetcher = async (url) => await axios.post(url,payload).then((res) => res.data);
  // const { data, error } = useSWR(address, fetcher,{
  //   revalidateOnFocus: false,
  //   revalidateIfStale: true,
  //   revalidateOnMount:false,
  //   revalidateOnReconnect: false,
  //   refreshWhenOffline: false,
  //   refreshWhenHidden: false,
  //   refreshInterval: 0
  // });
  const { data, error }= useSWRImmutable(address, fetcher)
  let  RuleOptionData=data;
  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) localStorage.setItem('TotalMeasure', JSON.stringify(data[0]));
 
  const setSession = (accessToken) => {
    if (typeof window !== 'undefined')
      localStorage.setItem('accessToken', accessToken);
  };
  
  const getAccessToken = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('accessToken');
  };



 


  useEffect(()=>{
    //console.log('ADDDDDDDDMIN LOOOGIN ',AdminLogin)
    let loginname=''
    const accessToken = getAccessToken();
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    if(!accessToken)
    {
    axios.post('https://127.0.0.1:5050/api/admin/getlogin', payload)
    .then(response =>{
       setLoggedUser({UserType:response.data[0].UserType,AccountManager:response.data[0].AccountManager,IsActive:response.data[0].IsActive})
       setSession({UserType:response.data[0].UserType,AccountManager:response.data[0].AccountManager,IsActive:response.data[0].IsActive})
       localStorage.setItem('UserType', response.data[0].UserType);
       localStorage.setItem('AccountManager', response.data[0].AccountManager);
       localStorage.setItem('IsActive', response.data[0].IsActive);
       localStorage.setItem('LoginName', response.data[0].LoginName);
     

          })
    // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
    .catch(error => {console.log(error)
    
    }) 
    
    
    //console.log('LoggedUser.UserType',LoggedUser)
    }

   
    // axios.post('https://127.0.0.1:5050/api/admin/getlogin', payload)
    // .then(response =>{
    //    console.log('response.data[0]',response.data[0])
     
    //    if(!response.data[0])
    //    {
    //      localStorage.setItem('accessToken','');
    //      router.push('/403');
       
    //    }
    //       })
    // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
    // .catch(error => console.log(error)) 
    
    
    console.log('LoggedUser.UserType',LoggedUser)
  

   getTotalMeasureData()

   getCommonMeasureData();

   getTop10Data();

   getLastIVTRUNInvoiceWeekData()
    
   getFocusedCustomerData()
   
   if(!accessToken)
   {
    router.push('/403');
   }
  
  
  
  },[])

  function getTotalMeasureData(){
    let loginname=localStorage.getItem('LoginName')
  
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated && !loginname){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    let totalmeasure=localStorage.getItem('TotalMeasure')

   

    if (typeof window !== 'undefined' && !totalmeasure) 
    {
      
      axios.post('https://127.0.0.1:5050/api/dashboard/getTotalMeasure', payload)
      .then(response =>{
  
        if(response.data)
        {
        
          localStorage.setItem('TotalMeasure', JSON.stringify(response.data[0]));
       
         
        }
       
            })
     
      .catch(error => console.log(error)) 
    }
     
    if (typeof window !== 'undefined' && localStorage.getItem('TotalMeasure') ) 
    {
    setDashboardTotal(JSON.parse(localStorage.getItem('TotalMeasure')));
    SetTotalCarrier(JSON.parse(localStorage.getItem('TotalMeasure')).TotalCarrier)
    setTotalCustomer(JSON.parse(localStorage.getItem('TotalMeasure')).TotalCustomer)
    setTotalException(JSON.parse(localStorage.getItem('TotalMeasure')).TotalExceptions)
    SetTotalGross(JSON.parse(localStorage.getItem('TotalMeasure')).TotalGross)
    setHeldCount(JSON.parse(localStorage.getItem('TotalMeasure')).HeldCount)
    }
  }

   function getTop10Data(){
    let loginname=localStorage.getItem('LoginName')
  
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated && !loginname){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    let Top10=localStorage.getItem('Top10excpetion')
    if (typeof window !== 'undefined' && !Top10) 
    {
      axios.post('https://127.0.0.1:5050/api/dashboard/getTop10Exception', payload)
      .then(response =>{
  
        if(response.data)
        {
          setTop10excpetion(response.data)
          localStorage.setItem('Top10excpetion', JSON.stringify(response.data));
         // console.log('Top10excpetion Local Storage',JSON.parse(localStorage.getItem('Top10excpetionn')) )
         
        }
        // console.log('Dashboard response',response.data[0])
            })
      // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
      .catch(error => console.log(error)) 
    }
     
    if (typeof window !== 'undefined' && localStorage.getItem('Top10excpetion') ) 
    {
    setTop10excpetion(JSON.parse(localStorage.getItem('Top10excpetion')));
    }
  }



   function getFocusedCustomerData(){
    let loginname=localStorage.getItem('LoginName')
  
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated && !loginname){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    let FocusedCustomer=localStorage.getItem('FocusedCustomer')
    if (typeof window !== 'undefined' && !FocusedCustomer) 
    {
      axios.post('https://127.0.0.1:5050/api/dashboard/getFocusedCustomer', payload)
      .then(response =>{
  
        if(response.data)
        {
          setFocusedCustomer(response.data)
          localStorage.setItem('FocusedCustomer', JSON.stringify(response.data));
         // console.log('FocusedCustomerexcpetion Local Storage',JSON.parse(localStorage.getItem('FocusedCustomerexcpetionn')) )
         
        }
        // console.log('Dashboard response',response.data[0])
            })
      // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
      .catch(error => console.log(error)) 
    }
     
    if (typeof window !== 'undefined' && localStorage.getItem('FocusedCustomer') ) 
    {
    setFocusedCustomer(JSON.parse(localStorage.getItem('FocusedCustomer')));
    }
  }

   function getCommonMeasureData(){
     let loginname=localStorage.getItem('LoginName')
  
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated && !loginname){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    let Common=localStorage.getItem('CommonMeasure')
    if (typeof window !== 'undefined' && !Common) 
    {
      axios.post('https://127.0.0.1:5050/api/dashboard/getCommonMeasure', payload)
      .then(response =>{
  
        if(response.data)
        {
          setCommonMeasure(response.data)
          localStorage.setItem('CommonMeasure', JSON.stringify(response.data));
         // console.log('CommonMeasure Local Storage',JSON.parse(localStorage.getItem('CommonMeasuren')) )
         
        }
        // console.log('Dashboard response',response.data[0])
            })
      // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
      .catch(error => console.log(error)) 
    }

    if (typeof window !== 'undefined' && localStorage.getItem('CommonMeasure')) 
    {
    setCommonMeasure(JSON.parse(localStorage.getItem('CommonMeasure')));
    }

   }
  

   function getLastIVTRUNInvoiceWeekData(){
    let loginname=localStorage.getItem('LoginName')
  
    // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
    //console.log('isssssssssAuthenticated',accounts[0])
    if (isAuthenticated && !loginname){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
      // console.log('loginname',loginname)
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    let Top10=localStorage.getItem('LastIVTInvoiceWeek')
    if (typeof window !== 'undefined' && !Top10) 
    {
      axios.post('https://127.0.0.1:5050/api/dashboard/getLastLIVTRunCountInvoiceWeek', payload)
      .then(response =>{
  
        if(response.data)
        {
          setLastIVTRunInvoiceWeekData(response.data)
          localStorage.setItem('LastIVTInvoiceWeek', JSON.stringify(response.data));
         // console.log('Top10excpetion Local Storage',JSON.parse(localStorage.getItem('Top10excpetionn')) )
         
        }
        // console.log('Dashboard response',response.data[0])
            })
      // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
      .catch(error => console.log(error)) 
    }
     
    if (typeof window !== 'undefined' && localStorage.getItem('LastIVTInvoiceWeek') ) 
    {
      setLastIVTRunInvoiceWeekData(JSON.parse(localStorage.getItem('LastIVTInvoiceWeek')));
    }
  }


  function WelcomeUser() {
    try{
     
      if (isAuthenticated) {
      const username = accounts[0].name;
      return <p>Welcome, {username}</p>;
      }
     else{
      return <p>No login details available!</p>;
     }
     
    }
    catch(e){
      // console.log('No Exc guys',e)
     
     
    }
  }

  const ProtectedComponent = () => {
    if (!isAuthenticated) {
    return  !isAuthenticated && <p>Please  <Link
    href={{
      pathname: '/login',
    }}  
  > sign in </Link>first to use the solution.</p>;
   
     }
    }



 
  return(
  <div>
     <spann>{ProtectedComponent()}</spann>
   <AuthenticatedTemplate> 
    <Head>
      <title>
        Dashboard | IVT Tool
      </title>
     
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <spann>{WelcomeUser()}</spann>
     
      <br/>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
        >
           <Grid
          container
          spacing={1}
        >
       <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={20}
          >
            <TotalException total={vTotalExceptions} />
          </Grid>
          <Grid
            item
            xl={2}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers total={vTotalCustomer}/>
          </Grid>
          <Grid
            item
            xl={2}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalHeldConnote total={vHeldCount} sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            xl={2}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCarrier total={vTotalCarrier} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalGross total={vTotalGross} sx={{ height: '100%' }} />
          </Grid>
         

        </Grid>
   
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <LastIVTRunInvoiceWeek data={LastIVTRunInvoiceWeekData} />
          </Grid>
         
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <CommonMeasures data={CommonMeasure} sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={12}
            md={6}
            xl={12}
            xs={12}
          >
            <TopExceptions data={top10excpetion} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={5}
            xs={12}
          >
             <CustomerFocused data={FocusedCustomer} sx={{ height: '100%' }} /> 
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={7}
            xs={12}
          >
            <LastIVTRunInvoiceWeekException data={LastIVTRunInvoiceWeekData} />
          </Grid>
         
          
        </Grid>
      </Container>
    </Box>
    </AuthenticatedTemplate> 
   
    </div>
);
    }
Dashboard.getLayout = (page) => (
  
  <div>
 

    {page}
 

 
 
  {/* <UnauthenticatedTemplate>
  <DashboardLayout  >
    <SignInButton/>
  </DashboardLayout>
 </UnauthenticatedTemplate>  */}
 </div>
);

export default Dashboard;

// export const getServerSideProps =async function ({ req, res }) {
//   const { user } = req.session

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: { user },
//   }
// };