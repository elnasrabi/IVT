import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { FuelListResults } from '../../components/rules/fuel-list-results';


import { DashboardLayout } from '../../components/dashboard-layout';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';





function Fuels({props,FuelData}){ 
  
return(
  <>
    <Head>
      <title>
        Fuels | IVT
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
        {/* <FuelListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <FuelListResults Fuels={FuelData}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Fuels.getLayout = (page) => (
  
  <div>
  {page}
</div>



);




export async function getStaticProps() {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const result = await axios.get('http://afs-web01:4545/rules/getFuels');
    const data = result.data;
    return {
        props: {
          FuelData: data
        }
    }
} catch (error) {
    console.log(error);
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Fuels
