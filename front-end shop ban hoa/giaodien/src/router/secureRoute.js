import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const SecureRouteAdmin = (props) => {
    return (
    <Route path={props.path} render={data=>auth.isAuthenticatedAdmin()?(
        <props.component {...data}></props.component>):
    (<Redirect to={{pathname:'/admin/login'}}></Redirect>)}></Route>
  );
};
