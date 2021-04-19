import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import React, {lazy,useEffect,Suspense } from "react";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Register}  from './Pages/Auth/Register'
import {Header} from './Components/Header'
import { RegisterComplete } from './Pages/Auth/RegisterComplete';
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { sendcurrentuserrequest } from './utils/callLogin';
import { LoadingOutlined } from "@ant-design/icons";
// import Login  from './Pages/Auth/Login';
// import Logout from './Pages/Auth/Logout';
// import ForgotPassword from './Pages/Auth/ForgotPassword';
// import History from './Pages/User/History';
// import PrivateRoute from './Components/Routes/UserRoute';
// import Password from './Pages/User/Password';
// import AdminRoute from './Components/Routes/AdminRoute';
// import CategoryCreate from './Pages/Admin/category/CategoryCreate';
// import CategoryUpdate from './Pages/Admin/category/CategoryUpdate';
// import SubCategory from './Pages/Admin/Sub/SubCategory';
// import SubUpdate from './Pages/Admin/Sub/SubUpdate';
// import ProductCreate from './Pages/Admin/product/ProductCreate';
// import AllProducts from './Pages/Admin/product/AllProducts';
// import ProductUpdate from './Pages/Admin/product/ProductUpdate';
// import Home from './Pages/Home';
// import Product from './Pages/Product';
// import CategoryHome from './Pages/Admin/category/CategoryHome';
// import SubHome from './Pages/sub/SubHome';
// import Shop from './Pages/Shop';
// import Cart from './Pages/Cart';
// import Checkout from './Pages/Checkout';
// import CreateCouponPage from './Pages/Admin/coupon/CreateCouponPage';
// import Payment from './Pages/Payment';
// import Wishlist from './Pages/User/Wishlist';
const Login  =lazy(()=>import( './Pages/Auth/Login'));
const Logout =lazy(()=>import( './Pages/Auth/Logout'));
const ForgotPassword =lazy(()=>import( './Pages/Auth/ForgotPassword'));
const History =lazy(()=>import( './Pages/User/History'));
const PrivateRoute =lazy(()=>import( './Components/Routes/UserRoute'));
const Password =lazy(()=>import( './Pages/User/Password'));
const AdminRoute =lazy(()=>import( './Components/Routes/AdminRoute'));
const CategoryCreate =lazy(()=>import( './Pages/Admin/category/CategoryCreate'));
const CategoryUpdate =lazy(()=>import( './Pages/Admin/category/CategoryUpdate'));
const SubCategory =lazy(()=>import( './Pages/Admin/Sub/SubCategory'));
const SubUpdate =lazy(()=>import( './Pages/Admin/Sub/SubUpdate'));
const ProductCreate =lazy(()=>import( './Pages/Admin/product/ProductCreate'));
const AllProducts =lazy(()=>import( './Pages/Admin/product/AllProducts'));
const ProductUpdate =lazy(()=>import( './Pages/Admin/product/ProductUpdate'));
const Home =lazy(()=>import( './Pages/Home'));
const Product =lazy(()=>import( './Pages/Product'));
const CategoryHome =lazy(()=>import( './Pages/Admin/category/CategoryHome'));
const SubHome =lazy(()=>import( './Pages/sub/SubHome'));
const Shop =lazy(()=>import( './Pages/Shop'));
const Cart =lazy(()=>import( './Pages/Cart'));
const Checkout =lazy(()=>import( './Pages/Checkout'));
const CreateCouponPage =lazy(()=>import( './Pages/Admin/coupon/CreateCouponPage'));
const Payment =lazy(()=>import( './Pages/Payment'));
const Wishlist =lazy(()=>import( './Pages/User/Wishlist'));



function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
   

        sendcurrentuserrequest(idTokenResult.token)
          .then((res) => {
           console.log(idTokenResult.token)
            const currentuser=res.data.currentuser
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: currentuser.name,
                email:currentuser.email,
                token: idTokenResult.token,
                role:currentuser.role,
                _id: currentuser._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ React Redux EC
          <LoadingOutlined />
          MMERCE __
        </div>
      }
    >


    <Router>
      <Header> </Header>
      <ToastContainer/>
      <Switch>       

      <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/Login" exact>
          <Login/>
        </Route>

        <Route path="/Register" exact>
          <Register />
        </Route>


        <Route path="/User/Password" exact>
          <Password />
        </Route>


        <Route path="/Register/Complete" exact>
          <RegisterComplete />
        </Route>

        <Route path="/Logout" exact>
          <Logout />
        </Route>

        <Route path="/Forgot/Password" exact>
          <ForgotPassword />
        </Route>

        <PrivateRoute path="/User/History" exact>
          <History />
        </PrivateRoute>

        <PrivateRoute exact path="/user/wishlist" component={Wishlist} />

        <PrivateRoute path="/payment" exact>
          <Payment />
        </PrivateRoute>

        <PrivateRoute path="/Admin/Dashboard" exact>
          <AdminRoute />
        </PrivateRoute>

        <PrivateRoute path="/Admin/Category" exact>
          <CategoryCreate />
        </PrivateRoute>

        <PrivateRoute path="/Admin/Sub" exact>
          <SubCategory/>
        </PrivateRoute>

        <PrivateRoute path="/Admin/Sub" exact>
          <SubCategory/>
        </PrivateRoute>
        <PrivateRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <PrivateRoute path="/Admin/Category/:slug" exact  component={CategoryUpdate}>
        </PrivateRoute>

        <PrivateRoute path="/admin/product" exact  component={ProductCreate}>
        </PrivateRoute>

        <PrivateRoute path="/admin/products" exact  component={AllProducts}>
        </PrivateRoute>

        <PrivateRoute path="/admin/product/:slug" exact  component={ProductUpdate}>
        </PrivateRoute>

        <PrivateRoute path="/product/:slug" exact  component={Product}>
        </PrivateRoute>

        <PrivateRoute path="/category/:slug" exact  component={CategoryHome}>
        </PrivateRoute>

        <PrivateRoute path="/sub/:slug" exact  component={SubHome}>
        </PrivateRoute>
        
        <PrivateRoute path="/shop" exact  component={Shop}>
        </PrivateRoute>

        <PrivateRoute path="/cart" exact  component={Cart}>
        </PrivateRoute>
        <PrivateRoute path="/checkout" exact  component={Checkout}>
        </PrivateRoute>
        <PrivateRoute path="/Admin/Coupon" exact  component={CreateCouponPage}>
        </PrivateRoute>
      </Switch>
  </Router>
  </Suspense>
  );
}

export default App;
