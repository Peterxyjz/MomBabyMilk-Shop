import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { fetchOrder } from "../../data/api";
const CompleteOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrder();
        setOrders(orderData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) {
    return <div className="w-full h-full mx-6 py-6">Loading...</div>;
  }
  return (
    <div className="w-full h-full mx-6 py-6">
      <h1 className="text-3xl text-bold">Đang chờ xác nhận</h1>

      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Mã Đơn Hàng</Table.HeadCell>
            <Table.HeadCell>Ngày Đặt</Table.HeadCell>
            <Table.HeadCell>Phương Thức Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Trạng Thái</Table.HeadCell>
            <Table.HeadCell>
              <Table.HeadCell>Chi Tiết Đơn Hàng</Table.HeadCell>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y text-center">
            {orders.map(          
              (item) =>
                item.order.status === 2 && (
                  <Table.Row
                    key={item.order._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {item.order._id}
                    </Table.Cell>
                    <Table.Cell>{item.order.required_date}</Table.Cell>
                    <Table.Cell>Thanh toán - {item.order.payment_method}</Table.Cell>
                    <Table.Cell>Hoàn Thành</Table.Cell>
                    <Table.Cell className="text-center">
                      <Link
                        to={"/order-detail"}
                        state={{order: item}}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Chi Tiết
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default CompleteOrder;
