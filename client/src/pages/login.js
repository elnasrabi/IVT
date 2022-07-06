import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {useState,useEffect} from 'react'
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';

import { msalConfig } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import {
  AuthenticatedTemplate,
  
  useMsal,
} from '@azure/msal-react';
import axios from 'axios';
const msalInstance = new PublicClientApplication(msalConfig);



async function handleLogin() {

  await msalInstance.loginRedirect();



    router.push('/');
 
 
  

}

 const getAccessToken = () => {
  if (typeof window !== 'undefined') 
     return localStorage.getItem('UserType');
};

const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  //   const username = accounts[0].username;
  const { accounts } = useMsal();


  const getLoginAccessToken = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('accessToken');
  };
  let loginname=''
    if (isAuthenticated){
      loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
     // console.log('loginname',loginname)
   }
    const Userpayload = {
      // make payload here using values
      LoginName: loginname // 'mnasir'//loginname
    }
   
   



  useEffect(()=>{
    

    
   
    const token=getLoginAccessToken();

    if (isAuthenticated && token){
      router.push('/');
    }
  },[])

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      if (isAuthenticated ){
        router.push('/');
      }
     
    }
  });

  return (
    <>
      <Head>
        <title>Login | IVT Solution</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in to IVT Solution using your Microsoft account.
              </Typography>
            </Box>
           
           
           
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                //disabled={formik.isSubmitting}
                fullWidth
                size="large"
                //type="submit"
                variant="contained"
                onClick={()=>{handleLogin()
                  router.push('/')
                }
                }
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
             Please contact the IVT Admin Center.
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
