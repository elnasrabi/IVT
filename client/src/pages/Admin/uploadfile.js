import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ExceptionListResults } from '../../components/exception/exception-list-results';
import { Users} from '../../components/exception/test-redux';
import { ExceptionListToolbar } from '../../components/exception/exception-list-toolbar';
import { TableTest } from '../../components/exception/tabletest';
import { DashboardLayout } from '../../components/dashboard-layout';
import { exceptions } from '../../__mocks__/exceptions';
import { useState,useEffect,fetch } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import useSWR from 'swr'
import Link from 'next/link'
import {connect} from 'react-redux'
import {getExceptions} from '../../components/store/actions/exceptionsActions'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { SignInButton } from "../../components/Sign-in-Button";
import { useIsAuthenticated } from "@azure/msal-react";
import Table from "../../components/fileuploader/Table";




function FileReader({props,excep}){ 
    const { accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const[csvfile,setcsfFile]=useState();
   
  
  
      const handleChange = (event) => {
        setcsfFile(event.target.files[0]);
      };
  
      const  importCSV = () => {
        Papa.parse(csvfile, {
          complete: updateData,
          header: true
        });
      };
    
      const updateData =(result) => {
        var data = result;
        console.log(data);
      };

    const ProtectedComponent = () => {
      if (!isAuthenticated) {
      return !isAuthenticated && <p>Please  <Link
      href={{
        pathname: '/login',
      }}  
    > sign in </Link>first to use the solution.</p>;
     
       }
      }

      console.log(csvfile);
  
  return(
    <div>
    <spann>{ProtectedComponent()}</spann>
    <Table/>
    </div>
    )
  };
  FileReader.getLayout = (page) => (
    <div>
   

   <div>
  {page}
</div>



   
    {/* <UnauthenticatedTemplate>
     <SignInButton/>
   </UnauthenticatedTemplate>  */}
   </div>
  );
  
  

  export default FileReader;









