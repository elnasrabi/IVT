import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/Sign-in-Button";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <Navbar bg="primary" variant="dark">
              
                { isAuthenticated ? <span>Signed In</span> : <SignInButton /> }
            </Navbar>
            <h5><center>Welcome to the IVT Authentication Service</center></h5>
            <br />
            <br />
            {props.children}
        </>
    );
};