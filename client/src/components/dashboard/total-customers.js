import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import TransportIcon from '@mui/icons-material/EmojiTransportation';
import { useState } from 'react';

export const TotalCustomers = (props) => {
  const [isUp, setIsUp] = useState(true);
  const [amt, setAmt] = useState(15);
  
  const numberWithCommas = (x) => {
    if (x)
    {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else{

      return 0
    }
   
  }

  function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  const totalcustomer=numberWithCommas(props.total)

  return(
    
    <Card
    sx={{ height: '100%' }}
    {...props}
  >
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
           {totalcustomer}
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
       
   
       {/* {isUp? 
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
       */}

       
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Unique customers. 
        </Typography>
      </Box>
    </CardContent>
  </Card>)
};
