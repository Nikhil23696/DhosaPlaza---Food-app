import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, useState } from 'react'
import Navbar from './Component/Home/Navbar';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProtectedRoute from './Component/ProtectedRoute';

const Signup = lazy(() => import('./Component/Register/Signup'));
const Login = lazy(() => import('./Component/Register/Login'));
const Home = lazy(() => import('./Component/Home/Home'));
const Menu = lazy(() => import('./Component/Menu/Menu'));
const MyOrders = lazy(() => import('./Component/User/MyOrders'));
const Cart = lazy(() => import('./Component/Cart/Cart'));
const OrderSuccess = lazy(() => import('./Component/Order/OrderSuccess'));
const OrderDetails = lazy(() => import('./Component/Order/OrderDetails'));
const Dashboard = lazy(() => import('./Component/admin/Dashboard'));
const AllMenu = lazy(() => import('./Component/admin/AllMenu'));
const CreateMenu = lazy(() => import('./Component/admin/CreateMenu'));
const Orders = lazy(() => import('./Component/admin/Orders'));
const Admin = lazy(() => import('./Component/admin/Admin'));
const Profile = lazy(() => import('./Component/User/Profile'));
const Orderconfirm = lazy(() => import('./Component/Order/OrderConfirm'));
const ShipItems = lazy(() => import('./Component/Ship/ShipItems'));
const Payment = lazy(() => import('./Component/Payment/Payment'));
const MenuDetails = lazy(() => import('./Component/MenuDetails/MenuDetails'));

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get('http://loalhost:8000/api/v1/order/stripeapikey', { withCredentials: true })
    setStripeApiKey(data.stripeApiKey)
  }
  getStripeApiKey()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:id' element={<ProtectedRoute><MenuDetails /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/shiping/details' element={<ProtectedRoute><ShipItems /></ProtectedRoute>} />
          <Route path='/order/confirm' element={<ProtectedRoute><Orderconfirm /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/orders/me' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path='/orders/:id' element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
          <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path='/admin/' element={<Admin />}>
            <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='menu/all' element={<ProtectedRoute><AllMenu /></ProtectedRoute>} />
            <Route path='menu/new' element={<ProtectedRoute><CreateMenu /></ProtectedRoute>} />
            <Route path='orders/all' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Route>
          <Route
            path="/process/payment"
            element={
              stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute><Payment /></ProtectedRoute>
                </Elements>
              ) : (
                <h1>Loading Stripe...</h1>
              )
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
