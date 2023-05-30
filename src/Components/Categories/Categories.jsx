import axios from "axios";
import React, { useEffect, useState } from "react";
import Loadingscreen from "../Loadingscreen/Loadingscreen";
import { Link } from "react-router-dom";

export default function Categories({ allCategories }) {
  console.log(allCategories);
  return (
    <>
      {allCategories == null ? (
        <Loadingscreen />
      ) : (
        <div className="container py-5 ">
          <div className="row">
            {allCategories.map((category, idx) => {
              return (
                <div className="col-lg-3" key={idx}>
                  <Link to={`/products/category/${category.name}`}>
                  
                  <div>
                    <figure className="figure">
                      <img
                        src={category.image}
                        className="figure-img img-fluid rounded "
                        alt={category.name}
                        style={{ height: "300px" }}
                      />
                      <figcaption className="figure-caption">
                        <h4 className="text-center">{category.name}</h4>
                      </figcaption>
                    </figure>
                  </div>
                  </Link>
                  
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
