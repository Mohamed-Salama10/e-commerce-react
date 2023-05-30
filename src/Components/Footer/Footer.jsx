import React from "react";

export default function Footer() {
  return (
    <div className="p-5 bg-light ">
      <h3>Get the Fresh Cart app</h3>
      <p>We will send you a link, open it on your phone to download the app </p>
      <form action="" className="d-flex justify-content-between w-75">
        <input
          type="text"
          className="form-control"
          placeholder="E-mail"
          style={{ width: "80%" }}
        />
        <button className="btn btn-success px-5 "> share App link</button>
      </form>
      <div className=" ">
        <div className="py-4  border-bottom border-top d-flex justify-content-between  align-items-center">
          <div className="d-flex ">
            <h6>Payment Partners</h6>
            <i className=" m-1 fa-brands fa-cc-amazon-pay"></i>
            <i className=" m-1 fa-brands fa-cc-amex"></i>
            <i className=" m-1 fa-brands fa-cc-mastercard"></i>
            <i className=" m-1 fa-brands fa-paypal"></i>
          </div>
          <div className=" d-flex align-items-center">
            <h5>Get deliveries with fresh cart</h5>
            <button className="btn btn-dark d-flex align-content-center ms-3 bg-success">
              <div className="">
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-brands fa-apple me-2"
                ></i>
              </div>
              <div>
                <h6 style={{ fontSize: "10px" }}>Avilable on the</h6>
                <h6 style={{ fontSize: "13px" }}>App store</h6>
              </div>
            </button>

            <button className="btn btn-dark d-flex align-content-center ms-3 bg-success">
              <div className="">
                <i
                  style={{ fontSize: "30px" }}
                  className="fa-brands fa-google-play me-2 "
                ></i>
              </div>
              <div>
                <h6 style={{ fontSize: "10px" }}>Avilable on the</h6>
                <h6 style={{ fontSize: "13px" }}>Play store</h6>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
