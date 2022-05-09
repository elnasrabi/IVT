import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { HoldBulkConnote } from '../../components/exception/com-hold-bulk-connote';

import { DashboardNavbar } from '../../components/dashboard-navbar';
import { Header } from '../../components/common/Header';
import { ExceptionListToolbar } from '../../components/exception/exception-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { withRouter } from 'next/router';
import NextLink from 'next/link';
import {

  Button,
  Checkbox,
 
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function HeldBulkConnote({ router: { query } }){ 

  const connote = JSON.parse(query.connote);
 console.log('connote param',connote)
    
return(
  <>
    <Head>
      <title>
        Hold Bulk Connotes | IVT
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
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

      <Container maxWidth={false}>
       
   
        
        <Box sx={{ mt: 1 }}>
          <HoldBulkConnote connotesToHold={connote}/>
        </Box>
      </Container>
    </Box>
  </> )
};
HeldBulkConnote.getLayout = (page) => (
  <authenticatedTemplate>
  {page}
</authenticatedTemplate>
);

export default withRouter(HeldBulkConnote);
