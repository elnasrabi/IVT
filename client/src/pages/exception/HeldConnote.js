import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { HoldConnote } from '../../components/exception/com-hold-connote';

import { DashboardNavbar } from '../../components/dashboard-navbar';
import { Header } from '../../components/common/Header';
import { ExceptionListToolbar } from '../../components/exception/exception-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { withRouter,useRouter } from 'next/router';
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



function HeldConnote(){ 

  let connote='';
  try {
    const router = useRouter();
     connote = router.query || {}
     
  }
  catch{
  connote='' 
  }
    

  
  
  // let connote = '123';
  // try {
  //   connote=JSON.parse(query.connote)
  // }
  // catch{
  //   connote=''
  // }
 
    
return(
  <>
    <Head>
      <title>
        Hold Connote | IVT
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
          <HoldConnote connote={connote}/>
        </Box>
      </Container>
    </Box>
  </> )
};
HeldConnote.getLayout = (page) => (
 
  <authenticatedTemplate>
  {page}
</authenticatedTemplate>
 
);

export default withRouter(HeldConnote);
