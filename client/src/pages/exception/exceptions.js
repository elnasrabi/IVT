import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ExceptionListResults } from '../../components/exception/exception-list-results';
import { Users} from '../../components/exception/test-redux';
import { ExceptionListToolbar } from '../../components/exception/exception-list-toolbar';
import { TableTest } from '../../components/exception/tabletest';
import { DashboardLayout } from '../../components/dashboard-layout';
import { exceptions } from '../../__mocks__/exceptions';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'
import {getExceptions} from '../../components/store/actions/exceptionsActions'



function Exceptions({props,excep}){ 
  
return(
  <>
    <Head>
      <title>
        Exceptions | IVT
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
        {/* <ExceptionListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <ExceptionListResults exceptions={excep}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
Exceptions.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);




export async function getStaticProps() {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const result = await axios.get('http://127.0.0.1:4545/exception/getCurrentException');
    const data = result.data;
    return {
        props: {
          excep: data
        }
    }
} catch (error) {
    console.log(error);
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default Exceptions
