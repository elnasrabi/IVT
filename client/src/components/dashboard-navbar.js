import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography,Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { msalConfig } from "../authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useRouter } from 'next/router'
import { useIsAuthenticated } from "@azure/msal-react";
const msalInstance = new PublicClientApplication(msalConfig);

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

function handleLogout(instance) {
  msalInstance.logoutPopup().catch(e => {
      console.error(e);
  });
 
}


export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
 // console.log('props top',props)
  const isAuthenticated = useIsAuthenticated();
  //   const username = accounts[0].username;
  const router = useRouter() 
const { accounts } = useMsal();
// console.log ('accounts[0]',accounts[0])
const username = 'User';
// console.log('isAuthenticated',isAuthenticated);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar>
        <Typography color="334FFF">Welcome:{username}</Typography>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
