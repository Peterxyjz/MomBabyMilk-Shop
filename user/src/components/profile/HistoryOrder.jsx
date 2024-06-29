import { FaFilter } from "react-icons/fa";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchOrder } from "../../data/api";

const HistoryOrder = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.product_name : "Unknown Product";
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrder(user._id);
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [user?._id]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Lịch sử đơn hàng</h1>
        <p>Hiển thị thông tin các sản phẩm bạn đã mua tại MomBabyMilk Shop</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Mã đơn hàng"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="text"
            placeholder="Số tiền từ"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="text"
            placeholder="Số tiền đến"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
            <FaFilter className="mr-2" />
            Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="w-1/24">Ngày đặt</Table.HeadCell>
              <Table.HeadCell className="w-1/12">Mã đơn hàng</Table.HeadCell>
              <Table.HeadCell className="w-1/2">Sản phẩm</Table.HeadCell>
              <Table.HeadCell className="w-1/12">Tổng tiền</Table.HeadCell>
              <Table.HeadCell className="w-1/6">Trạng thái</Table.HeadCell>
              <Table.HeadCell className="w-1/6">
                <span className="sr-only">Chi tiết</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((item) => (
                <Table.Row key={item.order._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {formatDate(item.order.required_date)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.order._id}
                  </Table.Cell>
                  <Table.Cell>
                    {item.order_detail.map((detail) => (
                      <p className="text-gray-900 mb-3" key={detail._id}>{getProductName(detail.product_id)}</p>
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    {Number(item.order.total_price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    {item.order.status === 0
                      ? "Chưa xác nhận"
                      : item.order.status === 1
                      ? "Đã xác nhận"
                      : "Hoàn thành"}
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Chi tiết
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
