import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FaSearch } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const handleSearch = () => {
    // Simulate an API call to get order details
    const mockOrderDetails = {
      orderNumber: '#1008',
      orderDate: '14 Jan.',
      total: '85.99 €',
      shipTo: 'Emily Morgan',
      orderStatus: 'Shipped',
      estimatedDelivery: '17 Jan. - 19 Jan.',
      trackingSteps: [
        { status: 'Order Placed', date: '14 Jan.', completed: true },
        { status: 'Dispatched', date: '14 Jan.', completed: true },
        { status: 'In Transit', date: '15 Jan.', completed: true },
        { status: 'Out for Delivery', date: '17 Jan.', completed: false },
        { status: 'Delivered', date: '17 Jan. - 19 Jan.', completed: false },
      ],
    };
    if (orderNumber === '1008') {
      setOrderDetails(mockOrderDetails);
    } else {
      toast.dismiss(); // dismiss any previous toasts before showing a new one
      toast.error('ID sản phẩm không hợp lệ');
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Order Tracking Page</h1>
        <div className="flex items-center mb-4 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="border p-3 h-12 rounded-l w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white h-12 p-3 rounded-r flex items-center justify-center"
          >
            <FaSearch className="w-6 h-6" />
          </button>
        </div>
        {orderDetails && (
          <div className="w-full">
            <div className="flex justify-center bg-gray-100 py-4">
              <div className="grid grid-cols-4 gap-4 text-center w-full max-w-4xl px-4">
                <div>
                  <p className="font-semibold">ORDER PLACED</p>
                  <p>{orderDetails.orderDate}</p>
                </div>
                <div>
                  <p className="font-semibold">TOTAL</p>
                  <p>{orderDetails.total}</p>
                </div>
                <div>
                  <p className="font-semibold">SHIP TO</p>
                  <p>{orderDetails.shipTo}</p>
                </div>
                <div>
                  <p className="font-semibold">ORDER</p>
                  <p>{orderDetails.orderNumber}</p>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">
                Order Status: <span className="text-green-500">{orderDetails.orderStatus}</span>
              </p>
              <p>Estimated Delivery Date: {orderDetails.estimatedDelivery}</p>
            </div>
            {orderDetails.trackingSteps && (
              <div className="flex justify-center mt-4">
                <div className="flex justify-between items-center w-full max-w-4xl">
                  {orderDetails.trackingSteps.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="flex-1 text-center relative">
                        <div
                          className={`w-8 h-8 rounded-full border-2 ${step.completed ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'
                            } mx-auto`}
                        >
                          <svg
                            className={`w-6 h-6 mx-auto text-white ${step.completed ? '' : 'opacity-0'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className={`mt-2 ${step.completed ? 'text-green-500' : 'text-gray-500'}`}>
                          {step.status}
                        </p>
                        <p className={`mt-1 ${step.completed ? 'text-green-500' : 'text-gray-500'}`}>
                          {step.date}
                        </p>
                      </div>
                      {index < orderDetails.trackingSteps.length - 1 && (
                        <div className="flex-1 flex items-center">
                          <div className="w-full h-0.5 bg-gray-300 mx-4"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderTracking;
