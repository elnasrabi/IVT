import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import {useState,useEffect} from 'react'
import ErrorIcon from '@mui/icons-material/Error';

import CarrierICON from '@mui/icons-material/LocalShipping';
import CustomerICON from '@mui/icons-material/PeopleOutlined';
import axios from 'axios';
export const CommonMeasures = (props) => {

  const theme = useTheme();
 
  const CommonMeasure=props.data
  const vError ={
    'cType':'Error',
    'Percenarge':0,
    'TotCount':0,
    'CommonDesc':'NA'
  }
  const vCustomer ={
    'cType':'Customer',
    'Percenarge':0,
    'TotCount':0,
    'CommonDesc':'NA'
  }
  const vCarrier ={
    'cType':'Carrier',
    'Percenarge':0,
    'TotCount':0,
    'CommonDesc':'NA'
  }
  if(CommonMeasure)
  {
     vError = CommonMeasure.filter( (mes) => mes.cType.includes("Error"))
     vCustomer = CommonMeasure.filter( (mes) => mes.cType.includes("Customer"))
     vCarrier = CommonMeasure.filter( (mes) => mes.cType.includes("Carrier"))
    
    var vpercentage = CommonMeasure.map(function(item) {
      return item.Percenarge;
  });
  }

  const common=[];
  // console.log('CommonMeasure.Percenarge',result)
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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


  const data = {
    datasets: [
      {
        data: vpercentage,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Error', 'Customer', 'Carrier']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  try {
    common = [
      {
        title: vError[0].cType,
        value: vError[0].Percenarge,
        count:nFormatter(vError[0].TotCount,1),
        Desc:vError[0].CommonDesc,
        icon: ErrorIcon,
        color: '#3F51B5'
      },
      {
        title: vCustomer[0].cType,
        value: vCustomer[0].Percenarge,
        count:nFormatter(vCustomer[0].TotCount,1),
        Desc:vCustomer[0].CommonDesc,
        icon: CustomerICON,
        color: '#E53935'
      },
      {
        title: vCarrier[0].cType,
        value: vCarrier[0].Percenarge,
        count:nFormatter(vCarrier[0].TotCount,1),
        Desc:vCarrier[0].CommonDesc,
        icon: CarrierICON,
        color: '#FB8C00'
      }
    ];
  }
  catch(e){
     common = [
      {
        title: 'NA',
        value: 0,
        count:0,
        Desc:'NA',
        icon: ErrorIcon,
        color: '#3F51B5'
      },
      {
        title: 'NA',
        value: 0,
        count:0,
        Desc:'NA',
        icon: CustomerICON,
        color: '#E53935'
      },
      {
        title: 'NA',
        value: 0,
        count:0,
        Desc:'NA',
        icon: CarrierICON,
        color: '#FB8C00'
      }
    ];

  }
 

  return (
    <Card {...props}>
      <CardHeader title="Common Measures" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {common && common.map(({
            color,
            icon: Icon,
            title,
            value,
            count,
            Desc
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                
              >
                {Desc}
               
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {count}
               
              </Typography>
              
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
