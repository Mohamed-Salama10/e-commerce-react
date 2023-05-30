import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loadingscreen from "../Loadingscreen/Loadingscreen";

export default function Products() {
  let { choice, choiceName } = useParams();
  const [allProducts, setAllProducts] = useState(null);
  async function gettAllProducts() {
    try {
      let { data } = await axios.get(
        "https://route-ecommerce-app.vercel.app/api/v1/products"
      );
      console.log(data.data);
      setAllProducts(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    gettAllProducts();
  }, []);
 
  return (
    <>
      {allProducts == null ? (
        <Loadingscreen />
      ) : (
        <div className="container py-5">
          <div className="row">
            {allProducts.map((product, idx) => {
              return product.category.name === choiceName &&
                choice === "category" ? (
                <>
                  <div className="col-lg-3" key={idx}>
                    <Link to={`/productdetails/${product.id}`}>
                      <div>
                        <figure className="figure">
                          <img
                            src={product.images[0]}
                            className="figure-img img-fluid rounded"
                            alt={product.name}
                            style={{ height: "300px" }}
                          />
                          <figcaption className="figure-caption">
                            <h4 className="text-center">
                              {product.title.slice(
                                0,
                                product.title.indexOf(" ", 10)
                              )}
                            </h4>
                          </figcaption>
                        </figure>
                      </div>
                    </Link>
                  </div>
                </>
              ) : product.brand.name.trim() === choiceName.trim() && choice === "brand" ? (
                <>
                  <div className="col-lg-3" key={idx}>
                    <Link to={`/productdetails/${product.id}`}>
                      <div>
                        <figure className="figure">
                          <img
                            src={product.images[0]}
                            className="figure-img img-fluid rounded"
                            alt={product.name}
                            style={{ height: "300px" }}
                          />
                          <figcaption className="figure-caption">
                            <h4 className="text-center">
                              {product.title.slice(
                                0,
                                product.title.indexOf(" ", 10)
                              )}
                            </h4>
                          </figcaption>
                        </figure>
                      </div>
                    </Link>
                  </div>
                </>
              ) : '';
            })}
          </div>
        </div>
      )}
    </>
  );
}
