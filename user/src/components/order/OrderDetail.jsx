import { useLocation } from "react-router-dom"
import Breadcrumbs from "../elements/Breadcrumb";

// const OrderDetail = () => {
//     const location = useLocation();
//     const order = location.state?.order;
const OrderDetail = () => {
  const order = {
    id: '6914463',
    date: '2024-03-14 00:15:37',
    status: 'Đã xử lý',
    email: 'huy09@gmail.com',
    total: 18000,
    vipDiscount: 180,
    items: [
      {
        name: 'Random Code Steam',
        quantity: 2,
        price: 18000,
        keys: ['CAAPL-278FC-K8P4J', 'XWV9C-NFEAY-6NEPW'],
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto min-h-screen">
        <Breadcrumbs headline={"Chi tiết đơn hàng"} />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Chi tiết đơn hàng #{order.id}</h2>
        <p className="mb-4">Hiển thị thông tin các sản phẩm bạn đã mua tại Divine Shop</p>
        <div className="border-t border-b py-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Thông tin đơn hàng</h3>
              <p>Mã đơn hàng: #{order.id}</p>
              <p>Ngày tạo: {order.date}</p>
              <p>Trạng thái đơn hàng: <span className="text-green-500">{order.status}</span></p>
              <p>Người nhận: {order.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Giá trị đơn hàng</h3>
              <p>Tổng giá trị sản phẩm: {order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              <p>Thưởng tiền khách Vip Bạc (1%): {order.vipDiscount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
          </div>
        </div>
        {order.items.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key game</h4>
              {item.keys.map((key, keyIndex) => (
                <div key={keyIndex} className="flex items-center mb-2">
                  <input type="text" readOnly value={key} className="border p-2 rounded flex-1 mr-2" />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">Hướng dẫn nhập key game</button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Mua lại đơn hàng</button>
      </div>
    </>
  )
}

export default OrderDetail