import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [currentUserCart, setcurrentUserCart] = useState(null);
  const [cartCounter, setCartCounter] = useState(null);

  async function addProductTocart(id) {
    try {
      let response = await axios.post(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setCartCounter(response.data.numOfCartItems);
      await getCart();
      return response.data.status;
    } catch (error) {
      return error;
    }
  }

  async function removeProductFromcart(id) {
    try {
      let response = await axios.delete(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getCart();
      return response.data.status;
    } catch (error) {
      return error;
    }
  }

  async function clearCart() {
    try {
      let { message } = await axios.delete(
        "https://route-ecommerce-app.vercel.app/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      await getCart();
    } catch (error) {}
  }

  async function getCart() {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      setcurrentUserCart(data.data);
      setCartCounter(data.numOfCartItems);
    } catch (error) {}
  }

  async function updateProductCount(productID, productCount) {
    try {
      let message = await axios.put(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${productID}`,
        { count: productCount },
        { headers: { token: localStorage.getItem("userToken") } }
      );
        console.log(message);
      if(message.data.status == 'success') {
        setCartCounter(message.data.numOfCartItems)
        getCart()


      }
    } catch (error) {}
  }

  useEffect(() => {
    (async function () {
      if (localStorage.getItem("userToken") !== null) {
        await getCart();
      }
    })();
  }, []);

  function isProductInCart(id) {
    for (const pro of currentUserCart.products) {
      if (pro.product.id == id) {
        return true;
      }
    }
    return false;
  }

  return (
    <cartContext.Provider
      value={{
        addProductTocart,
        removeProductFromcart,
        clearCart,
        currentUserCart,
        isProductInCart,
        getCart,
        cartCounter,
        updateProductCount
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
