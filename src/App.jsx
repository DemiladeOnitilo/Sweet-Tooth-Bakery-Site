import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
import MainLayout from "./layout/MainLayout";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <MainLayout />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="services/category/:id" element={<Category />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <CheckoutSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>,
    ),
  );

  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
