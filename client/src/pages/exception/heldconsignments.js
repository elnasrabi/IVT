import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { HeldConnoteListResults } from '../../components/exception/heldconnote-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'
import {
  AuthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { useIsAuthenticated } from "@azure/msal-react";

function HeldConnote({props,HeldConnoteData}){ 
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const[result,setResult]=useState([]);


  const ProtectedComponent = () => {
    if (!isAuthenticated) {
    return !isAuthenticated && <p>Please  <Link
    href={{
      pathname: '/login',
    }}  
  > sign in </Link>first to use the solution.</p>;
   
     }
    }
  
    let loginname=''
    if (isAuthenticated){
       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    }
    const payload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
    const address = `https://127.0.0.1:5050/api/exception/getHeldConnote`;
    const fetcher = async (url) => await axios.post(url,payload).then((res) => res.data);
    const { data, error } = useSWR(address, fetcher);
    if (error) <p>Loading failed...</p>;
    if (!data) <h1>Loading...</h1>;


  // useEffect(()=>{
  //   let loginname=''
  //   if (isAuthenticated){
  //      loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
  //   }
  //   const payload = {
  //     // make payload here using values
  //     LoginName:  loginname //'mnasir'//loginname
  //   }
  //    axios.post('https://127.0.0.1:5050/api/exception/getHeldConnote', payload)
  //   .then(response => setResult(response.data))
  //   .catch(error => console.log(error))

  // },[])
  
return(
  <div> 
    <spann>{ProtectedComponent()}</spann>
    <AuthenticatedTemplate>
    <Head>
      <title>
        Held Connotes | IVT
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
        {/* <RouteListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <HeldConnoteListResults HeldConnotes={data}/>
        </Box>
      
      </Container>
    </Box>
    </AuthenticatedTemplate>
    </div> )
};
HeldConnote.getLayout = (page) => (
  <authenticatedTemplate>
  {page}
</authenticatedTemplate>
);




// export async function getStaticProps() {

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   try {
//     const result = await axios.get('https://127.0.0.1:5050/api/rules/getHeldConnotes');
//     const data = result.data;
//     return {
//         props: {
//           HeldConnoteData: data
//         }
//     }
// } catch (error) {
//     console.log(error);
// }
  

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time

// }

export default HeldConnote
