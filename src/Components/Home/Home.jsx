import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import groceryImg from "../../assets/images/grocery-banner.png";
import groceryImg2 from "../../assets/images/grocery-banner-2.jpeg";
import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";
import sliderImg4 from "../../assets/images/slider-2.jpeg";
import Slickslider from "../Slickslider/Slickslider";
import Categoriesslider from "../Categoryslider/Categoriesslider";
import Loading from "react-loading";
import Loadingscreen from "../Loadingscreen/Loadingscreen";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { cartContext } from "./../CartContextProvider/CartContextProvider";
import "./Home.css";
import $ from "jquery";
export default function Home({ getAllCategories, allCategories }) {
  let imgsArray = [
    groceryImg,
    groceryImg2,
    sliderImg1,
    sliderImg2,
    sliderImg3,
    sliderImg4,
  ];

  let {
    isProductInCart,
    addProductTocart,
    removeProductFromcart,
    clearCart,
    currentUserCart,
  } = useContext(cartContext);

  async function addToCart(id) {
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
    let message = await removeProductFromcart(id);
    if (message == "success") {
      $(".remove-success-msg").fadeIn(100, () => {
        setTimeout(() => {
          $(".remove-success-msg").fadeOut(500);
        }, 2000);
      });
    }
  }

  const [allProducts, setAllProducts] = useState(null);
  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/products"
      );

      setAllProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      {allCategories == null ||
      allProducts == null  ? (
        <Loadingscreen />
      ) : (
        <>
          <div
            style={{ display: "none" }}
            className="alert alert-success position-fixed w-50 add-success-msg status-msg text-center fs-6"
          >
            Product added succesfully{" "}
          </div>

          <div
            style={{ display: "none" }}
            className="alert alert-danger position-fixed w-50 remove-success-msg status-msg  text-center fs-6"
          >
            Product removed succesfully
          </div>
          <div className="container py-5 position-relative">
            <Slickslider imgsArray={imgsArray} height={300} />
            {allCategories != [] ? (
              <Categoriesslider
                getAllCategories={getAllCategories}
                allCategories={allCategories}
              />
            ) : (
              ""
            )}

            <div className="container  mt-5 ">
              <div className="row ">
                {allProducts.map((product, idx) => {
                  return (
                    <div className="col-lg-3 g-3 " key={idx}>
                      <Link to={`/productdetails/${product.id}`}>
                        <div>
                          <div className="p-2">
                            <figure className="figure">
                              <figcaption className="figure-caption ">
                                <img
                                  src={product.images[0]}
                                  alt={product.title.slice(
                                    0,
                                    product.title.indexOf(" ", 10)
                                  )}
                                  className="img-fluid"
                                />

                                <h5 className="text-black mt-3">
                                  {product.title.slice(
                                    0,
                                    product.title.indexOf(" ", 10)
                                  )}
                                </h5>
                                <div className="d-flex  justify-content-between">
                                  <h6>price: {product.price} $</h6>
                                  <div className="d-flex">
                                    <Rating
                                      name="half-rating-read"
                                      defaultValue={product.ratingsAverage}
                                      precision={0.1}
                                      readOnly
                                    />
                                    <h6 className="mt-1 fs-6 ms-1">
                                      {product.ratingsAverage}
                                    </h6>
                                  </div>
                                </div>
                              </figcaption>
                            </figure>
                          </div>
                        </div>
                      </Link>
                      {currentUserCart != null?<div className="">
                        <button
                          onClick={() => {
                            addToCart(product.id);
                          }}
                          className=" btn btn-success "
                        >
                          +
                        </button>

                        {isProductInCart(product.id) ? (
                          <button
                            onClick={() => {
                              removeFromCart(product.id);
                            }}
                            className=" btn btn-danger ms-1"
                          >
                            -
                          </button>
                        ) : (
                          ""
                        )}
                      </div>:'' }
                      
                      
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
