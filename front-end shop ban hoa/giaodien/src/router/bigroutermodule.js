import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import adminpage from '../components/areaadmin/page';
import adminlogin from '../components/areaadmin/login';
import {SecureRouteAdmin} from '../router/secureRoute'
class bigroutermodule extends Component {
    render() {
        return (
            <div>
                <SecureRouteAdmin exact path="/admin" component={adminpage} />
                <Route exact path="/admin/login" component={adminlogin}/>
            </div>
        );
    }
}

export default bigroutermodule;