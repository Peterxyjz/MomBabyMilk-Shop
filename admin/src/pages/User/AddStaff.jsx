import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Datepicker, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button, Col, DatePicker, Row, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDistricts, getProvinces, getWards } from '../../data/api';
import moment from 'moment';




const AddStaff = () => {
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    // const category = {
    //   category_name: categoryName,
    //   description: description,

    // };
  }

  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceList = await getProvinces();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProvince();
  }, []);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const getDistrict = async (id) => {
      try {
        const districtList = await getDistricts(id);
        setDistricts(districtList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getDistrict();
  }, []);

  const [wards, setWards] = useState([]);
  useEffect(() => {
    const getWard = async () => {
      try {
        const wardList = await getWards();
        setWards(wardList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getWard();
  }, []);

  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });

  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });

    setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;

    setSelectedDistrict({ id, name });
    setWards(await getWards(Number(id)));
  };

  const handleWardSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedWard({ id, name });
  };

  const [date, setDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (date) => {
    setDate(date);
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '130vh' }}>
      <Card
        title="Thêm nhân viên mới"
        style={{ width: '60%', marginTop: '30px', height: '110vh' }}
      >
        <form onSubmit={handleSubmit}>
          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="fullname" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Họ và tên</label>
            </Col>
            <Col span={18}>
              <InputText
                id="fullname"
                type="text"
                className="w-full"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                name="fullname"
                placeholder="Nhập họ và tên"
                onChange={""}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="email" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Địa chỉ email</label>
            </Col>
            <Col span={18}>
              <InputText
                id="email"
                type="text"
                className="w-full border"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}

                name="email"
                placeholder="Nhập email"
                onChange={""}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="phone" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Số điện thoại</label>
            </Col>
            <Col span={18}>
              <InputMask
                id="phone"
                mask="999-999-9999"
                placeholder="Nhập số điện thoại"
                className="w-full border border-gray-300 rounded-md"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                name="phone"
                onChange={""}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Ngày sinh</label>
            </Col>
            <Col span={18}>
              <DatePicker
                 value={""}
                 onChange={handleChange}
                 placeholder="Nhập ngày sinh"
                 format="DD/MM/YYYY"
                 style={{ width: '100%', height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
              />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="province" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Tỉnh/Thành phố</label>
            </Col>
            <Col span={18}>
              <select
                id="province"
                onChange={handleProvinceSelect}
                className='w-full'
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="district" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Quận/Huyện</label>
            </Col>
            <Col span={18}>
              <select
                id="district"
                className=" w-full"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                onChange={handleDistrictSelect}
                required
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="ward" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Xã/Phường</label>
            </Col>
            <Col span={18}>
              <select
                id="ward"
                className="w-full"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                onChange={handleWardSelect}
                required
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.id} value={ward.id}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px' }}>
            <Col span={4}>
              <label htmlFor="address" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Địa chỉ cụ thể</label>
            </Col>
            <Col span={18}>
              <Textarea
                id="address"
                placeholder="Nhập địa chỉ cụ thể"
                onChange={""}
                style={{ width: '100%', border: '1px solid #6b7280', borderRadius: '0.375rem', height: '100px', fontSize: '15px', backgroundColor: '#F9F9F6' }}
                required
              />
            </Col>
          </Row>
          <br />
          <br />

          <Row justify="end" align="middle">
            <Col>
              <Button onClick={() => navigate(-1)} style={{ borderWidth: '2px', color: '#46B5C1', borderColor: '#46B5C1', height: '40px', fontSize: '15px', marginRight: '10px' }}>
                Quay về trang danh sách
              </Button>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#46B5C1', borderColor: '#46B5C1', height: '40px', fontSize: '15px' }}>
                Lưu nhân viên
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  )
}

export default AddStaff