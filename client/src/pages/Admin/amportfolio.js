import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { AMPortfolioListResults } from '../../components/rules/AMPortfolio-list-results';
import axios from 'axios';


function AMPortfolio({props,AMPortfolioData}){ 
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

return(
  <>
    <Head>
      <title>
        AM Portfolio | IVT
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1
      }}
    >
      <Container maxWidth={false}>
        {/* <RouteListToolbar /> */}
        <Box sx={{ mt: 1 }}>
          <AMPortfolioListResults AMPortfolios={AMPortfolioData}/>
        </Box>
      
      </Container>
    </Box>
  </> )
};
AMPortfolio.getLayout = (page) => (
  
  
  <div>
  {page}
</div>



 
);




export async function getStaticProps() {

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });

    const result = await axios.get('https://afs-web01:5051/api/rules/getAMPortfolios',{ httpsAgent: agent });
    const data = result.data;
    if(data)
    { return {
      props: {
        AMPortfolioData: data||[]
      }
  }}
  else
  {
    return {
      props: {
        AMPortfolioData: []
      }
  }

  }
   
} catch (error) {
    console.log(error);
    return {
      props: {
        AMPortfolioData: []
      }
    }
}
  

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

}

export default AMPortfolio
