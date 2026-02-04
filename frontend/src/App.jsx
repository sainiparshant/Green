import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AddPlant from "./pages/admin/AddProduct";
import Contact from "./pages/Contact";
import Plants from "./pages/Plants";
import PlantDetails from "./pages/PlantDetails";
import PotDetails from "./pages/PotDetails";
import Pots from "./pages/Pots";
import Cart from "./pages/Cart";
import AddressPage from "./pages/AddressPage";
import Payment from "./pages/Payment";
import Account from "./pages/Account";
import { useEffect } from "react";
import { loadUser } from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./helper/ProtectedRoute";
import SearchResult from "./pages/SearchResult";
import ProductPage from "./pages/admin/ProductPage";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Customers from "./pages/admin/Customers";
import AdminSettings from "./pages/admin/AdminSettings";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:id" element={<PlantDetails />} />
          <Route path="/pots" element={<Pots />} />
          <Route path="/pots/:id" element={<PotDetails />} />
          <Route path="/search" element={<SearchResult />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute role="user">
                <Account />
              </ProtectedRoute>
            }
          />

           <Route
          path="/checkout/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute role="user">
              <AddressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />
        </Route>
       

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedRoute role="admin">
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute role="admin">
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute role="admin">
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute role="admin">
                <AddPlant />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
