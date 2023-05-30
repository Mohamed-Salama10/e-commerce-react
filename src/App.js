import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brand/Brands";
import Categories from "./Components/Categories/Categories";
import Profile from "./Components/Profile/Profile";
import Errorscreen from "./Components/Errorscreen/Errorscreen";
import Loadingscreen from "./Components/Loadingscreen/Loadingscreen";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import Productdetails from "./Components/Productdetails/Productdetails";
import Products from "./Components/Products/Products";
import CartContextProvider from "./Components/CartContextProvider/CartContextProvider";

function App() {
  ////////use State variables//////////

  const [allCategories, setallCategories] = useState(null);

  const [currentUserData, setUserData] = useState(null);

  ////////Functions//////////////////

  function clearUserData() {
    setUserData(null);
  }
  function getUserData() {
    const userData = jwtDecode(localStorage.getItem("userToken"));
    setUserData(userData);
  }

  async function getAllCategories() {
    let { data } = await axios.get(
      "https://route-ecommerce-app.vercel.app/api/v1/categories"
    );

    setallCategories(data.data);
  }

  function Protectedroutes({ children }) {
    if (currentUserData == null) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }

  /////useEffect///////
  useEffect(function () {
    if (localStorage.getItem("userToken") !== null && currentUserData == null) {
      getUserData();
    }

    getAllCategories();
  }, []);

  ////////routing//////////
  let route = createHashRouter([
    {
      path: "",
      element: (
        <Layout
          currentUserData={currentUserData}
          clearUserData={clearUserData}
        />
      ),
      children: [
        {
          path: "",
          element: (
            <CartContextProvider>
              <Home
                getAllCategories={getAllCategories}
                allCategories={allCategories}
              />
            </CartContextProvider>
          ),
        },
        {
          path: "home",
          element: (
            <CartContextProvider>
              <Home
                getAllCategories={getAllCategories}
                allCategories={allCategories}
              />
            </CartContextProvider>
          ),
        },
        { path: "login", element: <Login getUserData={getUserData} /> },
        { path: "register", element: <Register /> },
        {
          path: "cart",
          element: (
            <Protectedroutes>
              <CartContextProvider>
                <Cart />
              </CartContextProvider>
            </Protectedroutes>
          ),
        },
        {
          path: "categories",
          element: <Categories allCategories={allCategories} />,
        },
        { path: "brands", element: <Brands /> },
        { path: "products/:choice/:choiceName", element: <Products /> },
        {
          path: "profile",
          element: (
            <Protectedroutes>
              <Profile />
            </Protectedroutes>
          ),
        },
        {
          path: "productdetails/:productId",
          element: (
            <Protectedroutes>
              <CartContextProvider>
                <Productdetails />
              </CartContextProvider>
            </Protectedroutes>
          ),
        },
        { path: "*", element: <Errorscreen /> },
      ],
    },
  ]);

  //////////////////////////////////////////////////////////////
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
