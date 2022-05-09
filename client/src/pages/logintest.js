import React from "react";
import { AuthContext } from "../context/auth-context";
import { AuthProvider } from "../providers/auth-provider";

class Login extends React.Component {
    
  render() {
    const auth = this.context;
    return (
      <div>
        <button
          type="primary"
          className="ant-btn-login"
          block
          onClick={() => auth.onSignIn()}
        >
          Login </button>
        <button
          type="primary"
          className="ant-btn-login"
          block
          onClick={() => auth.onSignOut()}
        >
          Logout
        </button>

		{
			auth.isAuthenticated ? <p>Welcome {auth.account.name}</p> : <p>Please login</p>
		}
      </div>
    );
  }
}Login.contextType = AuthContext;

export default Login;