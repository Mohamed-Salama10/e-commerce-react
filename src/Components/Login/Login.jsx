import React from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
export default function Login({ getUserData }) {
  let navigation = useNavigate();
  let user = {
    email: "",
    password: "",
  };
  let validation = yup.object({
    email: yup.string().required("email is required").email("invalid email"),
    password: yup
      .string()
      .required("password is required")
      .matches()
      .matches(/^(?=.*[A-Z])(?=.*[@#$])(?=.{8,})/, "invalid password"),
  });

  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      signIn(values);
    },
    validationSchema: validation,
  });

  async function signIn(user) {
    try {
      $(".submitBtn").html('<i class="fa-solid fa-spinner fa-spin-pulse"></i>');
      let { data } = await axios.post(
        "https://route-ecommerce-app.vercel.app/api/v1/auth/signin",
        user
      );
      $(".submitBtn").html("submit");
      console.log(data.token);
      localStorage.setItem("userToken", data.token);
      if (data.message == "success") {
        $(".success-message").fadeIn(500, function () {
          setTimeout(function () {
            getUserData();
            navigation("/home");
          }, 2000);
        });
      }
    } catch (error) {
      $(".submitBtn").html("submit");
  
      $(".errorMsg").html(error.response.data.message);
      $(".errorMsg").fadeIn(500, function () {
        setTimeout(function () {
          $(".errorMsg").fadeOut(500);
        }, 2000);
      });
    }
  }
  return (
    <>
      <div className="container py-5">
        <div
          style={{ display: "none" }}
          className="alert alert-success  text-center success-message"
        >
          Login Success
        </div>
        <div
          style={{ display: "none" }}
          className="alert alert-danger errorMsg text-center"
        ></div>
        <h3 className="mb-3"> Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="mb-3" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="mb-3 mt-3" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-3 text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button className="btn btn-success mt-3 submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
