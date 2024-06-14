import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { fetchProducts } from "../../data/api";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

 
  return (
    <div className="flex flex-wrap justify-center">
      {products.map(
        (product) =>
          product.isActive && (
            <Card
              key={product._id}
              className="max-w-xs m-2"
              imgAlt={product.product_name}
              imgSrc={product.imgUrl}
            >
              <a href="#">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.product_name}
                </h5>
              </a>
              <div className="mb-3 mt-1.5 flex items-center">
                {/* {renderStars(product.rating)} */}
                <span className="ml-2 mr-1 rounded bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {/* {product.rating}.0 */}5 sao ne
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <a
                  href="#"
                  className="rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  Add to cart
                </a>
              </div>
            </Card>
          )
      )}
    </div>
  );
};

export default ProductCard;
