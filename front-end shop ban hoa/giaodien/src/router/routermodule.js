import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Listproducts from '../components/listproducts'
import Addproducts from '../components/addproducts'
import Editproducts from '../components/editproducts'
import Listcategories from '../components/listcategories'
import Editcategories from '../components/editcategories'
import Addcategories from '../components/addcategories'
import Listbanners from '../components/listbanner'
import Addbanners from '../components/addbanners'
import Editbanners from '../components/editbanner'
class router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/listproducts" component={Listproducts} />
                <Route exact path="/addproducts" component={Addproducts} />
                <Route exact path="/editproducts/:id" component={Editproducts} />

                <Route exact path="/listcategories" component={Listcategories} />
                <Route exact path="/editcategories/:id" component={Editcategories} />
                <Route exact path="/addcategories" component={Addcategories} />

                <Route exact path="/listbanners" component={Listbanners} />
                <Route exact path="/editbanners/:id" component={Editbanners} />
                <Route exact path="/addbanners" component={Addbanners} />

                
            </div>
        );
    }
}

export default router;