import React, { useEffect, useState } from "react";
import { fetchGetVoucher } from "../../data/api";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getVouchers = async () => {
      const data = await fetchGetVoucher();
      setVouchers(data);
      setLoading(false);
    };

    getVouchers();
  }, []);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <h2 className="text-3xl font-bold">Tất cả voucher </h2>
        <hr className="my-4" />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Mã Voucher
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày hết hạn
                </th>
                <th scope="col" className="px-6 py-3">
                  Membership
                </th>
                <th scope="col" className="px-6 py-3">
                  Mức giảm giá (VND)
                </th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Loại Voucher
                </th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr className="bg-white border-b hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {voucher._id}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{voucher.expire_date}</td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(voucher.membership)}
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(voucher.discount)}
                  </td>
                  <td className="px-6 py-4">
                    {voucher.amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {voucher.voucher_type === 0 ? "User" : "Member"}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:underline"
                      onClick={toggleModal}
                    >
                      Chỉnh sửa
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Edit user modal */}
          {showModal && (
            <div
              id="editUserModal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
            >
              <div className="relative w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <form className="relative bg-white rounded-lg shadow ">
                  {/* Modal header */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t ">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      Edit user
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                      onClick={toggleModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="Bonnie"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="Green"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="example@company.com"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone-number"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Phone Number
                        </label>
                        <input
                          type="number"
                          name="phone-number"
                          id="phone-number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="e.g. +(12)3456 789"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="department"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          name="department"
                          id="department"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="Development"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="company"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Company
                        </label>
                        <input
                          type="number"
                          name="company"
                          id="company"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="123456"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="current-password"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="current-password"
                          id="current-password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="new-password"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new-password"
                          id="new-password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Save all
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Vouchers;
