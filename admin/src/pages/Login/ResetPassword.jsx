import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import coverImg from "../../assets/images/cover_img.png";
import cover_imgedit from "../../assets/images/cover_imgedit.png";
import { Card } from "primereact/card";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Checkbox } from "@mui/material";
import { fetchResetPassword } from "../../data/api";

const ResetPassword = () => {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const digit = location.state?.digit;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    password: "",
    confirm_password: "",
  });
  const [errorList, setErrorList] = useState([]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  console.log("reset: " + user_id, digit);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirm_password } = formValues;
    await fetchResetPassword({ user_id, digit, password, confirm_password })
      .then((res) => {
        navigate("/login");
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
          <img
            src={cover_imgedit}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <Card
            title="Đặt lại mật khẩu"
            subTitle="Staff & Admin Only"
            className="absolute top-[25%] left-[7%] flex flex-col bg-white p-8 rounded-lg shadow-lg w-[35rem]"
          >
            <div className="w-full flex flex-col max-w-[500px]">
              <div>
                <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                  <label
                    htmlFor="password"
                    className="font-bold block mb-2 mt-4"
                  >
                    Mật khẩu mới
                  </label>
                  <InputGroup>
                    <Input
                      className="w-full h-10 border border-gray-300 rounded-md p-2"
                      type={show ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="2.5rem"
                        size="sm"
                        onClick={handleClick}
                        fontSize={"1.5rem"}
                      >
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <label
                    htmlFor="confirm_password"
                    className="font-bold block mb-2 mt-4"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <InputGroup>
                    <Input
                      className="w-full h-10 border border-gray-300 rounded-md p-2"
                      type={"password"}
                      id="confirm_password"
                      name="confirm_password"
                      value={formValues.confirm_password}
                      onChange={handleChange}
                    />
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
                  <div className="w-full flex flex-col">
                    <button
                      type="submit"
                      className="w-full text-white my-4 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                    >
                      Xác Nhận
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

export default ResetPassword;
