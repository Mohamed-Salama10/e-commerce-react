import axios from "axios";

import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categoriesslider({ getAllCategories, allCategories }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="mt-5 mb-5">
      <h5 className="mb-3">Popular Categories</h5>
      <Slider {...settings}>
        {allCategories != null
          ? allCategories.map(function (cat, idx) {
              return (
                <Link key={idx} to={`/products/category/${cat.name}`}>
                  <div>
                    <figure className="figure">
                      <img
                        src={cat.image}
                        className="figure-img img-fluid rounded"
                        style={{ height: "200px", width: "200px" }}
                        alt={cat.name}
                      />
                      <figcaption className="figure-caption text-center fs-6">
                        {cat.name}
                      </figcaption>
                    </figure>
                  </div>
                </Link>
              );
            })
          : ""}
      </Slider>
    </div>
  );
}
