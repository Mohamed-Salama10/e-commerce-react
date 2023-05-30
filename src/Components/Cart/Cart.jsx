import React, { useContext } from "react";
import CartContextProvider from "../CartContextProvider/CartContextProvider";
import { cartContext } from "./../CartContextProvider/CartContextProvider";
import Loadingscreen from "../Loadingscreen/Loadingscreen";
import "./Cart.css";

export default function Cart() {
  const {
    addProductTocart,
    removeProductFromcart,
    clearCart,
    currentUserCart,
    updateProductCount,
  } = useContext(cartContext);

  return (
    <>
      {currentUserCart == null ? (
        <Loadingscreen />
      ) : (
        <div className="py-4">
          <h2 className="text-center text-danger">My shopping Cart </h2>

          <div className="container border py-3">
            <div className="row lower-line mb-3">
              <div className="col-lg-5">
                <h6 className="text-center">Description</h6>
              </div>
              <div className="col-lg-3">
                <h6 className="text-center">Quantity</h6>
              </div>
              <div className="col-lg-2">
                <h6 className="text-center">Remove</h6>
              </div>
              <div className="col-lg-2">
                <h6 className="text-center">Price</h6>
              </div>
            </div>
            {console.log(currentUserCart)}

            {currentUserCart.products.map((pro, idx) => {
              return (
                <div className=" row items-row" key={idx}>
                  <div className="col-lg-5 py-5  ps-5 d-flex align-items-center">
                    <img
                      src={pro.product.imageCover}
                      alt=""
                      style={{ height: "200px" }}
                      className="img-fluid"
                    />
                    <h3 className="ms-3 fs-5 ">{pro.product.title}</h3>
                  </div>
                  <div className="col-lg-3 py-5 d-flex align-items-center justify-content-center ">
                    {/* <button
                      style={{ height: "50px", width: "10px" }}
                      className="btn btn-success p-3  me-2"
                    >
                      +
                    </button> */}
                    <input
                      style={{ height: "50px", width: "100px" }}
                      className="text-center border  bg-light rounded  form-control"
                      type="number"
                      value={pro.count}
                      onChange={(e) => {
                        updateProductCount(pro.product.id, e.target.value);
                      }}
                    />

                    {/* <button
                      style={{ height: "50px", width: "50px" }}
                      className="btn btn-danger p-3  ms-2"
                    >
                      -
                    </button> */}
                  </div>
                  <div className="col-lg-2 py-5 d-flex align-items-center justify-content-center">
                    <button
                      className=" border p-3 bg-light  remove-class btn"
                      onClick={() => {
                        console.log(pro.product.id);
                        removeProductFromcart(pro.product.id);
                      }}
                    >
                      <i class="fa-solid fa-x fs-6 "></i>
                    </button>
                  </div>
                  <div className="col-lg-2 py-5 d-flex align-items-center justify-content-center">
                    <h6 className="text-center border p-3 bg-light rounded">
                      $ {pro.count * pro.price}
                    </h6>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="col-lg-3 offset-lg-9   col-md-6  offset-md-6  col-sm-12 ">

                <span className="form-control  text-center mt-3 bg-light me-5 ">
                Total price : 
                {currentUserCart.totalCartPrice} $
                </span>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
