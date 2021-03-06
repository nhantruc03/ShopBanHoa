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
import Order from '../components/areaadmin/order/listorders'
import OrderDetails from '../components/areaadmin/order/orderdetails'
import { SecureRouteAdmin } from '../router/secureRoute'
import { AppRoute } from './AppRoute';

import Client from '../components/areaclient/page';
import Admin from '../components/areaadmin/page';
import Home from '../components/areaclient/home/home';
import Contact from '../components/areaclient/contact/contact';
import Productdetails from '../components/areaclient/productdetails/productdetails';
import Shop from '../components/areaclient/shop/shop';
import { Route } from 'react-router-dom';
import adminlogin from '../components/areaadmin/login';
import newsdetails from '../components/areaclient/newsdetails/newsdetails';
import news from '../components/areaclient/news/news';
import listdocument from '../components/areaadmin/document/listdocument';
import editdocument from '../components/areaadmin/document/editdocument';
import adddocument from '../components/areaadmin/document/adddocument';
import document from '../components/areaclient/document/document';
import cart from '../components/areaclient/cart/cart';
import login from '../components/areaclient/login/login';
import { SecureRouteClient } from './secureRouteClient';
import report from '../components/areaadmin/report/report';
import personal from '../components/areaadmin/personal/personal';
import personal_client from '../components/areaclient/personal/personal';
import listcontact from '../components/areaadmin/contact/listcontact';
import contact from '../components/areaadmin/contact/contact';
import orderdetails_history from '../components/areaclient/personal/orderdetails_history';
import register from '../components/areaclient/register/register';
class router extends Component {
    render() {
        return (
            <div>
                <SecureRouteAdmin exact path="/admin/listproducts" component={Listproducts} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addproducts" component={Addproducts} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editproducts/:id" component={Editproducts} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listcontacts" component={listcontact} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/contacts/:id" component={contact} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listcategories" component={Listcategories} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editcategories/:id" component={Editcategories} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addcategories" component={Addcategories} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listbanners" component={Listbanners} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editbanners/:id" component={Editbanners} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addbanners" component={Addbanners} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/report" component={report} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/personal" component={personal} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listcategorycontents" component={Listcategorycontents} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editcategorycontents/:id" component={Editcategorycontents} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addcategorycontents" component={Addcategorycontents} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listnewscategories" component={Listnewscategories} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editnewscategories/:id" component={Editnewscategories} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addnewscategories" component={Addnewscategories} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listnews" component={Listnews} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editnews/:id" component={Editnews} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addnews" component={Addnews} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listusers" component={Listuser} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editusers/:id" component={Editusers} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/addusers" component={Addusers} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/listdocuments" component={listdocument} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/editdocuments/:id" component={editdocument} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/adddocuments" component={adddocument} layout={Admin} />

                <SecureRouteAdmin exact path="/admin/orders/:id" component={OrderDetails} layout={Admin} />
                <SecureRouteAdmin exact path="/admin/listorders" component={Order} layout={Admin} />
                <SecureRouteAdmin exact path="/admin" component={Listproducts} layout={Admin} />

                <AppRoute exact path="/" component={Home} layout={Client} />
                <SecureRouteClient exact path="/contact" component={Contact} layout={Client} />
                <AppRoute exact path="/product-details.:meta.:id" component={Productdetails} layout={Client} />
                <AppRoute exact path="/shop" component={Shop} layout={Client} />
                <AppRoute exact path="/news-details.:meta.:id" component={newsdetails} layout={Client} />
                <AppRoute exact path="/news" component={news} layout={Client} />
                <AppRoute exact path="/documents.:name.:id" component={document} layout={Client} />
                <SecureRouteClient exact path="/cart" component={cart} layout={Client} />

                <SecureRouteClient exact path="/personal" component={personal_client} layout={Client} />
                <SecureRouteClient exact path="/orders/:id" component={orderdetails_history} layout={Client} />
                <AppRoute exact path="/login" component={login} layout={Client} />
                <AppRoute exact path="/register" component={register} layout={Client} />
                <Route exact path="/admin/login" component={adminlogin} />
            </div>

        );
    }
}

export default router;