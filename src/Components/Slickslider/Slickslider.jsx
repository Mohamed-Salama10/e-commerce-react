import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Homeslider({ imgsArray, height }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="mt-3">
      {imgsArray.map(function (image, idx) {
        return (
          <div key={idx}>
            <img
              style={{ height: `${height}px` }}
              className=" w-100"
              src={image}
            />
          </div>
        );
      })}
    </Slider>
  );
}
