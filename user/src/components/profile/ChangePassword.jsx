import { Button, Label, TextInput } from "flowbite-react";
const ChangePassword = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Mật khẩu & Bảo mật</h1>
      <hr className="my-4" />
      <div className="w-full flex items-center">
        <div className="w-1/2 border-r px-10">
          <h1 className="text-xl font-semibold mb-3">Đổi mật khẩu</h1>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Mật khẩu mới: " />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Nhập lại mật khẩu mới: " />
              </div>
              <TextInput id="password2" type="password" required />
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
            <br/>Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt
            <br/>Không nên giống với mật khẩu được sử dụng gần đây
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
