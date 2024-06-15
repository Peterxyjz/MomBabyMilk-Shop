import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderRating from "../../components/Element/RenderRating";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../data/api";
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const updateProduct = async (product) => {
    const token = JSON.parse(localStorage.getItem("result"));
    console.log(product);
    const id = product._id;
    await axios.patch(
      `http://localhost:4000/products/product/${id}`,
      {
        brand_id: product.brand_id,
        category_id: product.category_id,
        product_name: product.product_name,
        price: product.price,
        description: product.description,
        age: product.age,
        discount: product.discount,
        imgUrl: product.imgUrl,
        isActive: product.isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
  };

  if (loading) {
    return <div className="text-center font-bold text-2xl">Loading...</div>;
  }
  return (
    <section className=" py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 min-h-screen flex flex-col">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg flex-grow">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5 className="text-sm sm:text-base">
                <span className="text-gray-500">All Products:</span>
                <span className="dark:text-white">123456</span>
              </h5>
              <h5 className="text-sm sm:text-base">
                <span className="text-gray-500">Total sales:</span>
                <span className="dark:text-white">$88.4k</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add new product
              </button>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Update stocks 1/250
              </button>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Sản Phẩm
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Loại Sản Phẩm
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Thương Hiệu
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Số Lượng
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Đánh Giá
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Lượng Bán
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Doanh Thu
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Trạng Thái
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Chi Tiết
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={product.imgUrl}
                          alt=""
                          className="w-auto h-8 mr-3"
                        />
                        {product.product_name}
                      </th>
                      {/* <td className="px-4 py-2">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {product.brand_name}
                      </span>
                    </td> */}
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.category_name}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {product.brand_name}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <div className="inline-block w-4 h-4 mr-2 rounded-full" />
                          {product.amount}
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <RenderRating rating={product.rating} />
                          <span className="ml-1 text-gray-500 dark:text-gray-400">
                            {product.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 mr-2 text-gray-400"
                            aria-hidden="true"
                          >
                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                          </svg>
                          1.6M
                        </div>
                      </td>
                      <td className="px-4 py-2">$3.2M</td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <input
                          type="checkbox"
                          value={product.isActive}
                          onChange={async () => {
                            console.log(product.isActive);
                            if (
                              confirm(
                                `Bạn muốn thay đổi trạng thái sản phẩm? | Hiện đang ${
                                  product.isActive === true ? "bật" : "tắt"
                                }`
                              )
                            ) {
                              product.isActive = !product.isActive;
                              alert(
                                `Thay đổi thành công | Hiện đang ${
                                  product.isActive === true ? "bật" : "tắt"
                                }`
                              );
                              setProducts([...products]);

                              await updateProduct(product);
                              console.log(product);
                            }
                          }}
                          checked={product.isActive === true ? "checked" : ""}
                        />
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to={`/edit-product?id=${product._id}`}>
                          Chi Tiết
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center font-bold text-2xl">
                      Không tìm thấy sản phẩm
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* footer */}
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1-10
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                1000
              </span>
            </span>
          </nav>
        </div>
      </div>
    </section>
  );
};
export default Product;
