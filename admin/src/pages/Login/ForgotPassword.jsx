import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cover_imgedit from "../../assets/images/cover_imgedit.png";
import { Card } from 'primereact/card';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { fetchForgotPassword } from "../../data/api";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: ""
  });
  const [errorList, setErrorList] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = formValues;
    console.log(email);
    await fetchForgotPassword( email)
      .then((res) => {
        const user_id = res.data.user_id;
        navigate("/otp", { state: { email, user_id } });
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

          <Card title="Quên mật khẩu" subTitle="Staff & Admin Only" className="absolute top-[25%] left-[7%] flex flex-col bg-white p-8 rounded-lg shadow-lg w-[35rem]">
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
                    className="w-full h-10 border border-gray-300 rounded-md p-2"
                  />
                  {errorList.length > 0 && (
                    <div className="error-list mt-3 mb-3">
                      {errorList.map((error, index) => (
                        <p key={index} className="text-red-600">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="w-full flex items-center justify-end mt-3">
                    <Link
                      to={"/login"}
                      className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 "
                    >
                      Đăng Nhập
                    </Link>
                  </div>
                  <div className="w-full flex flex-col">
                    <button
                      type="submit"
                      className="w-full text-white my-4 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
                      Gửi Mã OTP
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

export default ForgotPassword;
