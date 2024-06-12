import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/products/all-products"
                );
                setProducts(res.data.result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    /*Rating*/
    // const renderStars = (rating) => {
    //     const stars = [];
    //     for (let i = 0; i < 5; i++) {
    //         if (i < rating) {
    //             stars.push(
    //                 <svg
    //                     key={i}
    //                     className="h-3 w-3 text-yellow-300"
    //                     fill="currentColor"
    //                     viewBox="0 0 20 20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    //                 </svg>
    //             );
    //         } else {
    //             stars.push(
    //                 <svg
    //                     key={i}
    //                     className="h-3 w-3 text-gray-300"
    //                     fill="currentColor"
    //                     viewBox="0 0 20 20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    //                 </svg>
    //             );
    //         }
    //     }
    //     return stars;
    // };

    return (
        <div className="flex flex-wrap justify-center">
            {products.map(product => (
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
                                {/* {product.rating}.0 */}
                                5 sao ne
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                            <a
                                href="#"
                                className="rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            >
                                Add to cart
                            </a>
                        </div>
                    </Card>
                )
            ))}
        </div>
    );

};

export default ProductCard;