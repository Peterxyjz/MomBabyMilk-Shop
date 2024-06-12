import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
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
    const { email, password } = formValues;
    await axios
      .post(`http://localhost:4000/users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("result", JSON.stringify(res.data.result));
        alert(`${res.data.message}`);
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
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Vui lòng điền thông tin của bạn!
      </p>
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              type={"email"}
              placeholder="Nhập email..."
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-lg font-medium">Mật Khẩu</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu..."
              type={"password"}
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base">Lưu mật khẩu</label>
            </div>
            <a
              className="font-medium text-base text-violet-500"
              href="/forgot-password"
            >
              Quên mật khẩu?
            </a>
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
              Đăng Nhập
            </button>
          </div>
        </form>

        <div>
           <Link 
            to="/register"
           
            className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-[rgba(0,0,0,0.2)] "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                fill="#EA4335"
              />
              <path
                d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                fill="#34A853"
              />
              <path
                d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                fill="#4A90E2"
              />
              <path
                d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                fill="#FBBC05"
              />
            </svg>
            Đăng Nhập Bằng Google
          </Link> 
        </div>

        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Không có tài khoản?</p>
          <a
            href="/register"
            className="ml-2 font-medium text-base text-violet-500"
          >
            Đăng Ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
