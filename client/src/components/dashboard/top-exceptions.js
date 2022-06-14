import { format, getDate } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {useState,useEffect} from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import axios from 'axios';
import { useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from 'next/router';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';


export const TopExceptions = (props) => {
  const [top10excpetion, setTop10excpetion] = useState([])

  const top10=[]
  if(props.data){
    top10=props.data
  }
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();
  const { accounts } = useMsal();
//   useEffect(()=>{
//     //console.log('ADDDDDDDDMIN LOOOGIN ',AdminLogin)
//     getData();
  
// },[])

 async function getData(){
  let loginname=''

  // console.log('accessToken UserType nnnnnnnn',localStorage.getItem('UserType'))
  //console.log('isssssssssAuthenticated',accounts[0])
  if (isAuthenticated){
     loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
    // console.log('loginname',loginname)
  }
  const payload = {
    // make payload here using values
    LoginName: loginname // 'fhenderson'//loginname
  }

  await axios.post('http://localhost:5051/api/dashboard/getTop10Exception', payload)
  .then(response =>{
    console.log('Dashboard response',response.data)
    if(response.data)
    {
      setTop10excpetion(response.data)
    }
    // console.log('Dashboard response',response.data[0])
        })
  // .then(r =>setSession({UserType:LoggedUser.UserType,AccountManager:LoggedUser.AccountManager}))
  .catch(error => console.log(error)) 
}




  return (
  <Card {...props}>
    <CardHeader title="Top Exceptions" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
               Excepeption
              </TableCell>
              
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Percentage
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top10.map((exp) => (
              <TableRow
                hover
                key={exp.ErrDesc}
              >
                <TableCell>
                  {exp.ErrDesc}
                </TableCell>
                <TableCell>
                { Number(Math.round(exp.Percenarge+'e2')+'e-2')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(exp.TotCount <=50 && 'success')
                    || (exp.TotCount > 1000 && 'error')
                    || 'warning'}
                  >
                    {exp.TotCount}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
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
        variant="text"
        onClick={()=>router.push('/exception/exceptions')}
      >
        View all
      </Button>
    </Box>
  </Card>
);
}

