export const msalConfig = {
    auth: {
      clientId: "80249579-f4e8-485e-bea8-a14db308f590",
      authority: "https://login.microsoftonline.com/00b6e27a-f85c-4d05-8668-57fd7cc1ec1c", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    // redirectUri: "https://afs-web01:91/",
      redirectUri: 'http://localhost:3000/',
   
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "Enter_the_Graph_Endpoint_Here/v1.0/me"
  };