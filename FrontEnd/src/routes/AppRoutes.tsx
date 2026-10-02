import { Routes, Route } from 'react-router-dom'
import Checkout from '../pages/Checkout/Checkout'

import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Category from '../pages/Category/Category'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Admin from '../pages/Admin/Admin'
import Payment from '../pages/Payment/Payment'
import Orders from '../pages/Orders/Orders'
import OrderDetail from '../pages/OrderDetail/OrderDetail'

import AdminOrderManagement from '../pages/AdminOrderManagement/AdminOrderManagement'
import AdminOrderDetail from '../pages/AdminOrderDetail/AdminOrderDetail'
import AdminProducts from '../pages/AdminProducts/AdminProducts'
import AdminCategories from '../pages/AdminCategories/AdminCategories'
import AdminUsers from '../pages/AdminUsers/AdminUsers'
import AdminReports from '../pages/AdminReports/AdminReports'

import AdminRoute from '../components/admin/AdminRoute'

function AppRoutes() {
    return (
        <Routes>
            {/* NORMAL ROUTES */}

            <Route path="/" element={<Home />} />

            <Route
                path="/products"
                element={<Products />}
            />

            <Route
                path="/products/:slug"
                element={<ProductDetail />}
            />

            <Route
                path="/category/:slug"
                element={<Category />}
            />

            <Route
                path="/cart"
                element={<Cart />}
            />

            <Route
                path="/checkout"
                element={<Checkout />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/payment/:orderId"
                element={<Payment />}
            />

            <Route
                path="/orders"
                element={<Orders />}
            />

            <Route
                path="/orders/:id"
                element={<OrderDetail />}
            />

            {/* ADMIN ROUTES */}

            <Route element={<AdminRoute />}>

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/admin/orders"
                    element={<AdminOrderManagement />}
                />

                <Route
                    path="/admin/orders/:id"
                    element={<AdminOrderDetail />}
                />

                <Route
                    path="/admin/products"
                    element={<AdminProducts />}
                />

                <Route
                    path="/admin/categories"
                    element={<AdminCategories />}
                />

                <Route
                    path="/admin/users"
                    element={<AdminUsers />}
                />

                <Route
                    path="/admin/reports"
                    element={<AdminReports />}
                />

            </Route>
        </Routes>
    )
}

export default AppRoutes