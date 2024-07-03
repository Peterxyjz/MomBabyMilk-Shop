import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { fetchChangePassword } from "../../data/api";
const ChangePassword = () => {
  const token = JSON.parse(localStorage.getItem("result"));
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
    const data = {
      password: password,
      confirm_password: confirm_password,
    };
    await fetchChangePassword(token, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setErrorList(error.response.data);
      });
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold">Mật khẩu & Bảo mật</h1>
      <hr className="my-4" />
      <div className="w-full flex items-center">
        <div className="w-1/2 border-r px-10">
          <h1 className="text-xl font-semibold mb-3">Đổi mật khẩu</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Mật khẩu mới: " />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Nhập lại mật khẩu mới: " />
              </div>
              <TextInput
                id="confirm_password"
                type="password"
                name="confirm_password"
                required
                value={formValues.confirm_password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="text-lg font-semibold my-3">
              Lưu thay đổi
            </Button>
          </form>
        </div>
        <div className="w-1/2 px-10">
          <h1 className="text-xl font-semibold">Mật khẩu của bạn</h1>
          <p className="text-md">
            Phải từ 8 ký tự trở lên
            <br />
            Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt
            <br />
            Không nên giống với mật khẩu được sử dụng gần đây
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
