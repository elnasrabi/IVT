import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { UserListResults } from '../../components/rules/user-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'




function Users({props,UserData}){ 
  
return(
  <>
    <Head>
      <title>
        User | IVT
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
          <UserListResults Users={UserData}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Users.getLayout = (page) => (
 
  <div>
  {page}
</div>

);




export async function getStaticProps() {

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });

    const result = await axios.get('https://afs-web01:5051/api/rules/getUsers',{ httpsAgent: agent });
    const data = result.data;
    return {
        props: {
          UserData: data
        }
    }
} catch (error) {
    console.log(error);
    return {
      props: {
        UserData: []
      }
    }
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Users
