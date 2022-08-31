import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CubicListResults } from '../../components/rules/cubic-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {useSWR} from 'swr'
import useSWRImmutable from 'swr/immutable'
import Link from 'next/link'
import { FormatColorResetRounded } from '@material-ui/icons';





function Cubics(){ 
  

    ;
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    const revalidationOptions = {
      revalidateOnMount: false, //here we refer to the SWR cache
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    };
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const address = `https://localhost:5050/api/rules/getCubics`;
  const fetcher = async (url) => await axios.get(url,{ httpsAgent: agent }).then((res) => res.data);
 // const { data, error } = useSWR(address, fetcher,revalidationOptions);
 const { data, error }= useSWRImmutable(address, fetcher)
  let cubicData=data
  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  if (data) cubicData=data;

//   useEffect(()=>{

//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//  // Call an external API endpoint to get posts.
//  // You can use any data fetching library
//  try {
//    const https = require('https');
//    const agent = new https.Agent({  
//      rejectUnauthorized: false
//    });
//    const result =  axios.get('https://localhost:5050/api/rules/getCubics',{ httpsAgent: agent });
//    const data = result.data;
//    cubicData=data
// } catch (error) {
//    console.log(error);
// }
 
// },[])

  
return(
  <>
    <Head>
      <title>
        Cubics | IVT
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
          <CubicListResults Cubics={data}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Cubics.getLayout = (page) => (
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

//     const result = await axios.get('https://localhost:5050/api/rules/getCubics',{ httpsAgent: agent });
//     const data = result.data;
//     return {
//         props: {
//           cubicData: data
//         }
//     }
// } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         cubicData: []
//       }
//     }
// }
  

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time

// }

export default Cubics
