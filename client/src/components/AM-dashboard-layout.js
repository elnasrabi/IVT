import { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { AMDashboardSidebar } from './AM-dashboard-sidebar';
import { GLOBALDashboardNavbar } from './global-dashboard-sidebar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useIsAuthenticated } from "@azure/msal-react";
import { GlobalDashboardSidebar } from './global-dashboard-sidebar';



const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const AMDashboardLayout = (props) => {
  // //console.log('Dashboard props: ' ,props)
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAM, SetIsAM] = useState(false);
  const [articles, setArticles] = useState([]);

  const type = props.type;
  

  useEffect(
    () => {
      if (type=='AM'){
        SetIsAM(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

   //console.log('type props: ' ,type)

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
      <AMDashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        isloggedin={props.isloggedin} 
      />
    </>
  );
};
