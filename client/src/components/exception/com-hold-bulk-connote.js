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
import {

  useMsal,
} from '@azure/msal-react';


export const HoldBulkConnote = ({connotesToHold}) => {
  const [values, setValues] = useState({
    Reason: '',
    HeldBy:'Manga'
   
  });

  let connotesToHoldParam = [];
  let list=[];
 

  const { accounts } = useMsal();


  const [submit,setSubmitting]= useState(false);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const registerHandler = async (values) => {
    let loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    for(var j in connotesToHold)
     list.push([j, connotesToHold [j]]);
    
    console.log('list test',list[0]  )
    let i = 0;
  for (i = 0; i < list.length; i++) {
    const payload = {
      // make payload here using values
      Connote: connotesToHold[i].con_note,
      Reason: formik.values.Reason,
      HeldBy:loginname
    }
    
      console.log('JSON.stringify(connotesToHoldParam)',payload )
      try {
        const response = await axios.post('http://afs-web01:4545/exception/heldConnote', payload ).then(response => {
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
 
   
  }

  function HoldConnote(connote){


 
    const res =  axios.post('http://afs-web01:4545/exception/heldConnote', connote).then(response => {
      
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
      Reason: '',
      HeldBy:''
    
    },
    validationSchema: Yup.object({
     
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
          required
          fullWidth
          helperText={formik.touched.Reason }
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
            //disabled={formik.isSubmitting}
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
