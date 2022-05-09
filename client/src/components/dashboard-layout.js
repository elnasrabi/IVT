import { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { AMDashboardSidebar } from './AM-dashboard-sidebar';
import { GlobalDashboardSidebar } from './global-dashboard-sidebar';
import { DashboardSidebar } from './dashboard-sidebar';



import { useIsAuthenticated } from "@azure/msal-react";


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  console.log('Dashboard props: ' ,props)
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAM, SetIsAM] = useState(false);
  const [articles, setArticles] = useState([]);
  const isAuthenticated = useIsAuthenticated();
  const type = props.type;
  



  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar isloggedin={props.isloggedin} onSidebarOpen={() => setSidebarOpen(true)} />
      {isAuthenticated && <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        isloggedin={props.isloggedin} 
      />}
       {!isAuthenticated && <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        isloggedin={props.isloggedin} 
      />}
    </>
  );
};
