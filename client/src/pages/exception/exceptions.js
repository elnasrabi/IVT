import Head from 'next/head';
import { Box, Container } from '@mui/material';
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
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'
import {getExceptions} from '../../components/store/actions/exceptionsActions'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { SignInButton } from "../../components/Sign-in-Button";
import { useIsAuthenticated } from "@azure/msal-react";

function Exceptions({props,excep}){ 
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const[result,setResult]=useState([]);

  
  const Exc = getLoginName();
  let loginname=''
  if (isAuthenticated){
     loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
  }
  const payload = {
    // make payload here using values
    LoginName: loginname // 'fhenderson'//loginname
  }
  const address = `https://afs-web01:5051/api/exception/getCurrentException`;
  const fetcher = async (url) => await axios.post(url,payload).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  // useEffect(()=>{
  //   console.log('Excccccccccccccccccccccc',Exc)
  //   let loginname=''
  //   if (isAuthenticated){
  //      loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
  //   }
  //   const payload = {
  //     // make payload here using values
  //     LoginName: loginname // 'fhenderson'//loginname
  //   }
  //    axios.post('https://afs-web01:5051/api/exception/getCurrentException', payload)
  //   .then(response => {
  //     setResult(response.data)
  //     localStorage.setItem('currentexceptions', response.data)
  //   })
  //   .catch(error => console.log(error))

  // },[])


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
        Current Exceptions | IVT
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
      <Container maxWidth={false}>
        {/* <ExceptionListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <ExceptionListResults exceptions={data}/>
        </Box>
      
      </Container>
    </Box>
  </AuthenticatedTemplate>
  </div>
  )
};
Exceptions.getLayout = (page) => (
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

//     const result = await axios.get('https://afs-web01:5051/api/exception/getCurrentException');
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

export default Exceptions
