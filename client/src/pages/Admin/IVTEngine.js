import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';

import { IVTEngineDetails } from '../../components/rules/IVTEngine-details';
import { DashboardLayout } from '../../components/dashboard-layout';

const IVTEngine = () => (
  <>
    <Head>
      <title>
        The Engine | IVT Solution
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          IVT Engine
        </Typography>
        <Grid
          container
          spacing={3}
        >
      
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <IVTEngineDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

IVTEngine.getLayout = (page) => (
  
  <div>
  {page}
</div>


);

export default IVTEngine;
