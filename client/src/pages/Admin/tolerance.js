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

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const result = await axios.get('http://afs-web01:4545/rules/getTolerances');
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
