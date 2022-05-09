import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CubicListResults } from '../../components/rules/cubic-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'




function Cubics({props,cubicData}){ 
  
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
          <CubicListResults Cubics={cubicData}/>
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




export async function getStaticProps() {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const result = await axios.get('http://afs-web01:4545/rules/getCubics');
    const data = result.data;
    return {
        props: {
          cubicData: data
        }
    }
} catch (error) {
    console.log(error);
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Cubics
