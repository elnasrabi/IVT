
import { PublicClientApplication } from "@azure/msal-browser";

export const requiresInteraction = (errorMessage) => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf('consent_required') > -1 ||
    errorMessage.indexOf('interaction_required') > -1 ||
    errorMessage.indexOf('login_required') > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.json();
  };

//   export const isIE = () => {
//     const ua = window.navigator.userAgent;
//     const msie = ua.indexOf('MSIE ') > -1;
//     const msie11 = ua.indexOf('Trident/') > -1;
  
//     // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
//     // const isEdge = ua.indexOf("Edge/") > -1;
  
//     return msie || msie11;
//   };

  export const AUTH_SCOPES = {
    OPENID: 'openid',
    OFFLINE_ACCESS: 'offline_access',
    PROFILE: 'profile'
  };

  export const AUTH_REQUESTS = {
    LOGIN: {
      scopes: [AUTH_SCOPES.OPENID, AUTH_SCOPES.PROFILE],
    },
    EMAIL: {
      scopes: [],
    },
    REFRESH_TOKEN: {
      scopes: [process.env.REACT_APP_CLIENT_ID],
    },
  };




  export const msalApp = new PublicClientApplication({
    auth: {
      clientId: '80249579-f4e8-485e-bea8-a14db308f590',
      authority: 'https://login.microsoftonline.com/00b6e27a-f85c-4d05-8668-57fd7cc1ec1c',
      validateAuthority: 'true',
      redirectUri: 'https://localhost:3000/',
      postLogoutRedirectUri: 'https://localhost:3000/login',
      navigateToLoginRequestUrl: 'true',
    },
    cache: {
      cacheLocation: 'sessionStorage',
    //   storeAuthStateInCookie: isIE(),
    },
    system: {
      navigateFrameWait: 0,
    },
  });