import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, useState } from 'react'
import Navbar from './Component/Home/Navbar';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

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
    const { data } = await axios.get('http://localhost:8000/api/v1/order/stripeapikey', { withCredentials: true })
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
          <Route path='/menu/:id' element={<MenuDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shiping/details' element={<ShipItems />} />
          <Route path='/order/confirm' element={<Orderconfirm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders/me' element={<MyOrders />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
          <Route path='/success' element={<OrderSuccess/>}/>
          <Route path='/admin/' element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='menu/all' element={<AllMenu />} />
            <Route path='menu/new' element={<CreateMenu />} />
            <Route path='orders/all' element={<Orders />} />
          </Route>
          <Route
            path="/process/payment"
            element={
              stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
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
