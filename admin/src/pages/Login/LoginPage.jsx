import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cover_imgedit from "../../assets/images/cover_imgedit.png";
import { Card } from 'primereact/card';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Checkbox } from "@mui/material";
import { fetchLogin } from "../../data/api";





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
    await fetchLogin(email, password)
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
      <div className="w-full min-h-screen flex items-center justify-center relative">
        <img src={cover_imgedit} alt="" className="absolute top-0 left-0 w-full h-full object-cover" />

        <div className="relative w-full h-full flex items-center justify-center px-4 sm:justify-start sm:px-0">
          <Card title="Đăng nhập" subTitle="Staff & Admin Only" className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-[35rem] sm:ml-28">
            <div className="w-full flex flex-col max-w-[500px]">
              <div>
                <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="font-bold block mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full h-12 border-2 border-[rgba(0,0,0,0.2)] rounded-xl"
                    placeholder="Nhập địa chỉ email"
                    type="email"
                  />
                  <label htmlFor="password" className="font-bold block mb-2 mt-4">
                    Mật khẩu
                  </label>
                  <InputGroup className="relative flex items-center w-full">
                    <Input
                      className="w-full h-12 border-2 border-[rgba(0,0,0,0.2)] rounded-xl pr-16" // add padding to the right to make space for the button
                      type={show ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu"
                    />
                    <InputRightElement className="absolute mr-3 h-full flex items-center justify-center pr-2">
                      <Button
                        h="2.5rem"
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
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4">
                    <div className="w-full flex items-center space-x-2">
                      <Checkbox />
                      <p className="text-sm m-0">Ghi nhớ mật khẩu!</p>
                    </div>
                    <Link
                      to={"/forgot-password"}
                      className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-2 sm:mt-0"
                    >
                      Quên Mật Khẩu?
                    </Link>
                  </div>
                  <div className="w-full flex flex-col mt-4">
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
