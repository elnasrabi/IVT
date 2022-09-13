import { useEffect,useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { Clock as ClockIcon } from '../icons/clock';
import SmartButtonIcon from '@mui/icons-material/Dashboard';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Search as SearchIcon } from '../icons/search';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useIsAuthenticated } from "@azure/msal-react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import {getUserType,getAccountManager,getIsActive} from  "./auth/getlogin"
import axios from 'axios';


const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard',
    isAdmin:false

  },
  {
    href: '/exception/heldconsignments',
    icon: (<UserIcon fontSize="small" />),
    title: 'Held Connotes',
    isAdmin:false
  },
  {
    href: '/rules',
    icon: (<CogIcon fontSize="small" />),
    title: 'IVT Admin Panel',
    isAdmin:false
  },
  {
    href: '/exception/exceptions',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Quality Exceptions',
    isAdmin:false
  },
  {
    href: '/exception/histexception',
    icon: (<ErrorIcon fontSize="small" />),
    title: 'Pending Exceptions',
    isAdmin:false
  },
  
  {
    href: '/exception/MLExceptions',
    icon: (<SmartButtonIcon fontSize="small" />),
    title: 'ML Exceptions',
    isAdmin:false
  },
  
  {
    href: '/logout',
    icon: (<LockIcon fontSize="small" />),
    title: 'Sign Out',
    isAdmin:false
  },
 

];

const NotLoggeditems = [
 
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
 

];



const AMitems = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard',
    isAdmin:false

  },
  {
    href: '/exception/heldconsignments',
    icon: (<UserIcon fontSize="small" />),
    title: 'Held Connotes',
    isAdmin:false
  },
 
  {
    href: '/exception/exceptions',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Quality Exceptions',
    isAdmin:false
  },
  {
    href: '/exception/histexception',
    icon: (<ErrorIcon fontSize="small" />),
    title: 'Pending Exceptions',
    isAdmin:false
  },
  
  {
    href: '/exception/MLExceptions',
    icon: (<SmartButtonIcon fontSize="small" />),
    title: 'ML Exceptions',
    isAdmin:false
  },
  
  {
    href: '/logout',
    icon: (<LockIcon fontSize="small" />),
    title: 'Sign Out',
    isAdmin:false
  },
 

];


export const DashboardSidebar =(props)=> {
  const { open, onClose,isloggedin } = props;
  const router = useRouter();
  
const UserType = getUserType();
console.log('UserType eeeeeeeeee',UserType)

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

   //console.log('props side',props)

   //console.log('props side login',login)

  const isAuthenticated = useIsAuthenticated();
   //console.log('isAuthenticated side bar',isAuthenticated)

  const { accounts } = useMsal();
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoaded, setIsloaded] = useState(false)
  const [LoggedUser, setLoggedUser] = useState({UserType:0,AccountManager:'',IsActive:1});
 
  const getAccessToken = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('accessToken');
  };

  const token=getAccessToken();

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const NotLoginContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
              
                <Typography
                  color="white"
                  variant="body2"
                >
                 Invoice Vetting Solution
                </Typography>
              </div>
         
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
     
        <Box sx={{ flexGrow: 1 }}>
          {NotLoggeditems.map((item) => (
             <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          )) }

        </Box>
       
       
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        
        </Box>
      </Box>
    </>
  );


  const AMContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
              
                <Typography
                  color="white"
                  variant="body2"
                >
                 Invoice Vetting Solution
                </Typography>
              </div>
         
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
     
        <Box sx={{ flexGrow: 1 }}>
          {AMitems.map((item) => (
             <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          )) }

        </Box>
       
       
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        
        </Box>
      </Box>
    </>
  );

 
  
    const content = (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                
                  <Typography
                    color="white"
                    variant="body2"
                  >
                   Invoice Vetting Solution
                  </Typography>
                </div>
           
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
       
          <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => (
               <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            )) }
  
          </Box>
         
         
          <Divider sx={{ borderColor: '#2D3748' }} />
          <Box
            sx={{
              px: 2,
              py: 3
            }}
          >
          
          </Box>
        </Box>
      </>
    );

  if (lgUp) {
    return (
      (isAuthenticated && UserType==1 && token)? <Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {content}
  </Drawer>:(isAuthenticated && UserType==0 && token)? <Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {AMContent}
  </Drawer>:<Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {NotLoginContent}
  </Drawer>

      
    );
  }

  return (
    (isAuthenticated && UserType==1 && token)? <Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {content}
  </Drawer>:(isAuthenticated && UserType==0 && token)? <Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {AMContent}
  </Drawer>:<Drawer
    anchor="left"
    open
    PaperProps={{
      sx: {
        backgroundColor: 'black',
        color: '#FFFFFF',
        width: 280
      }
    }}
    variant="permanent"
  >
    {NotLoginContent}
  </Drawer>

      
    );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
 
};



// export async function getStaticProps() {

//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
  
// try {
//   const { accounts } = useMsal();
//     const [isAdmin, setIsAdmin] = useState(false)
//     const [isLoaded, setIsloaded] = useState(false)
//     const [LoggedUser, setLoggedUser] = useState({UserType:0,AccountManager:'',IsActive:1});
//     const isAuthenticated = useIsAuthenticated();
//      //console.log('loginname static side',loginname)
//     if (isAuthenticated){
//       loginname=accounts[0].username.substring(0, accounts[0].username.indexOf("@"));
//        //console.log('loginname',loginname)
//    }
//    const payload = {
//      // make payload here using values
//      LoginName: loginname // 'mnasir'//loginname
//    }
   
// const result = await axios.get('https://afs-web01:5051/api/exception/getCurrentException');
//     const data = result;
//     return {
//         props: {
//           login: data
//         }
//     }
// } catch (error) {
//      //console.log(error);
// }

  

// }


