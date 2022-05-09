import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { useMsal } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import {useState,useEffect} from 'react'

const msalInstance = new PublicClientApplication(msalConfig);

function resetDashboard(){
  localStorage.setItem('CommonMeasure', '');
  localStorage.setItem('Top10excpetion', '');
  localStorage.setItem('TotalMeasure', '');
  localStorage.setItem('LastIVTInvoiceWeek', '');
  localStorage.setItem('FocusedCustomer', '');
  
  
 // localStorage.clear();
}


async function handleLogout() {
  await msalInstance.logoutRedirect();
}
const ProtectedComponent = () => {
  if (!isAuthenticated) {
  return <p>Please  <Link
  href={{
    pathname: '/login',
  }}  
> sign in </Link>first to use the solution.</p>;
 
   }
  }
const Logout = () => {
  const isAuthenticated = useIsAuthenticated();
  useEffect(()=>{
    if (!isAuthenticated){
      router.push('/login');
   
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
      router.push('/');
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
               Authentication Service
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign out from IVT Solution.
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
                onClick={()=>{handleLogout()
                  localStorage.setItem('accessToken', '')
                  resetDashboard()
                  // localStorage.setItem('UserType', '');
                  // localStorage.setItem('AccountManager', '');
                  // localStorage.setItem('IsActive', '');
                  router.push('/login')
                }
                }
              >
                Sign out
              </Button>
            
            </Box>
         
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Logout;
