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


export const ReleaseBulkConnoteCom = ({connotesToRelease}) => {
  let connotesToReleaseConverted= {};

  try{
    if(connotesToRelease){
      connotesToReleaseConverted= JSON.parse(connotesToRelease.connote);
      connotesToRelease= JSON.parse(connotesToRelease.connote);
    }
 
  }
  catch{
    connotesToReleaseConverted={};
  }

  const [values, setValues] = useState({
    Reason: '',
    HeldBy:'Manga'
   
  });

  let connotesToReleaseParam = [];
  let list=[];
 

  const { accounts } = useMsal();


  const [submit,setSubmitting]= useState(false);
  const [alert, setAlert] = useState(0);
  const [alertContent, setAlertContent] = useState('');

  const registerHandler = async (values) => {
    let loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    for(var j in connotesToReleaseConverted)
     list.push([j, connotesToReleaseConverted [j]]);
//      const result = Object.values(connotesToRelease);

//       console.log('Map Result',result);
//       var myMap = result,
//   mapData = JSON.stringify([...myMap]),
//    values = JSON.parse(mapData).map(d => d[1]);
// console.log("mapData:",mapData);
// console.log("values:",values);

//     console.log('connotesToRelease',JSON.parse(connotesToRelease.connote))
    console.log('list test',list[0] )
    let i = 0;
  for (i = 0; i < list.length; i++) {
    const payload = {
      // make payload here using values
      Id: connotesToReleaseConverted[i].Id
    }
    
      console.log('payload',payload )
      try {
        const response = await axios.post('https://127.0.0.1:5050/api/rules/deleteHeldConnote', payload ).then(response => {
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
          setAlertContent('Error in Releaseing the Connote - '+ error.message);
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

  function ReleaseConnote(connote){


 
    const res =  axios.post('https://127.0.0.1:5050/api/rules/deleteHeldConnote', connote).then(response => {
      
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
      setAlertContent('Error in Releaseing the Connote - '+ error.message);
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

    
    }
  });


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
      <NextLink
        href="/exception/heldconsignments"
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
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
          All selected connotes will be released...
          </Typography>
        </Box>
    
        
     
        
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            //disabled={formik.isSubmitting}
            fullWidth
            size="large"
           
            onClick={() => {
             
               registerHandler();
                   }}
            variant="contained"
          >
            Release
          </Button>
          
        </Box>
        </form>
      


    </Container>
  </Box>
 
  );
};
