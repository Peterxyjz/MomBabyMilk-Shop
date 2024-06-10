import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import coverImg from "../../assets/images/cover_img.png";

const LoginPage = () => {
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
      .post(`http://localhost:4000/users/login-admin-staff`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("result", JSON.stringify(res.data.result));
        const isAdmin = res.data.isAdmin;
        isAdmin ? localStorage.setItem('isAuthenticatedAdmin', 'true') : localStorage.setItem('isAuthenticatedStaff', 'true');
        navigate("/ecommerce");
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
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <div className="absolute top-[25%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-black font-bold my-4">
              Turn Your Ideas into reality
            </h1>
            <p className="text-xl  text-black font-normal">
              Start for free sjdhjkasdhjkwdnushdwmhxcncxhnqwmshnuq{" "}
            </p>
          </div>
          <img src={coverImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-10 px-14 justify-between">
          <h1 className="text-xl text-[#060606] font-semibold">
            MomBabyMilk Shop - Admin & Staff
          </h1>

          <div className="w-full flex flex-col max-w-[500px]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2">Đăng Nhập</h3>
              <p className="text-sm mb-2">Vui lòng điền thông tin của bạn!</p>
            </div>

            <div>
              <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Nhập email..."
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />

                <input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
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
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className="text-sm">Ghi nhớ mật khẩu!</p>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 "
                  >
                    Quên Mật Khẩu?
                  </Link>
                </div>

                <div className="w-full flex flex-col">
                  <button 
                  type="submit"
                  className="w-full text-white my-4 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
                    Đăng Nhập
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Staff & Admin Only
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
