import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import adminpage from '../components/areaadmin/page';
import adminlogin from '../components/areaadmin/login';
class bigroutermodule extends Component {
    render() {
        return (
            <div>
                <Route exact path="/admin" component={adminpage} />
                <Route exact path="/admin/login" component={adminlogin}/>
            </div>
        );
    }
}

export default bigroutermodule;