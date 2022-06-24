import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { HoldBulkConnote } from '../../components/exception/com-hold-bulk-connote';

import { withRouter,useRouter } from 'next/router';


function HeldBulkConnote(){ 

  let connote={connote:{}};
  try {
    const router = useRouter();
     connote = router.query || {}
     
  }
  catch{
  connote='' 
  }
    

    
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
 <div>
  {page}
  </div>
);

export default withRouter(HeldBulkConnote);
