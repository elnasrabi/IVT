import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RuleListResults } from '../../components/rules/rule-list-result';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'

//Rule


function Rules(){ 
    let RuleData=[];
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const address = `https://localhost:5050/api/rules/getRules`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) RuleData=data;

//   useEffect(()=>{

//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//  // Call an external API endpoint to get posts.
//  // You can use any data fetching library
//  try {
//    const https = require('https');
//    const agent = new https.Agent({  
//      rejectUnauthorized: false
//    });
//    const result =  axios.get('https://localhost:5050/api/rules/getRules',{ httpsAgent: agent });
//    const data = result.data;
//    RuleData=data
// } catch (error) {
//    console.log(error);
// }
 
// },[])


return(
  <>
    <Head>
      <title>
        Rule | IVT
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
          <RuleListResults Rules={data}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Rules.getLayout = (page) => (
  

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

    const result = await axios.get('https://localhost:5050/api/rules/getRules',{ httpsAgent: agent });
    const data = result.data;
    return {
        props: {
          RuleData: data
        }
    }
} catch (error) {
    console.log(error);
    return {
      props: {
        RuleData: []
      }
    }
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Rules
