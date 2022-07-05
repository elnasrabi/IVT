import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RuleOptionListResults } from '../../components/rules/ruleoption-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';

import useSWR from 'swr'




function RuleOptions(){ 
 
   
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });

  const address = `https://localhost:5050/api/rules/getRuleOptions`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
  let  RuleOptionData=data;
  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) RuleOptionData=data;

//   useEffect(()=>{

//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//  // Call an external API endpoint to get posts.
//  // You can use any data fetching library
//  try {
//    const https = require('https');
//    const agent = new https.Agent({  
//      rejectUnauthorized: false
//    });
//    const result =  axios.get('https://localhost:5050/api/rules/getRuleOptions',{ httpsAgent: agent });
//    const data = result.data;
//    RuleOptionData=data
// } catch (error) {
//    console.log(error);
// }
 
// },[])



return(
  <>
    <Head>
      <title>
        RuleOptions | IVT
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
        {/* <RuleOptionListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <RuleOptionListResults RuleOptions={data}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
RuleOptions.getLayout = (page) => (
  
  <div>
  {page}
</div>



);




// export async function getStaticProps() {

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   try {
//     const https = require('https');
//     const agent = new https.Agent({  
//       rejectUnauthorized: false
//     });

//     const result = await axios.get('https://localhost:5050/api/rules/getRuleOptions',{ httpsAgent: agent });
//     const data = result.data;
//     return {
//         props: {
//           RuleOptionData: data
//         }
//     }
// } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         RuleOptionData: []
//       }
//     }
// }
  

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time

// }

export default RuleOptions
