import { useLocation } from "react-router-dom";
import Breadcrumbs from "../elements/Breadcrumb";
import { Button, Modal } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { useState, useEffect } from "react";
import RenderRating from "../elements/RenderRating";

const OrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order || {};
  const [orderDetails, setOrderDetails] = useState([]);
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    description: "",
    productId: null,
  });

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
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const openFeedbackModal = (productId) => {
    setFeedback({ ...feedback, productId });
    setShowModal(true);
  };

  const closeFeedbackModal = () => {
    setShowModal(false);
    setFeedback({ rating: 0, description: "", productId: null });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const submitFeedback = () => {
    if (feedback.rating === 0 || feedback.description.trim() === "") {
      alert("Vui lòng nhập đủ thông tin đánh giá và mô tả sản phẩm.");
      return;
    }
    // Handle feedback submission logic here
    console.log(feedback);
    closeFeedbackModal();
  };

  return (
    <>
      <div className="container mx-auto min-h-screen">
        <Breadcrumbs headline={"Chi tiết đơn hàng"} />
        {/* order tracking here */}
        <div className="w-full flex flex-col items-center p-10 border rounded-xl">
          <div className="w-full flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                Chi tiết đơn hàng:{" "}
                <span className="text-blue-500">#{order.order._id}</span>
              </h1>
              <p className="text-lg">
                Hiển thị thông tin các sản phẩm bạn đã mua tại MomBabyMilk Shop
              </p>
            </div>
            <div>
              <Button color="light" size={"xl"} className="text-blue-500">
                {" "}
                <FaCartPlus className="text-xl mt-0.5 mx-2" /> Mua lại sản phẩm
              </Button>
            </div>
          </div>
          {/* order-info */}
          <div className="w-full flex items-start gap-10 border-b p-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
              <p className="text-md">Họ và tên: {order.order.full_name}</p>
              <p className="text-md">Số điện thoại: {order.order.phone}</p>
              <p className="text-md">Địa chỉ email: {order.order.email}</p>
              <p className="text-md">
                Địa chỉ giao hàng: {order.order.address}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              <p className="text-md">
                Ngày đặt: {formatDate(order.order.required_date)}
              </p>
              <p className="text-md">
                Ngày ship (dự kiến): {formatDate(order.order.shipped_date)}
              </p>
              <p className="text-md">
                Trạng thái đơn hàng:{" "}
                {order.order.status === 0
                  ? "Chờ xác nhận"
                  : order.order.status === 1
                  ? "Đã xác nhận - Đang giao"
                  : "Đã hoàn thành"}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Giá trị đơn hàng</h2>
              <p className="text-md">
                Tổng giá trị sản phẩm:{" "}
                {Number(order.order.total_price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              {order.order.member_id && (
                <p className="text-md">
                  Số điểm tích lũy:{" "}
                  {Number(order.order.total_price * 0.1).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
              )}
            </div>
          </div>
          {/* order detail */}
          <div className="w-full">
            {orderDetails.map((item) => (
              <div
                key={item.product_id}
                className="w-full flex flex-col md:flex-row rounded-lg border border-gray-200 bg-white p-4 shadow-sm mb-4 md:p-6"
              >
                <img
                  className="h-20 w-20 mr-4"
                  src={item.product.imgUrl}
                  alt={item.product.product_name}
                />
                <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {item.product.product_name}
                      </a>
                      <input
                        type="text"
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        value={`x${item.amount}`}
                        readOnly
                      />
                    </div>
                    <p className="text-base font-bold text-gray-900 dark:text-white mt-2">
                      {Number(item.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <Button
                    color="light"
                    size={"xl"}
                    className="text-blue-500 ml-auto mt-4 md:mt-0"
                    onClick={() => openFeedbackModal(item.product_id)}
                  >
                    <FcFeedback className="text-xl mt-0.5 mx-2" /> Đánh giá sản phẩm
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={closeFeedbackModal}>
        <Modal.Header className="text-xl font-semibold">Đánh giá sản phẩm: </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="block text-xl font-medium text-gray-700 dark:text-gray-200 mr-4">
                Đánh giá:
              </label>
              <RenderRating 
                rating={feedback.rating}
                onRatingChange={handleRatingChange}
              />
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                Mô tả sản phẩm:
              </label>
              <textarea
                name="description"
                className="mt-1 p-2 border rounded w-full"
                rows="5"
                value={feedback.description}
                onChange={handleFeedbackChange}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={submitFeedback}>
            Gửi đánh giá
          </Button>
          <Button color="gray" onClick={closeFeedbackModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetail;
