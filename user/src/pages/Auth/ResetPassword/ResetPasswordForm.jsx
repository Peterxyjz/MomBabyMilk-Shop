import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchResetPassword } from "../../../data/api";

const ResetPasswordForm = () => {
  const location = useLocation();
  const user_id = location.state?.user_id;
  const digit = location.state?.digit;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    password: "",
    confirm_password: "",
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
    const { password, confirm_password } = formValues;
    fetchResetPassword(user_id, digit, password, confirm_password)
      .then((res) => {
        alert(`${res.data.message}`);
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
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <p className="font-medium text-2xl text-gray-500 mt-4">
        Vui lòng điền mật khẩu mới!
      </p>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Mật Khẩu</label>
          <input
            className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Nhập mật khẩu..."
            type={"password"}
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Nhập Lại Mật Khẩu</label>
          <input
            className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Nhập lại mật khẩu..."
            type={"password"}
            id="confirm_password"
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
          />
        </div>
        {errorList.length > 0 && (
          <div className="error-list mt-3 mb-3">
            {errorList.map((error, index) => (
              <p key={index} className="text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
          >
            Xác Nhận
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
