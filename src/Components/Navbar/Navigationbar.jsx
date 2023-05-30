import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/freshcart-logo.svg";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartContext } from "./../CartContextProvider/CartContextProvider";

export default function Navigationbar({ currentUserData, clearUserData }) {
  let { cartCounter, currentUserCart } = useContext(cartContext);
  let navigation = useNavigate();
  function signOut() {
    clearUserData();
    localStorage.removeItem("userToken");
    navigation("/login");
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  console.log();




  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light px-5">
        <div className="d-flex w-100 justify-content-between px-5">
          <div className="container-fluid d-flex">
            <Link className="navbar-brand" to="/home">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="d-flex justify-content-between  w-100 px-5">
                {/* /////////////First PART///////////////// */}

                <ul className="navbar-nav ">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="cart">
                      Cart
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="brands">
                      Brands
                    </Link>
                  </li>
                </ul>
                {/* /////////////SECOND PART///////////////// */}
                <ul className="navbar-nav ">
                  {currentUserData !== null ? (
                    <>
                      <li className=" m-auto ">
                        <ul className="list-unstyled d-flex">
                          <li className="ms-3 ">
                            <Link
                              to="https://www.instagram.com/"
                              target="_blank"
                            >
                              <i className=" text-dark fa-brands fa-instagram"></i>
                            </Link>
                          </li>
                          <li className="ms-3 ">
                            <Link
                              to="https://www.facebook.com/"
                              target="_blank"
                            >
                              <i className=" text-dark fa-brands fa-facebook"></i>
                            </Link>
                          </li>
                          <li className="ms-3 ">
                            <Link to="https://twitter.com/" target="_blank">
                              <i className=" text-dark fa-brands fa-twitter"></i>
                            </Link>
                          </li>
                          <li className="ms-3 ">
                            <Link
                              to="https://www.linkedin.com/"
                              target="_blank"
                            >
                              <i className=" text-dark fa-brands fa-linkedin"></i>
                            </Link>
                          </li>
                          <li className="ms-3 ">
                            <Link to="https://www.youtube.com/" target="_blank">
                              <i className=" text-dark fa-brands fa-youtube"></i>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </li>
                      <li className="nav-item  m-auto">
                        <a href="#" className="text-decoration-none text-black">
                          <span onClick={signOut}>signout</span>
                        </a>
                      </li>
                      <li className="nav-item  m-auto ms">
                        <Link to={"/cart"}>
                          <IconButton aria-label="cart">
                            <StyledBadge
                              badgeContent={cartCounter}
                              color="secondary"
                            >
                              <ShoppingCartIcon />
                            </StyledBadge>
                          </IconButton>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/login"
                        >
                          Login
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          aria-current="page"
                          to="/register"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
