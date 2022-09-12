import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { RouteListResults } from '../../components/rules/route-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import {useSWR} from 'swr'
import useSWRImmutable from 'swr/immutable'
import Link from 'next/link'
import {connect} from 'react-redux'




function Routes(){ 

  let RouteData=[];
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const address = `https://127.0.0.1:5050/api/rules/getRoutes`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
  // const { data, error } = useSWR(address, fetcher,{
  //   revalidateOnFocus: false,
  //   revalidateIfStale: false,
  //   revalidateOnMount:false,
  //   revalidateOnReconnect: false,
  //   refreshWhenOffline: false,
  //   refreshWhenHidden: false,
  //   refreshInterval: 0
  // });
  const { data, error }= useSWRImmutable(address, fetcher)

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) RouteData=data;

//   useEffect(()=>{

//      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   try {
//     const https = require('https');
//     const agent = new https.Agent({  
//       rejectUnauthorized: false
//     });
//     const result =  axios.get('https://127.0.0.1:5050/api/rules/getRoutes',{ httpsAgent: agent });
//     const data = result.data;
//     RouteData=data
// } catch (error) {
//     console.log(error);
// }
  
// },[])

return(
  <>
    <Head>
      <title>
        Routes | IVT
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
          <RouteListResults Routes={data}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Routes.getLayout = (page) => (


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
//     const result = await axios.get('https://127.0.0.1:5050/api/rules/getRoutes',{ httpsAgent: agent });
//     const data = result.data;
//     return {
//         props: {
//           RouteData: data
//         }
//     }
// } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         RouteData: []
//       }
//     }
// }
  

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time

// }

export default Routes
