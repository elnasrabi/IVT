import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { useState } from 'react';

export const TotalCustomers = ({ param }) => {
  const [isUp, setIsUp] = useState(true);
  const [amt, setAmt] = useState(15);

  return(
  <Card >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL CUSTOMERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            1,6k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
       
   
       {isUp? 
       <><ArrowUpwardIcon color="success" /><Typography
            variant="body2"
            sx={{
              mr: 1
            }}
          >
            {amt+"%"}
          </Typography></>
       : 
     <><ArrowDownwardIcon color="error" /><Typography
            variant="body2"
            sx={{
              mr: 1
            }}
          >
            {amt+"%"}
          </Typography></> }
      

       
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>)
};
