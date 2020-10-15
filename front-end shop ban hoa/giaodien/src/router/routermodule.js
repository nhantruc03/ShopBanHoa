import React, { Component } from 'react';
import { Route } from 'react-router-dom'
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
class router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/admin/listproducts" component={Listproducts} />
                <Route exact path="/admin/addproducts" component={Addproducts} />
                <Route exact path="/admin/editproducts/:id" component={Editproducts} />

                <Route exact path="/admin/listcategories" component={Listcategories} />
                <Route exact path="/admin/editcategories/:id" component={Editcategories} />
                <Route exact path="/admin/addcategories" component={Addcategories} />

                <Route exact path="/admin/listbanners" component={Listbanners} />
                <Route exact path="/admin/editbanners/:id" component={Editbanners} />
                <Route exact path="/admin/addbanners" component={Addbanners} />

                <Route exact path="/admin/listcategorycontents" component={Listcategorycontents} />
                <Route exact path="/admin/editcategorycontents/:id" component={Editcategorycontents} />
                <Route exact path="/admin/addcategorycontents" component={Addcategorycontents} />

                <Route exact path="/admin/listnewscategories" component={Listnewscategories} />
                <Route exact path="/admin/editnewscategories/:id" component={Editnewscategories} />
                <Route exact path="/admin/addnewscategories" component={Addnewscategories} />

                <Route exact path="/admin/listnews" component={Listnews} />
                <Route exact path="/admin/editnews/:id" component={Editnews} />
                <Route exact path="/admin/addnews" component={Addnews} />

                
            </div>
        );
    }
}

export default router;