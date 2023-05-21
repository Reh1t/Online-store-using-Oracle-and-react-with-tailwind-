import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home.jsx'
import Store from './store.jsx'
import SignUp from "./SignUp.jsx";
import ForgotPassword from "./ForgotPassword.jsx"
import SellerCenter from "./SellerCenter.jsx";
import Vendor from "./Vendor.jsx"
import Admin from "./Admin.jsx"
import Console from "./Console.jsx";
import Shop from "./Shop.jsx";
import CustomerProfile from "./CustomerProfile.jsx"
import Cart from "./Cart.jsx";
import EditCustomer from "./EditProfileCustomer.jsx";
import ProductPage from "./OrderProduct.jsx";
import EditVendor from "./EditProfileVendor.jsx";
import EditProduct from "./EditProduct.jsx";
import SellerConsole from "./SellerConsole.jsx"
import EditSeller from "./EditProfileSeller.jsx";
import Orders from "./Orders.jsx";
import AdminConsole from "./AdminConsole.jsx"
import EditAdmin from "./EditProfileAdmin.jsx";
import EditSellerProduct from "./EditSellerProduct.jsx";
import ErrorPage from "./Error.jsx";

const CustomerLogin = localStorage.getItem('CustomerLogin');
console.log(CustomerLogin);
const VendorLogin = localStorage.getItem('VendorLogin');
const SellerLogin = localStorage.getItem('SellerLogin');
const AdminLogin = localStorage.getItem('AdminLogin');

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/seller-center" element={<SellerCenter />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/Admin" element={<Admin />} />

        <Route path="/error" element={<ErrorPage />} />

        <Route path="/store" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <Store />} />
        <Route path="/console" element={VendorLogin !== '1' ? <Navigate to="/error" /> : <Console />} />
        <Route path="/shop" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <Shop />} />
        <Route path="/customer-profile" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <CustomerProfile />} />
        <Route path="/cart" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <Cart />} />
        <Route path="/edit-customer" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <EditCustomer />} />
        <Route path="/product-page" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <ProductPage />} />
        <Route path="/edit-vendor" element={VendorLogin !== '1' ? <Navigate to="/error" /> : <EditVendor />} />
        <Route path="/edit-product" element={VendorLogin !== '1' ? <Navigate to="/error" /> : <EditProduct />} />
        <Route path="/seller-console" element={SellerLogin !== '1' ? <Navigate to="/error" /> : <SellerConsole />} />
        <Route path="/edit-seller" element={SellerLogin !== '1' ? <Navigate to="/error" /> : <EditSeller />} />
        <Route path="/orders" element={CustomerLogin !== '1' ? <Navigate to="/error" /> : <Orders />} />
        <Route path="/admin-console" element={AdminLogin !== '1' ? <Navigate to="/error" /> : <AdminConsole />} />
        <Route path="/edit-admin" element={AdminLogin !== '1' ? <Navigate to="/error" /> : <EditAdmin />} />
        <Route path="/edit-seller-product" element={SellerLogin !== '1' ? <Navigate to="/error" /> : <EditSellerProduct />} />


      </Routes>
    </Router>
  );
}

export default App;