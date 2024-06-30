import React, { useEffect, useState } from "react";
import { Button, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { fetchGetVoucherType, fetchUploadVoucher } from "../../data/api";

const AddVoucher = () => {
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [memberShip, setMemberShip] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedVoucherType, setSelectedVoucherType] = useState("");
  const [isType, SetIsType] = useState(false);
  const token = JSON.parse(localStorage.getItem("result"));

  const date = new Date();
  const [dateInput, setDateInput] = useState(date);

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
    SetIsType(event.target.value === "0");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date_input = new Date(dateInput);
    const voucher = {
      voucher_type: Number(selectedVoucherType),
      membership: Number(memberShip),
      expire_date: date_input.toISOString(),
      discount: Number(discount),
      amount: Number(amount),
    };
    console.log(voucher);
    await fetchUploadVoucher(voucher, token)
      .then((res) => {
        console.log(res.data);
        alert("Them thanh cong");
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
              <Label htmlFor="category" value="Loại Voucher: " />
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

          {/* amount */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="amount" value="Số lượng: " />
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
          {/* membership */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label
                htmlFor="memberShip"
                value="MemberShip (Đổi bằng bao nhiêu điểm): "
              />
            </div>
            <TextInput
              id="memberShip"
              type="number"
              name="memberShip"
              placeholder="MemberShip..."
              min={0}
              value={memberShip}
              onChange={handleChangeMemberShip}
              readOnly={isType}
              required
            />
          </div>

          {/* discount */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="discount" value="Mức giảm giá (VND): " />
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
          <div>
            <label className="block mb-3">Ngày hết hạn: </label>
            <Datepicker
              language="vi"
              defaultDate={dateInput}
              onSelectedDateChanged={(date) => setDateInput(date)}
              required
            />
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
