import React, { useEffect, useState } from "react";
import { fetchDeleteVoucher, fetchGetVoucher } from "../../data/api";
import { Button, Datepicker, Select, TextInput } from "flowbite-react";
import { fetchGetVoucherType, fetchUpdateVoucher } from "../../data/api";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const token = JSON.parse(localStorage.getItem("result"));

  useEffect(() => {
    const getVouchers = async () => {
      const data = await fetchGetVoucher();
      setVouchers(data);
      setLoading(false);
    };

    getVouchers();

    fetchGetVoucherType().then((res) => {
      if (res && res.data.result) {
        setVoucherTypes(res.data.result);
      }
    });
  }, []);

  const toggleModal = (voucher = null) => {
    setSelectedVoucher(voucher);
    setShowModal(!showModal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date_input = new Date(selectedVoucher.expire_date);
    date_input.setDate(date_input.getDate() + 1);
    const updatedVoucher = {
      ...selectedVoucher,
      voucher_type: Number(selectedVoucher.voucher_type),
      membership: Number(selectedVoucher.membership),
      expire_date: date_input.toISOString(),
      discount: Number(selectedVoucher.discount),
      amount: Number(selectedVoucher.amount),
    };
    console.log(updatedVoucher);
    await fetchUpdateVoucher(updatedVoucher, token, selectedVoucher._id)
      .then((res) => {
        console.log(res.data);
        alert("Cập nhật thành công");
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (voucherId) => {
    await fetchDeleteVoucher( voucherId, token)
      .then((res) => {
        alert("Xóa thanh cong");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher._id} className="bg-white border-b hover:bg-gray-50 ">
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
                      onClick={() => toggleModal(voucher)}
                    >
                      Chỉnh sửa
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(voucher._id)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Edit */}
          {showModal && selectedVoucher && (
            <div
              id="editUserModal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
            >
              <div className="relative w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <form className="relative bg-white rounded-lg shadow " onSubmit={handleSubmit}>
                  {/* Modal header */}
                  <div className="flex items-start justify-between p-4 border-b rounded-t ">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      Chỉnh sửa mã voucher
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
                          htmlFor="category"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Loại Voucher
                        </label>
                        <Select
                          id="category"
                          className="w-full rounded"
                          onChange={(e) =>
                            setSelectedVoucher({
                              ...selectedVoucher,
                              voucher_type: e.target.value,
                            })
                          }
                          value={selectedVoucher.voucher_type}
                          required
                        >
                          <option value="" disabled>
                            Chọn Loại Voucher
                          </option>
                          {voucherTypes.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="amount"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Số lượng
                        </label>
                        <TextInput
                          id="amount"
                          type="number"
                          min={0}
                          value={selectedVoucher.amount}
                          name="amount"
                          placeholder="Số lượng..."
                          onChange={(e) =>
                            setSelectedVoucher({
                              ...selectedVoucher,
                              amount: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="memberShip"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          MemberShip (Đổi bằng bao nhiêu điểm)
                        </label>
                        <TextInput
                          id="memberShip"
                          type="number"
                          name="memberShip"
                          placeholder="MemberShip..."
                          min={0}
                          value={selectedVoucher.membership}
                          onChange={(e) =>
                            setSelectedVoucher({
                              ...selectedVoucher,
                              membership: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="discount"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Mức giảm giá (VND)
                        </label>
                        <TextInput
                          id="discount"
                          type="number"
                          min={0}
                          name="discount"
                          value={selectedVoucher.discount}
                          placeholder="Mức giảm giá..."
                          onChange={(e) =>
                            setSelectedVoucher({
                              ...selectedVoucher,
                              discount: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="expire_date"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Ngày hết hạn
                        </label>
                        <Datepicker
                          language="vi"
                          defaultDate={new Date(selectedVoucher.expire_date)}
                          onSelectedDateChanged={(date) =>
                            setSelectedVoucher({
                              ...selectedVoucher,
                              expire_date: date,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b ">
                    <Button type="submit" className="text-white bg-blue-700 hover:bg-blue-800">
                      Lưu thay đổi
                    </Button>
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
