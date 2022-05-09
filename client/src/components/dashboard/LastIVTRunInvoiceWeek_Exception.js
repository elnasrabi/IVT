import { Bar,Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRouter } from 'next/router';

export const LastIVTRunInvoiceWeekException = (props) => {
  const theme = useTheme();
  const router = useRouter();

  const LastIVTInvoiceWeek=props.data

  

  var cnt=[]
  var custcnt=[]
  var carriercnt=[]
  var Weeks=[]
  // const vTotCount ={
  //   'cType':'Error',
  //   'Percenarge':0,
  //   'TotCount':0,
  //   'CommonDesc':'NA'
  // }
  // const vCustomer ={
  //   'cType':'Customer',
  //   'Percenarge':0,
  //   'TotCount':0,
  //   'CommonDesc':'NA'
  // }
  // const vCarrier ={
  //   'cType':'Carrier',
  //   'Percenarge':0,
  //   'TotCount':0,
  //   'CommonDesc':'NA'
  // }
  if(LastIVTInvoiceWeek)
  {
    //  vError = CommonMeasure.filter( (mes) => mes.cType.includes("Error"))
    //  vCustomer = CommonMeasure.filter( (mes) => mes.cType.includes("Customer"))
    //  vCarrier = CommonMeasure.filter( (mes) => mes.cType.includes("Carrier"))
    
     cnt = LastIVTInvoiceWeek.map(function(item) {
      return item.TotCount;
      
  });

  custcnt = LastIVTInvoiceWeek.map(function(item) {
    return item.CustomerCount;
    
});

carriercnt = LastIVTInvoiceWeek.map(function(item) {
  return item.CarrierCount;
  
});
console.log('LastIVTInvoiceWeeeeeeeeeeeeeeeeeeeeek',custcnt)
  Weeks = LastIVTInvoiceWeek.map(function(item) {
    return new Date(item.CurrentWeek).toLocaleDateString("en-UK");
    
});

  }


  const data = {
    datasets: [
      {
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",  
      data: cnt,
      label: 'Total Exceptions',
      maxBarThickness: 10
      }
    ],
    labels: Weeks
  };

  const options = {
   
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
   
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            Last 7 Runs
          </Button>
        )}
        title="Exceptions Total"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          onClick={()=>router.push('/exception/histexception')}
        >
          More Details
        </Button>
      </Box>
    </Card>
  );
};
