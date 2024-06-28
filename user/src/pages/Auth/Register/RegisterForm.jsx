import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
import { fetchRegister } from "../../../data/api.jsx";
const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
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

    const { username, email, password, confirm_password } = formValues;
    console.log(username, email, password, confirm_password);
    await  fetchRegister({
      username,
      email,
      password,
      confirm_password,
    })
      .then((res) => {
        alert(`${res.data.message}`);
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("result", JSON.stringify(res.data.result));
        navigate("/otp", {
          state: { navigateTo: "/profile", email, user_id: res.data.user._id },
        });
      })
      .catch((error) => {
        let errorList = [];
        for (let value of Object.values(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };
  return (
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <h1 className="text-5xl font-semibold">Welcome</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Vui lòng điền thông tin của bạn!
      </p>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="w-full flex gap-3">
          <div className="w-1/3 flex flex-col">
            <label className="text-lg font-medium">Tên Tài Khoản</label>
            <input
              className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Nhập tên tài khoản..."
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="w-2/3 flex flex-col">
            <label className="text-lg font-medium">Địa Chỉ Email</label>
            <input
              className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent border-[rgba(0,0,0,0.2)]"
              placeholder="Nhập email..."
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Mật Khẩu</label>
          <input
            className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Nhập mật khẩu..."
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            type={"password"}
          />
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Nhập Lại Mật Khẩu</label>
          <input
            className="w-full border-2 border-[rgba(0,0,0,0.2)] rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Nhập lại mật khẩu..."
            id="confirm_password"
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
            type={"password"}
          />
        </div>
        {/* hien loi */}
        {errorList.length > 0 && (
          <div className="error-list mt-3">
            {errorList.map((error, index) => (
              <p key={index} className="text-danger">
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
            Đăng Ký
          </button>
          <div>
            <LinkToGoogle headline="Đăng Ký Bằng Google" />
          </div>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Bạn đã có tài khoản?</p>
          <a
            href="/login"
            className="ml-2 font-medium text-base text-violet-500"
          >
            Đăng Nhập
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
