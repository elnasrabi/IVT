import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import {

  useMsal,
} from '@azure/msal-react';

import { useRouter } from 'next/router'

export const ViewConnoteCom = ({connote}) => {
  try
  {
  
      connote=JSON.parse(connote.connote)
   
  }
  catch{
connote={}
  }
  
 

  const [values, setValues] = useState({
    Connote: connote.con_note,
    Reason: '',
    HeldBy:'Manga'
  });
  const { accounts } = useMsal();
  const [submit,setSubmitting]= useState(false);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');
  const router = useRouter()


  return (
    <Box
    component="main"
    sx={{
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      minHeight: '100%'
    }}
  >
    <Container>
     
        <Button onClick={() => router.back()}
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Exceptions
        </Button>
        
        <Divider />
       
        <Grid
          container
          spacing={1}
          style={{
 
            paddingTop: "40px"
          }}
        >
          <Grid
            xl={12}
            xs={20}
          >
            <Typography color="#334FFF">Exception:</Typography>
            <Typography color="textPrimary">{connote.ErrDesc}</Typography>
      
         <Typography color="#334FFF">Error Code::</Typography>
         <Typography color="textPrimary">{connote.ErrCode}</Typography>

          </Grid>


       
      
       <Grid
           
            item
            lg={3}
            sm={6}
            xl={3}
            xs={20}
          >
        
            <Typography color="334FFF">Connote:{connote.con_note}</Typography>
            <Typography color="334FFF">Connote Date:{connote.cons_date}</Typography>
            <Typography color="textPrimary">  Job Number:{connote.jno}</Typography>
            <Typography color="textPrimary">Supplier Reference:{connote.supplier_ref}</Typography>
            <Typography color="textPrimary">Customer Reference:{connote.cus_ref}</Typography>
            <Typography color="textPrimary">Account Manager:{connote.AccountManager}</Typography>
            <Typography color="textPrimary">DeliveryRef:{connote.del_ref}</Typography>
           
          

          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={20}
            style={{
 
              paddingLeft: "40px"
            }}
          >
           <Typography color="textPrimary">Customer:{connote.customer}</Typography>
           <Typography color="textPrimary">Finance Group:{connote.FinanceGroup}</Typography>
           <Typography color="textPrimary">Carrier:{connote.carrier}</Typography>
           <Typography color="textPrimary">From:{connote.from_loc}</Typography>
           <Typography color="textPrimary">To:{connote.to_loc}</Typography>
           <Typography color="textPrimary">Col Post:{connote.col_post}</Typography>
           <Typography color="textPrimary">Del Post:{connote.del_post}</Typography>
           <Typography color="textPrimary">Col Sub Zone:{connote.colsubzone}</Typography>
           <Typography color="textPrimary">Del Sub Zone:{connote.delsubzone}</Typography>
           <Typography color="textPrimary">Entered By:{connote.entered_by}</Typography>

           

          </Grid>

          
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={20}
          >
           <Typography color="textPrimary">Cubic:{connote.cubic}</Typography>
           <Typography color="textPrimary">Weight:{connote.weight}</Typography>
           <Typography color="textPrimary">Chg kg:{connote.chg_kg}</Typography>
           <Typography color="textPrimary">Quantity:{connote.quantity}</Typography>
           <Typography color="textPrimary">Lift:{connote.lift}</Typography>
           <Typography color="textPrimary">Pallet:{connote.pallet}</Typography>
           <Typography color="textPrimary">Space:{connote.space}</Typography>
           <Typography color="textPrimary">Option Code:{connote.option_code}</Typography>
           <Typography color="textPrimary">Work Code:{connote.work_code}</Typography>
           <Typography color="textPrimary">Unit:{connote.unit}</Typography>
           <Typography color="textPrimary">Status:{connote.status}</Typography>

           

          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={20}
          >
           <Typography color="textPrimary">Freight Charges:{connote.freight_charges}</Typography>
           <Typography color="textPrimary">Fuel Surch:{connote.fuel_surch}</Typography>
           <Typography color="textPrimary">GST:{connote.gst}</Typography>
           <Typography color="textPrimary">Other Charges:{connote.other_charges}</Typography>
           <Typography color="textPrimary">Gross:{connote.gross}</Typography>

          </Grid>


          </Grid>


          
    
     
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
          
          
            size="large"
            onClick={() => router.back()}
            variant="contained"
          >
            Back
          </Button>
          
        </Box>
      

    </Container>
  </Box>
 
  );
};
