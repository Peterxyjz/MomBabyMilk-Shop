import { FaFilter } from "react-icons/fa";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchOrder } from "../../data/api";
import { Link } from "react-router-dom";
import Loader from "../../assets/loading2.gif";

const HistoryOrder = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    orderId: "",
    minPrice: "",
    maxPrice: "",
    fromDate: "",
    toDate: ""
  });
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
        setFilteredOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [user?._id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilter = () => {
    let updatedOrders = [...orders];

    if (filters.orderId) {
      updatedOrders = updatedOrders.filter((item) =>
        item.order._id.includes(filters.orderId)
      );
    }

    if (filters.minPrice) {
      updatedOrders = updatedOrders.filter(
        (item) => item.order.total_price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      updatedOrders = updatedOrders.filter(
        (item) => item.order.total_price <= Number(filters.maxPrice)
      );
    }

    if (filters.fromDate) {
      updatedOrders = updatedOrders.filter(
        (item) => new Date(item.order.required_date) >= new Date(filters.fromDate)
      );
    }

    if (filters.toDate) {
      updatedOrders = updatedOrders.filter(
        (item) => new Date(item.order.required_date) <= new Date(filters.toDate)
      );
    }

    setFilteredOrders(updatedOrders);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }

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
            name="orderId"
            value={filters.orderId}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="number"
            placeholder="Số tiền từ"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="number"
            placeholder="Số tiền đến"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
            onClick={handleFilter}
          >
            <FaFilter className="mr-2" />
            Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="border">
            <Table.Head>
              <Table.HeadCell className="w-1/24 border">
                Ngày đặt
              </Table.HeadCell>
              <Table.HeadCell className="w-1/24 border">
                Mã đơn hàng
              </Table.HeadCell>
              <Table.HeadCell className="w-5/12 border">
                Sản phẩm
              </Table.HeadCell>
              <Table.HeadCell className="w-2/12 border">
                Tổng tiền
              </Table.HeadCell>
              <Table.HeadCell className="w-3/12 border">
                Trạng thái
              </Table.HeadCell>
              <Table.HeadCell className="w-2/12 border">
                <span className="sr-only">Chi tiết</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((item) => (
                  <Table.Row
                    key={item.order._id}
                    className="bg-white  border"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                      {formatDate(item.order.required_date)}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                      {item.order._id}
                    </Table.Cell>
                    <Table.Cell className="border">
                      {item.order_detail.map((detail) => (
                        <p className="text-gray-900 mb-3" key={detail._id}>
                          {getProductName(detail.product_id)}
                        </p>
                      ))}
                    </Table.Cell>
                    <Table.Cell className="border">
                      {Number(item.order.total_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Table.Cell>
                    <Table.Cell className="border">
                      {item.order.status === 0
                        ? "Chưa xác nhận"
                        : item.order.status === 1
                          ? "Đã xác nhận"
                          : "Hoàn thành"}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to="/order-detail"
                        state={{ order: item }}
                        className="font-medium text-cyan-600 hover:underline"
                      >
                        Chi tiết
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center">
                    Bạn chưa mua đơn hàng nào hết!
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
