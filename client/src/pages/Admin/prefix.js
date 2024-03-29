import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { PrefixeListResults } from '../../components/rules/prefix-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'




function Prefixes(){ 

    let prefixData=[];
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const address = `https://afs-web01:5051/api/rules/getPrefixes`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) prefixData=data;

  useEffect(()=>{

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

 // Call an external API endpoint to get posts.
 // You can use any data fetching library
 try {
   const https = require('https');
   const agent = new https.Agent({  
     rejectUnauthorized: false
   });
   const result =  axios.get('https://afs-web01:5051/api/rules/getPrefixes',{ httpsAgent: agent });
   const data = result.data;
   prefixData=data
} catch (error) {
   console.log(error);
}
 
},[])



return(
  <>
    <Head>
      <title>
        Prefixes | IVT
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
        {/* <prefixListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <PrefixeListResults Prefixes={prefixData}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Prefixes.getLayout = (page) => (
  

  <div>
  {page}
</div>


);




// export async function getStaticProps() {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   try {
//     const https = require('https');
//     const agent = new https.Agent({  
//       rejectUnauthorized: false
//     });

//     const result = await axios.get('https://afs-web01:5051/api/rules/getPrefixes',{ httpsAgent: agent });
//     const data = result.data;
//     return {
//         props: {
//           prefixData: data
//         }
//     }
// } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         prefixData: []
//       }
//     }
// }
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

//}

export default Prefixes
