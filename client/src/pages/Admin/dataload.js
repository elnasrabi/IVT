import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';

import { DataLoadDetails } from '../../components/rules/DataLoadDetails';
import { DashboardLayout } from '../../components/dashboard-layout';

const DataLoad = () => (
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
          New Data load
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
            <DataLoadDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

DataLoad.getLayout = (page) => (
  

  <div>
  {page}
</div>



);

export default DataLoad;
