import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { rulesMeta } from '../components/rules/rulesMetaData';

import { RuleCard } from '../components/rules/rule-card'
import { DashboardLayout } from '../components/dashboard-layout';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  
} from '@azure/msal-react';
import { SignInButton } from "../components/Sign-in-Button";
import { useIsAuthenticated } from "@azure/msal-react";
import Link from 'next/link'


function RulesPage({props,rules}){ 

  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();



  const ProtectedComponent = () => {
    if (!isAuthenticated) {
    return !isAuthenticated && <p>Please  <Link
    href={{
      pathname: '/login',
    }}  
  > sign in </Link>first to use the solution.</p>;
   
     }
    }
    return(
      <div> 
      <spann>{ProtectedComponent()}</spann>
  <AuthenticatedTemplate>
    <Head>
      <title>
        Rules Admin Portal | IVT
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        {/* <ProductListToolbar /> */}
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {rulesMeta.map((rule) => (
              <Grid
                item
                key={rule.id}
                lg={4}
                md={6}
                xs={12}
              >
                <RuleCard Rule={rule} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={0}
            size="small"
          />
        </Box>
      </Container>
    </Box>
    </AuthenticatedTemplate>
    </div> )
};
RulesPage.getLayout = (page) => (
  <div>
 
     {page}
   
  
  
  </div>


);

export default RulesPage;
