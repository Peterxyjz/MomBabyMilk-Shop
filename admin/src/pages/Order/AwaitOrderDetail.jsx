import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../data/api";
import { Button } from "flowbite-react";
import axios from "axios";

const AwaitOrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = JSON.parse(localStorage.getItem("result"));
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

  useEffect(() => {
    const findProductById = (product_id) => {
      return products.find((product) => product._id === product_id);
    };

    if (products.length > 0 && order) {
      const updateOrderDetails = async () => {
        const details = await Promise.all(
          order.order_detail.map(async (item) => {
            const product = findProductById(item.product_id);
            return { ...item, product };
          })
        );
        setOrderDetails(details);
      };

      updateOrderDetails();
    }
  }, [products, order]);

  if (loading) return <div className="w-full h-full mx-6 py-6">Loading...</div>;

  const handleCancelOrder = async () => {
    const order_id = order.order._id
    await axios.post(`http://localhost:4000/orders/status-order`, {
      order_id: order_id,
      status: "Cancel"
    }, {
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    }).then((res) => {
      alert("Đơn hàng đã được huỷ!")
      console.log(res.data);
      navigate("/await-order")
      window.location.reload()
    }).catch((error) => {
      console.log(error.response);
      alert("Đơn hàng không thể huỷ!")
      console.log(error)
    })
  };

  const handleConfirmOrder = async () => {
    const order_id = order.order._id
    await axios.post(`http://localhost:4000/orders/status-order`, {
      order_id: order_id,
      status: "Processing"
    }, {
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    }).then((res) => {
      alert("Đơn hàng đã được xác nhận!")
      console.log(res.data);
      navigate("/await-order")
      window.location.reload()
    }).catch((error) => {
      console.log(error.response);
      alert("Đơn hàng không thể huỷ!")
      console.log(error)
    })
  };

  return (
    <div className="w-full h-full mx-10 my-4">
      <h1 className="text-3xl font-bold">
        Chi tiết đơn hàng: #{order.order._id}
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl">Sản phẩm</h3>
          {orderDetails.map((item) => (
            <div
              key={item.product_id}
              className="mb-4 rounded-lg border border-[rgba(0,0,0,0.2)] bg-white p-4 shadow-sm md:p-6"
            >
              <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <img
                  className="h-20 w-20 dark:hidden"
                  src={item.product.imgUrl}
                  alt={item.product.product_name}
                />
                <img
                  className="hidden h-20 w-20 dark:block"
                  src={item.product.imgUrl}
                  alt={item.product.product_name}
                />
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {Number(item.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                    {item.product.product_name}
                  </p>
                  <div className="flex items-center gap-4">
                    x{item.quantity} sản phẩm
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 border-b border-[rgba(0,0,0,0.2)] sm:mt-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Thông Tin Đơn Hàng
          </h4>
          <div>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              Họ và Tên: {order.order.full_name}
            </p>
            <div className="text-base font-medium text-gray-900 dark:text-white flex items-center justify-between">
              <p>Địa chỉ email: {order.order.email}</p>
              <p>Số Điện Thoại: {order.order.phone} </p>
            </div>
            <div className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
              <p>Địa Chỉ: {order.order.address}</p>
            </div>
          </div>
          <button
            type="button"
            data-modal-target="billingInformationModal"
            data-modal-toggle="billingInformationModal"
            className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
          >
            Chỉnh Sửa
          </button>
          <hr className="my-4" />
          <div className="w-full flex items-center justify-between">
            <Button onClick={handleCancelOrder}>Hủy Đơn Hàng</Button>
            <Button onClick={handleConfirmOrder}>Xác Nhận Đơn Hàng</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwaitOrderDetail;
