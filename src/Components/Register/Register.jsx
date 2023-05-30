import axios from "axios";
import { Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  let validation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "name must not be less than 3")
      .max(15, "name must be more than 15"),
    email: Yup.string().required("email is required").email("invalid email"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone number"),
    password: Yup.string()
      .required("password is required")
      .matches(/^(?=.*[A-Z])(?=.*[@#$])(?=.{8,})/, "invalid password"),
    rePassword: Yup.string()
      .required("re password is required")
      .oneOf([Yup.ref("password")], "Passwords doesnot match"),
  });

  let navigation = useNavigate();

  async function registerNewUser(user) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce-app.vercel.app/api/v1/auth/signup",
        user
      );
      console.log(data);
      if (data.message === "success") {
        console.log("sssssssssss");
        $(".success-msg").fadeIn(500);
        setTimeout(function () {
          navigation("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      $(".errormsg").html(error.response.data.message);
      $(".errormsg").fadeIn(500, function () {
        setTimeout(function name() {
          $(".errormsg").fadeOut(500);
        }, 3000);
      });
    }
  }

  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      registerNewUser(values);
    },
    validationSchema: validation,
  });

  return (
    <>
      <div className="container py-5">
        <div
          style={{ display: "none" }}
          className="alert alert-success success-msg text-center"
        >
          Registration Success
        </div>

        <div
          style={{ display: "none" }}
          className="alert alert-danger errormsg text-center"
        >
          Registration Success
        </div>

        <h2>Register Now:</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className="mb-3">
            Name:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            id="name"
            className="form-control"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-2 text-center">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email" className="mb-3 mt-3">
            Email:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            id="email"
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone" className="mb-3 mt-3">
            Phone:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            id="phone"
            className="form-control"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-2 text-center">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password" className="mb-3 mt-3">
            Password:
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            id="password"
            className="form-control"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword" className="mb-3 mt-3">
            Re-Password:
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            className="form-control mb-3"
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger text-center">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
