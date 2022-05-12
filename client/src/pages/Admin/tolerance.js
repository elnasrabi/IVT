import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ToleranceListResults } from '../../components/rules/tolerance-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'




function Tolerances({props,ToleranceData}){ 
  try {
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const address = `https://afs-web01:5051/api/rules/getTolerances`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) ToleranceData=data;


} catch (error) {
    console.log(error);
}

  
return(
  <>
    <Head>
      <title>
        Tolerance | IVT
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
          <ToleranceListResults Tolerances={ToleranceData}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Tolerances.getLayout = (page) => (
  

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

    const result = await axios.get('https://afs-web01:5051/api/rules/getTolerances',{ httpsAgent: agent });
    const data = result.data;
    return {
        props: {
          ToleranceData: data
        }
    }
} catch (error) {
    console.log(error);
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Tolerances
