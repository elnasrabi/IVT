export const getUserType = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('UserType');
  };


  export const getAccountManager = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('AccountManager');
  };

  export const getIsActive = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('IsActive');
  };

  export const getLoginName = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('LoginName');
  };

  export const getCurrentExceptions = () => {
    if (typeof window !== 'undefined') 
       return localStorage.getItem('currentexceptions');
  };

  