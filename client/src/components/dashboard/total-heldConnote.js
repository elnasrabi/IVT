import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardRounded from '@mui/icons-material/ArrowUpwardRounded';
import MoneyIcon from '@mui/icons-material/Money';
import HeldConnoteIcon from '@mui/icons-material/Lock';

export const TotalHeldConnote = (props) => {


  const numberWithCommas = (x) => {
    if(x)
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


  const totalHeldConnotes=numberWithCommas(props.total)
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
            Held Connote#          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
           {totalHeldConnotes}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <HeldConnoteIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography> */}
        <Typography
          color="textSecondary"
          variant="caption"
        >
          In the last run.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
        }
