import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Textarea } from 'flowbite-react';
import { InputMask } from 'primereact/inputmask';
import { Card } from 'primereact/card';
import { Col, DatePicker, Row, notification, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchUploadStaff, getDistricts, getProvinces, getWards } from '../../data/api';
import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';




const AddStaff = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("result"));
  // const [province, setProvince] = useState('');
  // const [district, setDistrict] = useState('');
  // const [ward, setWard] = useState('');
  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const isoDate = date ? date.toISOString() : null;

    const staff = {
      full_name: fullname,
      email: email,
      date_of_birth: isoDate,
      password: password,
      confirm_password: confirmPassword,
      country: 'Việt Nam',
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address: address + ', ' + selectedWard.name + ', ' + selectedDistrict.name + ', ' + selectedProvince.name,
      phone: phone,
      membership: 0,
      username: username,

      updated_at: new Date().toISOString(),
    };

    // Ensure passwords match before submitting
    if (password !== confirmPassword) {
      notification.error({
        message: "Mật khẩu và xác nhận mật khẩu không khớp!",
        placement: "top",
      });
      return;
    }

    console.log(staff);

    // Send data to the database:
    await fetchUploadStaff(staff, token)
      .then(async (res) => {
        const id = res.data.result.insertedId;
        // You can add more actions here if needed, e.g., upload avatar image
      })
      .then(() => {
        notification.success({
          message: "Thêm nhân viên thành công!",
          placement: "top",
        });
        // form.reset();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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



  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });
    console.log(selectedProvince);

    setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    console.log(selectedDistrict);

    setSelectedDistrict({ id, name });
    setWards(await getWards(Number(id)));
  };

  const handleWardSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    console.log(selectedWard);
    setSelectedWard({ id, name });
  };


  const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date); // Cập nhật trạng thái với giá trị mới

  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <Card
        title="Thêm nhân viên mới"
        style={{ width: '90%', maxWidth: '800px', margin: '30px auto', minHeight: '70vh' }}
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
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="username" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Tên người dùng</label>
            </Col>
            <Col span={18}>
              <InputText
                id="username"
                type="text"
                className="w-full"
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                name="username"
                placeholder="Nhập tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="password" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Mật khẩu</label>
            </Col>
            <Col span={18}>
              <InputGroup>
                <Input
                  className='w-full'
                  style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
                <InputRightElement width='4.5rem'>
                  <Button h='3rem'
                    size="sm"
                    onClick={handleShowPasswordClick}
                    fontSize={'1.5rem'}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="confirm_password" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Xác nhận mật khẩu</label>
            </Col>
            <Col span={18}>
              <InputGroup>
                <Input
                  className='w-full'
                  style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu"
                />
                <InputRightElement width='4.5rem'>
                  <Button h='3rem'
                    onClick={handleShowConfirmPasswordClick}
                    fontSize={'1.5rem'}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Ngày sinh</label>
            </Col>
            <Col span={18}>
              <DatePicker
                value={date}
                placeholder="Nhập ngày sinh"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                style={{ width: '100%', height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                required
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
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', border: '1px solid #6b7280', borderRadius: '0.375rem', height: '100px', fontSize: '15px', backgroundColor: '#F9F9F6' }}
                required
                value={address}
              />
            </Col>
          </Row>
          <br />
          <Row justify="end" align="middle">
            <HStack spacing={10}>
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  borderWidth: '2px',
                  color: '#46B5C1',
                  borderColor: '#46B5C1',
                  height: '40px',
                  fontSize: '15px',
                  padding: '0 20px', // Increased padding
                  borderRadius: '10px', // Rounded corners
                  marginRight: '10px',
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: '#46B5C1',
                  borderColor: '#46B5C1',
                  height: '40px',
                  fontSize: '15px',
                  color: 'white',
                  padding: '0 20px', // Increased padding
                  borderRadius: '10px', // Rounded corners
                }}
              >
                Lưu nhân viên
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  )
}

export default AddStaff