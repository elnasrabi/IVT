import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
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

export const ViewConnote = ({connote,props}) => {
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

  const registerHandler = async (values) => {
    let loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    const payload = {
      // make payload here using values
      Connote: connote.con_note,
      Reason: formik.values.Reason,
      HeldBy:loginname
    }
    try {
      const response = await axios.post('https://afs-web01:5051/api/exception/heldConnote', payload).then(response => {
        console.log('response.data.success',response.data);

        if(response.data.Msg)
          {
            setAlertContent(response.data.Msg);
            setAlert(1);
          }
        else
          {
            setAlertContent( error.message);
            setAlert(2);
          }
       }).catch(error=>{
        setAlertContent('Error in Holding the Connote - '+ error.message);
        setAlert(2);
       })

    
    } catch (e) {
      setAlertContent( e.message);
      setAlert(2);
    } finally {
     ;
    }
  }




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
    <Container maxWidth="sm">
     
        <Button onClick={() => router.back()}
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Exceptions
        </Button>
    
        <Divider />
        <form onSubmit={formik.handleSubmit}>
        <Box sx={{ my: 3 }}>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            Hold Reason
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
          Provide the reasons of helding the connote...
          </Typography>
        </Box>
        <TextField
          error={Boolean(formik.touched.connote && formik.errors.connote)}
          fullWidth
          helperText={formik.touched.connote && formik.errors.connote}
          label="Connote"
          margin="normal"
          name="connote"
          onBlur={formik.handleBlur}
          //onChange={formik.handleChange}
          value={values.Connote}
          variant="outlined"
        />
          <TextField
          error={Boolean(formik.touched.customer && formik.errors.connote)}
          fullWidth
          helperText={formik.touched.customer && formik.errors.customer}
          label="Customer"
          margin="normal"
          name="customer"
          onBlur={formik.handleBlur}
          //onChange={formik.handleChange}
          value={formik.values.customer}
          variant="outlined"
        />
          <TextField
          error={Boolean(formik.touched.cons_date && formik.errors.customer)}
          fullWidth
          helperText={formik.touched.cons_date && formik.errors.connote}
          label="Connote Date"
          margin="normal"
          name="cons_date"
          onBlur={formik.handleBlur}
          //onChange={formik.handleChange}
          value={formik.values.cons_date}
          variant="outlined"
        />
        <TextField
          error={Boolean(formik.touched.Reason && formik.errors.connote)}
          required
          fullWidth
          helperText={formik.touched.Reason && formik.errors.Reason}
          label="Reason"
          margin="normal"
          name="Reason"
          multiline="true"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.Reason}
          variant="outlined"
        />
        
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
          //  onClick={() => {
                     
          //   setValues({...values, HeldBy : 'Manga2' })
          //      ViewConnote(values)}}
            variant="contained"
          >
            Hold
          </Button>
          
        </Box>
        </form>
      


    </Container>
  </Box>
 
  );
};
