import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { rulesMeta } from '../components/rules/rulesMetaData';

import { RuleCard } from '../components/rules/rule-card'
import { DashboardLayout } from '../components/dashboard-layout';

const RulesPage = () => (
  <>
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
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

RulesPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RulesPage;
