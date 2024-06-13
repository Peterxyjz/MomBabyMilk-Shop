import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cover_imgedit from "../../assets/images/cover_imgedit.png";
import { Card } from 'primereact/card';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Checkbox } from "@mui/material";





const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorList, setErrorList] = useState([]);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [checked, setChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formValues;
    await axios
      .post(`http://localhost:4000/users/login-admin-staff`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("result", JSON.stringify(res.data.result));
        const isAdmin = res.data.isAdmin;
        isAdmin ? localStorage.setItem('isAuthenticatedAdmin', 'true') : localStorage.setItem('isAuthenticatedStaff', 'true');
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        let errorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };
  return (
    <>
      <div className="w-full h-screen flex">
        <div className="relative w-full h-full flex flex-col">
          <img src={cover_imgedit} alt="" className="absolute top-0 left-0 w-full h-full object-cover" />

          <Card title="Đăng nhập" subTitle="Staff & Admin Only" className="absolute top-[25%] left-[7%] flex flex-col bg-white p-8 rounded-lg shadow-lg w-[35rem]">
            <div className="w-full flex flex-col max-w-[500px]">
              <div>
                <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                  {/* <input
                    type="email"
                    placeholder="Nhập email..."
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  /> */}


                  <label htmlFor="email" className="font-bold block mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md p-2"
                  />
                  {/* <InputText variant="filled" keyfilter="email" className="w-full h-10 border border-gray-300 rounded-md p-2" type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange} /> */}
                  {/* <FloatLabel>
                    <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                    <label htmlFor="username">Username</label>
                  </FloatLabel> */}
                  {/* <input
                    type="password"
                    placeholder="Nhập mật khẩu..."
                    id="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  /> */}

                  <label htmlFor="password" className="font-bold block mb-2 mt-4">
                    Mật khẩu
                  </label>
                  <InputGroup>
                    <Input
                      className="w-full h-10 border border-gray-300 rounded-md p-2"
                      type={show ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='2.5rem'
                        size="sm"
                        onClick={handleClick}
                        fontSize={'1.5rem'}
                      >
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errorList.length > 0 && (
                    <div className="error-list mt-3 mb-3">
                      {errorList.map((error, index) => (
                        <p key={index} className="text-red-600">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="w-full flex items-center justify-between" style={{ marginTop: "20px" }}>
                    <div className="w-full flex items-center">
                     <Checkbox defaultChecked />
                      <p className="text-sm">   Ghi nhớ mật khẩu!</p>
                    </div>
                    <Link
                      to={"/forgot-password"}
                      className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"
                    >
                      Quên Mật Khẩu?
                    </Link>
                  </div>
                  <div className="w-full flex flex-col">
                    <button
                      type="submit"
                      className="w-full text-white my-4 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                    >
                      Đăng Nhập
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
