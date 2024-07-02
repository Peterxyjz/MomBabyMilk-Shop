import { useLocation } from "react-router-dom";
import Breadcrumbs from "../elements/Breadcrumb";
import { Button } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa6";
const OrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order || {};
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
  return (
    <>
      <div className="container mx-auto min-h-screen">
        <Breadcrumbs headline={"Chi tiết đơn hàng"} />
        {/* order tracking here */}
        <div className="w-full flex flex-col items-center p-10 border rounded-xl">
          <div className="w-full flex justify-between items-center">
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
          <hr className="my-4" />
          {/* order-info */}
          <div className="w-full flex items-start gap-10">
            <div>
              <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
              <p className="text-md">Họ và tên khách hàng: {order.order.full_name}</p>
              <p className="text-md">Số điện thoại: {order.order.phone}</p>
              <p className="text-md">Địa chỉ email: {order.order.email}</p>
              <p className="text-md">Địa chỉ giao hàng: {order.order.address}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Thông tin đơn hàng</h2>
              <p className="text-md">Ngày đặt: {formatDate(order.order.required_date)}</p>
              <p className="text-md">Ngày ship (dự kiến): {formatDate(order.order.shipped_date)}</p>
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
                  {Number(order.order.total_price * 0.1).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}
            </div>
          </div>
          <hr className="my-4" />
          {/* order detail */}
          
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
