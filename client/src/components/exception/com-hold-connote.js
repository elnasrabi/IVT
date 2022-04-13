import { useState } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Grid,
//   TextField
// } from '@mui/material';
import NextLink from 'next/link';
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


export const HoldConnote = ({connote,props}) => {
  const [values, setValues] = useState({
    Connote: connote.con_note,
    Reason: '',
    HeldBy:'Manga'
   
  });
  const [submit,setSubmitting]= useState(false);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const registerHandler = async (values) => {
    const payload = {
      // make payload here using values
      Connote: connote.con_note,
      Reason: formik.values.Reason,
      HeldBy:'Manga3'
    }
    try {
      const response = await axios.post('http://127.0.0.1:4545/exception/heldConnote', payload).then(response => {
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

  function HoldConnote(connote){


 
    const res =  axios.post('http://127.0.0.1:4545/exception/heldConnote', connote).then(response => {
      
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
    //setstate({ Message: response.data }
    //setMsg(response.data.Msg)
     
    
    
    }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const formik = useFormik({
    initialValues: {
      connote: connote.con_note,
      customer:connote.FinanceGroup,
      cons_date:connote.cons_date,
      Reason: '',
      HeldBy:''
    
    },
    validationSchema: Yup.object({
      connote: Yup
        .string()
        .max(255)
        .required(
          'Connote is required'),
          Reason: Yup
        .string()
        .max(1000)
        .required(
          'Reason is required'),
     
    }),
    onSubmit: () => {
     // router.push('/');

     registerHandler();
    }
  });


  return (
    // <form
    //   autoComplete="off"
    //   noValidate
    //   {...props}
    // >
    //   <Card>
    //     <CardHeader
    //       subheader="Why connote needs to be hold?"
    //       title="Hold Connote"
    //     />
    //       {(alert==1) ? <Alert severity='success'>{alertContent}</Alert> : (alert==2)?<Alert severity='error'>{alertContent}</Alert> : <></> }
    //     <Divider />
    //     <CardContent>
    //       <Grid
    //         container
    //         spacing={3}
    //       >
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <TextField
    //             fullWidth
    //             label="Connote No"
    //             name="Connote"
    //             // onChange={handleChange}
    //             required
    //             contentEditable={false}
    //             value={values.Connote}
    //             variant="outlined"
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <TextField
    //             fullWidth
    //             helperText="Please specify the reasons of helding the connote"
    //             label="Reasons"
    //             name="Reason"
    //             onChange={handleChange}
    //             required
    //             multiline={true}
    //             value={values.Reason}
    //             variant="outlined"
    //           />
    //         </Grid>
                
    //       </Grid>
    //     </CardContent>
    //     <Divider />
    //     <Box
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'flex-end',
    //         p: 2
    //       }}
    //     >
    //       <Button
    //         color="primary"
    //         variant="contained"
    //         onClick={() => {
    //           setValues({...values, HeldBy : 'Manga2' })
    //           HoldConnote(values)
              
    //           }}>
    //         Hold
    //       </Button>
    //     </Box>
    //   </Card>
    // </form>

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
      <NextLink
        href="/exception/exceptions"
        passHref
      >
        <Button
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Exceptions
        </Button>
      </NextLink>
      {(alert==1) ? <Alert severity='success'>{alertContent}</Alert> : (alert==2)?<Alert severity='error'>{alertContent}</Alert> : <></> }
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
          //      HoldConnote(values)}}
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
