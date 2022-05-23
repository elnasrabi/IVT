import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { ViewConnoteCom } from '../../components/exception/com-View-connote';

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



function ViewConnote(){ 
  
  
  let connote='1234';
try {
  const router = useRouter();
   connote = router.query || {}
   
}
catch{
connote='1234' 
}
  

  //const connote = JSON.parse(query.connote);
 
    
return(
  <>
    <Head>
      <title>
        View Connote | IVT
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
          <ViewConnoteCom connote={connote}/>
        </Box>
      </Container>
    </Box>
  </> )
};
ViewConnote.getLayout = (page) => (
 
<div>
{page}
</div>


 
);

export default withRouter(ViewConnote);
