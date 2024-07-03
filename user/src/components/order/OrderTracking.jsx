import React, { useState, useEffect } from 'react';
import Breadcrumbs from "../elements/Breadcrumb";
import none from "../../assets/images/background/notFind.png";
import axios from 'axios';

const OrderTracking = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto min-h-screen">
        <Breadcrumbs headline={"Theo dõi đơn hàng"} />
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
          <nav className="bg-white w-full shadow-md">
            <div className="container mx-auto px-4 py-2">
              <ul className="flex justify-around">
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Tất cả</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Chờ thanh toán</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-orange-600 border-b-2 border-orange-600">Vận chuyển</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Chờ giao hàng</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Hoàn thành</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Đã hủy</a>
                </li>
                <li className="py-2">
                  <a href="#" className="text-gray-600 hover:text-gray-800">Trả hàng/Hoàn tiền</a>
                </li>
              </ul>
            </div>
          </nav>

          <main className="flex-grow flex flex-col items-center justify-center py-12">
            <div className="container mx-auto px-4">
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <div className="flex">
                      <img src={product.imgUrl} alt={product.product_name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="ml-4 flex-grow">
                        <h2 className="text-lg font-semibold">{product.product_name}</h2>
                        <div className="flex items-center">
                          <span className="text-red-600 font-bold">{product.price} ₫</span>
                          {product.discount > 0 && (
                            <span className="ml-2 text-gray-500 line-through">{product.originalPrice} ₫</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img src={none} alt="No orders icon" className="w-full h-full" />
                  </div>
                  <p className="text-gray-500">Chưa có đơn hàng</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default OrderTracking;
