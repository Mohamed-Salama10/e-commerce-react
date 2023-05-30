import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import Loadingscreen from "../Loadingscreen/Loadingscreen";
import { Link } from "react-router-dom";

export default function Brands() {
  const [allBrands, setAllBrands] = useState(null);
  async function getAllBrands() {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/brands"
      );

      setAllBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  console.log(allBrands);

  return (
    <>
      {allBrands == null ? (
        <Loadingscreen />
      ) : (
        <>
          <div className="container">
            <div className="row">
              {allBrands.map((brand, idx) => {
                return (
                  <div className="col-lg-3" key={idx}>
                    <Link to={`/products/brand/ ${brand.name}`}>
                      <div>
                        <figure className="figure">
                          <img
                            src={brand.image}
                            className="figure-img img-fluid rounded"
                            alt={brand.name}
                          />
                          <figcaption className="figure-caption">
                            <h4 className="ms-3">{brand.name}</h4>
                          </figcaption>
                        </figure>
                        ;
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
