import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button, Datepicker, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Province from '../../components/Address/Province';
import District from '../../components/Address/District';
import Ward from '../../components/Address/Ward';

const AddStaff = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h2 className="mb-8 text-3xl font-bold">Thêm nhân viên</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={""}
      >
        {/* row1 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="fullname" value="Họ và tên" />
            </div>
            <InputText
              id="fullname"
              type="text"
              className="w-full border border-gray-300 rounded-md"
              name="fullname"
              placeholder="Nhập họ và tên"
              onChange={""}
              required />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="email" value="Email" />
            </div>
            <InputText
              id="email"
              type="text"
              className="w-full border border-gray-300 rounded-md"
              name="email"
              placeholder="Nhập email"
              onChange={""}
              required />
          </div>
        </div>

        {/* row2 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="phone" value="Số điện thoại" />
            </div>
            <InputMask
              id="phone"
              mask="999-999-9999"
              placeholder="Nhập số điện thoại"
              className="w-full border border-gray-300 rounded-md"
              name="phone"
              onChange={""}
              required />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="dob" value="Ngày sinh" />
            </div>
            <Calendar
              value={""}
              onChange={""}
              dateFormat="dd/mm/yy"
              className='w-full'
              inputClassName="w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* row3 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="province" value="Tỉnh/Thành phố" />
            </div>
            {/* <Province onProvinceChange={setSelectedProvince} /> */}
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="district" value="Quận/Huyện" />
            </div>
            {/* {selectedProvince && (
              <District
                provinceCode={selectedProvince}
                onDistrictChange={setSelectedDistrict}
              />
            )} */}
          </div>
        </div>

        {/* row4 */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="ward" value="Phường/Xã" />
            </div>
            {/* {selectedDistrict && (
              <Ward
                districtCode={selectedDistrict}
                onWardChange={setSelectedWard}
              />
            )} */}
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2">
              <Label htmlFor="address" value="Địa chỉ cụ thể" />
            </div>
            <InputText
              id="address"
              type="text"
              className="w-full border border-gray-300 rounded-md"
              name="address"
              placeholder="Nhập địa chỉ cụ thể"
              onChange={""}
              required 
              style={{ height: '60%' }}/>
          </div>
        </div>

        <Button type="submit" className="mt-5 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700">
          Thêm nhân viên
        </Button>
      </form>
    </div>
  )
}

export default AddStaff