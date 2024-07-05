import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../elements/Breadcrumb";
import { Button, Modal } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa6";
import { FcFeedback } from "react-icons/fc";
import { useState, useEffect } from "react";
import RenderRating from "../elements/RenderRating";
import { fetchGetFeedbackByUser, fetchUploadFeedback } from "../../data/api";
import toast from "react-hot-toast";
const OrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order || {};
  const [orderDetails, setOrderDetails] = useState([]);
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    description: "",
    product_id: null,
  });
  const token = JSON.parse(localStorage.getItem("result"));
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?._id;
  const member_id = order.order.member_id;
  const checkMember = user_id === member_id ? true : false;
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

    if (checkMember) {
      const getReviews = async () => {
        await fetchGetFeedbackByUser(user_id)
          .then((res) => {
            setReviews(res.data.result.map((review) => review.product_id));
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getReviews();
    }
  }, []);

  const checkFeedbacked = (product_id) => {
    return reviews.includes(product_id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  };

  const openFeedbackModal = (product_id) => {
    setFeedback({ ...feedback, product_id });
    setShowModal(true);
  };

  const closeFeedbackModal = () => {
    setShowModal(false);
    setFeedback({ rating: 0, description: "", product_id: null });
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const submitFeedback = async () => {
    if (feedback.rating === 0 || feedback.description.trim() === "") {
      toast.error("Vui lòng nhập đủ thông tin đánh giá và mô tả sản phẩm.");
      return;
    }
    await fetchUploadFeedback(feedback, token)
      .then(() => {
        toast.success("Đánh giá cho sản phẩm thành công!");
      })
      .catch((err) => {
        console.log(err);
      });
    closeFeedbackModal();
  };

  return (
    <>
      <div className="container mx-auto my-10">
        <Breadcrumbs headline={"Chi tiết đơn hàng"} />
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
                <FaCartPlus className="text-xl mt-0.5 mx-2" /> Mua lại sản phẩm
              </Button>
            </div>
          </div>
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
              {order.order.status === 2 && (
                <p className="text-md">
                  Ngày ship: {formatDate(order.order.shipped_date)}
                </p>
              )}
              <p className="text-md">
                Trạng thái đơn hàng:{" "}
                <span className="font-semibold">
                  {
                    ["Chờ xác nhận", "Đã xác nhận", "Đã hoàn thành"][
                      order.order.status
                    ]
                  }
                </span>
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
              {checkMember && order.order.status === 2 && (
                <p className="text-md">
                  Số điểm tích lũy:{" "}
                  {Number(order.order.total_price * 0.01).toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )}
                </p>
              )}
            </div>
          </div>
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
                      <Link
                        to={"/product"}
                        state={{ product: item.product }}
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {item.product.product_name}
                      </Link>
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
                  {checkMember &&
                    order.order.status === 2 &&
                    (!checkFeedbacked(item.product_id) ? (
                      <Button
                        color="light"
                        size={"xl"}
                        className="text-blue-500 ml-auto mt-4 md:mt-0"
                        onClick={() => openFeedbackModal(item.product_id)}
                      >
                        <FcFeedback className="text-xl mt-0.5 mx-2" /> Đánh giá
                        sản phẩm
                      </Button>
                    ) : (
                      <Button
                        color="light"
                        size={"xl"}
                        className="text-screen-500 ml-auto mt-4 md:mt-0"
                        disabled
                      >
                        <FcFeedback className="text-xl mt-0.5 mx-2" /> Đã đánh
                        giá sản phẩm
                      </Button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={closeFeedbackModal}>
        <Modal.Header className="text-xl font-semibold">
          Đánh giá sản phẩm:
        </Modal.Header>
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
