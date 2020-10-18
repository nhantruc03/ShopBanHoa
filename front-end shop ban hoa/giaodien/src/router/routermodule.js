import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import Listproducts from '../components/areaadmin/product/listproducts'
import Addproducts from '../components/areaadmin/product/addproducts'
import Editproducts from '../components/areaadmin/product/editproducts'
import Listcategories from '../components/areaadmin/categories/listcategories'
import Editcategories from '../components/areaadmin/categories/editcategories'
import Addcategories from '../components/areaadmin/categories/addcategories'
import Listbanners from '../components/areaadmin/banner/listbanner'
import Addbanners from '../components/areaadmin/banner/addbanners'
import Editbanners from '../components/areaadmin/banner/editbanner'
import Listcategorycontents from '../components/areaadmin/categorycontents/listcategorycontents'
import Addcategorycontents from '../components/areaadmin/categorycontents/addcategorycontents'
import Editcategorycontents from '../components/areaadmin/categorycontents/editcategorycontents'
import Listnewscategories from '../components/areaadmin/newscategories/listnewscategories'
import Addnewscategories from '../components/areaadmin/newscategories/addnewscategories'
import Editnewscategories from '../components/areaadmin/newscategories/editnewscategories'
import Listnews from '../components/areaadmin/news/listnews'
import Addnews from '../components/areaadmin/news/addnews'
import Editnews from '../components/areaadmin/news/editnews'
import Listuser from '../components/areaadmin/users/listusers'
import Addusers from '../components/areaadmin/users/addusers'
import Editusers from '../components/areaadmin/users/editusers'

import {SecureRouteAdmin} from '../router/secureRoute'
class router extends Component {
    render() {
        return (
            <div>
                <SecureRouteAdmin exact path="/admin/listproducts" component={Listproducts} />
                <SecureRouteAdmin exact path="/admin/addproducts" component={Addproducts} />
                <SecureRouteAdmin exact path="/admin/editproducts/:id" component={Editproducts} />

                <SecureRouteAdmin exact path="/admin/listcategories" component={Listcategories} />
                <SecureRouteAdmin exact path="/admin/editcategories/:id" component={Editcategories} />
                <SecureRouteAdmin exact path="/admin/addcategories" component={Addcategories} />

                <SecureRouteAdmin exact path="/admin/listbanners" component={Listbanners} />
                <SecureRouteAdmin exact path="/admin/editbanners/:id" component={Editbanners} />
                <SecureRouteAdmin exact path="/admin/addbanners" component={Addbanners} />

                <SecureRouteAdmin exact path="/admin/listcategorycontents" component={Listcategorycontents} />
                <SecureRouteAdmin exact path="/admin/editcategorycontents/:id" component={Editcategorycontents} />
                <SecureRouteAdmin exact path="/admin/addcategorycontents" component={Addcategorycontents} />

                <SecureRouteAdmin exact path="/admin/listnewscategories" component={Listnewscategories} />
                <SecureRouteAdmin exact path="/admin/editnewscategories/:id" component={Editnewscategories} />
                <SecureRouteAdmin exact path="/admin/addnewscategories" component={Addnewscategories} />

                <SecureRouteAdmin exact path="/admin/listnews" component={Listnews} />
                <SecureRouteAdmin exact path="/admin/editnews/:id" component={Editnews} />
                <SecureRouteAdmin exact path="/admin/addnews" component={Addnews} />

                <SecureRouteAdmin exact path="/admin/listusers" component={Listuser} />
                <SecureRouteAdmin exact path="/admin/editusers/:id" component={Editusers} />
                <SecureRouteAdmin exact path="/admin/addusers" component={Addusers} />

                
            </div>
        );
    }
}

export default router;