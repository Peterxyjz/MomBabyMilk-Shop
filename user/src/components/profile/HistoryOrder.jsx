import { FaFilter } from "react-icons/fa";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchGetOrder } from "../../data/api";
const HistoryOrder = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchGetOrder();
        orderData.forEach(element => {
          if(element.member_id === user._id){
            setOrders((orders) => [...orders, element]);
          }
        });
        setLoading(false);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getOrders();
  }, []);
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
              <Table.HeadCell>Thời gian</Table.HeadCell>
              <Table.HeadCell>Mã đơn hàng</Table.HeadCell>
              <Table.HeadCell>Sản phẩm</Table.HeadCell>
              <Table.HeadCell>Tổng tiền</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Chi tiết</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {'Apple MacBook Pro 17"'}
                </Table.Cell>
                <Table.Cell>Sliver</Table.Cell>
                <Table.Cell>Laptop</Table.Cell>
                <Table.Cell>$2999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Microsoft Surface Pro
                </Table.Cell>
                <Table.Cell>White</Table.Cell>
                <Table.Cell>Laptop PC</Table.Cell>
                <Table.Cell>$1999</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Magic Mouse 2
                </Table.Cell>
                <Table.Cell>Black</Table.Cell>
                <Table.Cell>Accessories</Table.Cell>
                <Table.Cell>$99</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
