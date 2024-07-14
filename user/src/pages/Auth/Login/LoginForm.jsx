import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkToGoogle from "../Google/LinkToGoogle";
import { fetchLogin } from "../../../data/api.jsx";
import { toast, Toaster } from "react-hot-toast";

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

    await fetchLogin({
      email,
      password,
    })
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("result", JSON.stringify(res.data.result));
          
        if(user.verify === 0){
          toast.error("Vui lòng xác nhận email!", {
            duration: 5000,
          });
          navigate("/otp", {
            state: { navigateTo: "/profile", email: user.email, user_id: user._id }
          });
          return;
        }
        toast.success("Đăng nhập thành công!", {
          duration: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        let errorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
        toast.error("Có lỗi xảy ra, vui lòng thử lại!", {
          position: "top-right",
        });
      });
  };

  return (
    <div className="w-full px-10 py-12 rounded-3xl border-solid border-2 border-[rgba(0,0,0,0.1)] shadow-2xl">
      <Toaster />
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

            <div>
              <LinkToGoogle headline="Đăng Nhập Bằng Google" />
            </div>
          </div>
        </form>

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
