import React, { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
  Datepicker,
} from "flowbite-react";

import { fetchGetVoucherType, fetchUploadVoucher } from "../../data/api";
import { notification } from "antd";
const AddVoucher = () => {
  const [voucherTypes, setVoucherTypes] = useState([]);

  const [memberShip, setMemberShip] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [amount, setAmount] = useState(0);
  const [selectedVoucherType, setSelectedVoucherType] = useState("");

  const token = JSON.parse(localStorage.getItem("result"));
  const [profile, setProfile] = useState({
    expire_date: {
      day: "",
      month: "",
      year: "",
    },
  });
  useEffect(() => {
    // Gọi API để lấy dữ liệu category
    fetchGetVoucherType().then((res) => {
      console.log(res);
      if (res && res.data.result) {
        setVoucherTypes(res.data.result);
      }
    });
  }, []);

  const handleChangeSelectedVoucherType = (event) => {
    setSelectedVoucherType(event.target.value);
  };

  const handleChangeMemberShip = (event) => {
    setMemberShip(event.target.value);
  };
  const handleChangeDiscount = (event) => {
    setDiscount(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      expire_date: {
        ...profile.expire_date,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date =new Date();
    console.log(date);
    console.log(date.toISOString());
    console.log(date.toUTCString());
    date.setDate(profile.expire_date.day);
    date.setMonth(profile.expire_date.month - 1);
    date.setFullYear(profile.expire_date.year);
    const voucher = {
      voucher_type: Number(selectedVoucherType),
      membership: Number(memberShip),
      expire_date: date.toISOString(),
      discount: Number(discount),
      amount: Number(amount),
    };
    console.log(voucher);
    await fetchUploadVoucher(voucher, token)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl h-screen w-full">
      <h2 className="mb-8 text-3xl font-bold">Thêm mã giảm giá </h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        {/* row2 */}
        <div className="flex gap-8">
          {/* category */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Loại Voucher" />
            </div>

            <Select
              id="category"
              className="w-full rounded"
              onChange={handleChangeSelectedVoucherType}
              required
            >
              <option value="" disabled selected>
                Chọn Loại Voucher
              </option>
              {voucherTypes.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
          </div>

          {/*amount */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="amount" value="Số lượng" />
            </div>
            <TextInput
              id="amount"
              type="number"
              min={0}
              value={amount}
              name="amount"
              placeholder="Số lượng..."
              defaultValue={0}
              onChange={handleChangeAmount}
              required
            />
          </div>
        </div>

        {/* row3 */}
        <div className="flex gap-8">
          {/* price */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="memberShip" value="MemberShip" />
            </div>
            <TextInput
              id="memberShip"
              type="number"
              name="memberShip"
              placeholder="MemberShip..."
              min={0}
              value={memberShip}
              onChange={handleChangeMemberShip}
              required
            />
          </div>
          {/* discount */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Discount" />
            </div>
            <TextInput
              id="discount"
              type="number"
              min={0}
              name="discount"
              value={discount}
              placeholder="Mức giảm giá..."
              defaultValue={0}
              onChange={handleChangeDiscount}
              required
            />
          </div>
        </div>

        {/* row4 */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Mô Tả Sản Phẩm" />
          </div>
          <div>
            <label className="block text-gray-700">Ngày sinh</label>
            <div className="flex space-x-4">
              <select
                name="day"
                value={profile.expire_date.day}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn Ngày</option>
                {[...Array(31).keys()].map((day) => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select
                name="month"
                value={profile.expire_date.month}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn Tháng</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    Tháng {month + 1}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={profile.expire_date.year}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn Năm</option>
                {[...Array(120).keys()].map((year) => (
                  <option key={year + 1920} value={year + 1920}>
                    {year + 1920}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" className="mt-5">
          Thêm Sản Phẩm
        </Button>
      </form>
    </div>
  );
};

export default AddVoucher;
