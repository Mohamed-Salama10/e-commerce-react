import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slickslider from "../Slickslider/Slickslider";
import Loadingscreen from "../Loadingscreen/Loadingscreen";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import $ from "jquery";
import { cartContext } from "./../CartContextProvider/CartContextProvider";

export default function Productdetails() {
  const [productDetails, setproductDetails] = useState(null);
  let { productId } = useParams();
  const {
    addProductTocart,
    removeProductFromcart,
    clearCart,
    currentUserCart,
    isProductInCart,
    getCart,
  } = useContext(cartContext);

  async function getProductDetails() {
    //This method is used to get the product details from the database
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/products/${productId}`
      );
      setproductDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(id) {
    //This method is used to add product to cart

    let message = await addProductTocart(id);

    if (message == "success") {
      $(".add-success-msg").fadeIn(100, () => {
        setTimeout(() => {
          $(".add-success-msg").fadeOut(500);
        }, 2000);
      });
    }
  }

  async function removeFromCart(id) {
    //This method is used to remove product from cart
    let message = await removeProductFromcart(id);
    console.log(message);
    if (message == "success") {
      $(".remove-success-msg").fadeIn(500, () => {
        setTimeout(() => {
          $(".remove-success-msg").fadeOut(500);
        }, 2000);
      });
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  useEffect(() => {}, [currentUserCart]);

  return (
    <>
      {productDetails == null || currentUserCart == null ? (
        <Loadingscreen />
      ) : (
        <div>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-6">
                <Slickslider imgsArray={productDetails.images} height={500} />
              </div>
              <div className="col-lg-6 py-5 mt-5">
                <div>
                  <h3>{productDetails.title}</h3>
                  <h5 className="text-secondary mt-3">
                    {productDetails.description}
                  </h5>
                  <h6>{productDetails.category.name}</h6>
                  <div className="d-flex justify-content-between">
                    <h6>{productDetails.price}</h6>
                    <div className="d-flex">
                      <Rating
                        name="half-rating-read"
                        defaultValue={productDetails.ratingsAverage}
                        precision={0.1}
                        readOnly
                      />
                      <h6 className="mt-1 fs-6 ms-1">
                        {productDetails.ratingsAverage}
                      </h6>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    addToCart(productDetails._id);
                  }}
                  className="btn btn-success mt-3 w-100"
                >
                  add to cart
                </button>
                {isProductInCart(productDetails._id) ? (
                  <button
                    onClick={() => {
                      removeFromCart(productDetails._id);
                    }}
                    className="btn btn-danger mt-3 w-100"
                  >
                    remove from cart
                  </button>
                ) : (
                  ""
                )}

                <div
                  style={{ display: "none" }}
                  className=" add-success-msg alert alert-success mt-2 text-center fs-6"
                >
                  Product added successfully{" "}
                </div>
                <div
                  style={{ display: "none" }}
                  className=" remove-success-msg alert alert-danger mt-2 text-center fs-6"
                >
                  Product removed successfully
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
