import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

import { msalConfig } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { MsalProvider } from "@azure/msal-react";
const msalInstance = new PublicClientApplication(msalConfig);
import { useRouter } from 'next/router';

async function handleLogin(instance) {
   await msalInstance.loginPopup();
 
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const router = useRouter();
    return (
        <div>
             <Container maxWidth="sm">
            <form >
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
                Please Sign in using your Microsoft account to start using IVT Solution.
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
        </div>
    );
}