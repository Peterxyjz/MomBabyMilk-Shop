import { Button, Label } from 'flowbite-react'
import { Dropdown } from 'primereact/dropdown'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar';

const AddBill = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const todayDate = new Date();
    setToday(todayDate);
  }, []);

  const milkBrands = [
    { label: 'Vinamilk', value: 'vinamilk' },
    { label: 'TH', value: 'th' },
    { label: 'Dutch Lady', value: 'dutch_lady' },
    { label: 'Nutifood', value: 'nutifood' },
    // Add more options as needed
  ];

  const handleChange = (e) => {
    setSelectedBrand(e.value);
    console.log('Selected brand:', e.value); // Debugging output
  };


  return (
    <div>    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h2 className="mb-8 text-3xl font-bold">Tạo đơn nhập hàng</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={""}
      >
        {/* row1 */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="proName" value="Tên sản phẩm" />
            </div>
            <InputText
              id="proName"
              type="text"
              className=" w-full border border-gray-300 rounded-md"
              name='proName'
              placeholder="Nhập tên sản phẩm"
              onChange={""}
              required />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="amount" value="Số lượng" />
            </div>
            <InputText
              keyfilter="int"
              id="amount"
              type="text"
              className=" w-full border border-gray-300 rounded-md"
              name="amount"
              placeholder="Nhập số lượng sản phẩm"
              onChange={""}
              required />
          </div>
        </div>

        {/* row2 */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="" value="Chọn nhãn hàng" />
            </div>
            <Dropdown
              value={selectedBrand}
              options={milkBrands}
              onChange={handleChange}
              placeholder="Chọn nhãn hàng"
              className="w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Ngày tạo đơn" />
            </div>
            <Calendar
              value={today}
              disabled 
              showTime hourFormat="24"
              
              className='w-full'
              inputClassName="w-full border border-gray-300 rounded-md"
              style={{height: '60%'}}
            />

          </div>
        </div>

        <Button type="submit" className="mt-5">
          Tạo đơn
        </Button>
      </form >
    </div ></div>
  )
}

export default AddBill