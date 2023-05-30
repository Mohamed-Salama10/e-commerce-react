import React from "react";
import "./Layout.css";
import Navigationbar from "../Navbar/Navigationbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import CartContextProvider, { cartContext } from "./../CartContextProvider/CartContextProvider";
export default function Layout({currentUserData, clearUserData}) {
  return (
    <>
      <CartContextProvider>
      <Navigationbar currentUserData={currentUserData} clearUserData={clearUserData}  />
      </CartContextProvider>
      <Outlet />
      <Footer />
    </>
  );
}
