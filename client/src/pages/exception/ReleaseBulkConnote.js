import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { ReleaseBulkConnoteCom } from '../../components/exception/com-release-bulk-connote';

import { withRouter,useRouter } from 'next/router';


function ReleaseBulkConnote(){ 

  let connote={connote:{}};
  try {
    const router = useRouter();
     connote = router.query || {}
     
  }
  catch (e){
  connote=e
  }
    

    
return(
  <>
    <Head>
      <title>
        Release Bulk Connotes | IVT
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
          <ReleaseBulkConnoteCom connotesToRelease={connote}/>
        </Box>
      </Container>
    </Box>
  </> )
};
ReleaseBulkConnote.getLayout = (page) => (
 <div>
  {page}
  </div>
);

export default withRouter(ReleaseBulkConnote);
