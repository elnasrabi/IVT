import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { HoldBulkConnote } from '../../components/exception/com-hold-bulk-connote';

import { withRouter } from 'next/router';


function HeldBulkConnote(){ 

  //const connote = JSON.parse(query.connote);
 //console.log('connote param',connote)
    
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
          <HoldBulkConnote connotesToHold={'1234'}/>
        </Box>
      </Container>
    </Box>
  </> )
};
HeldBulkConnote.getLayout = (page) => (
 <div>
  {page}
  </div>
);

export default withRouter(HeldBulkConnote);
