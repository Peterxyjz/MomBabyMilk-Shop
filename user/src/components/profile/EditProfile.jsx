import { Datepicker } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchGetMe } from "../../data/api";
const EditProfile = () => {
  const token = JSON.parse(localStorage.getItem("result"));
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  });
  useEffect(() => {
    const getMeProfile = async () => {
      await fetchGetMe(token)
        .then((res) => {
          setProfile({
            username: res.data.result.username || "Chưa có tên đăng nhập",
            name: res.data.result.full_name || "Chưa có họ và tên",
            email: res.data.result.email || "",
            phone: res.data.result.phone || "",
            address: res.data.result.address || "Chưa có địa chỉ",
            point: res.data.result.menber_ship || 0,
            birthDate: res.data.date_of_birth
            ? {
                day: new Date(res.data.date_of_birth).getDate().toString(),
                month: (new Date(res.data.date_of_birth).getMonth() + 1).toString(),
                year: new Date(res.data.date_of_birth).getFullYear().toString(),
              }
            : "Chưa có ngày sinh",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMeProfile();
  }, []);
  return (
    <>
      {isEditing ? (
        <>
          <h1 className="text-2xl font-semibold mb-3">Tổng Quan</h1>
          <div className="w-full mx-auto">
            <div className="w-full grid grid-cols-4">
              <div>
                <p className="text-lg">Tên đăng nhập</p>
                <p className="text-lg font-semibold">{profile.username}</p>
              </div>
              <div>
                <p className="text-lg">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-lg">Họ và tên</p>
                <p className="text-lg font-semibold">{profile.name}</p>
              </div>
              <div>
                <p className="text-lg">Nhóm khách hàng</p>
                <p className="text-lg font-semibold">Member</p>
              </div>
              <div>
                <p className="text-lg">Đã tích lũy</p>
                <p className="text-lg font-semibold">
                  {Number(profile.point).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div>
                <p className="text-lg">Ngày sinh</p>
                <p className="text-lg font-semibold">{profile.birthDate}</p>
              </div>
              <div>
                <p className="text-lg">Địa chỉ: </p>
                <p className="text-lg font-semibold">
                  {profile.address}
                </p>
              </div>
            </div>
            <hr className="my-4" />
            <form>
              <button
                onClick={() => setIsEditing(true)}
                className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md"
              >
                Chỉnh sửa
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">
            Chỉnh sửa thông tin tài khoản
          </h1>
          <div>
            <form className="space-y-4 my-4 px-8">
              <div className="w-full mx-auto flex gap-10">
                <div className="w-1/2">
                  <label className="block text-gray-700">Họ và Tên: </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Nhập họ và tên..."
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Số điện thoại: </label>
                  {
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="Nhập số điện thoại..."
                      />
                    </div>
                  }
                </div>
              </div>
              <div>
                <div className="flex items-center gap-8 my-5">
                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Thành phố
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {/* {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))} */}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quận/Huyện*
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      {/* {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))} */}
                    </select>
                  </div>

                  <div className="w-1/3">
                    <label
                      htmlFor="select-city-input-3"
                      className="block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phường/Xã
                    </label>
                    <select
                      id="select-city-input-3"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required
                    >
                      <option value="">Chọn Phường/Xã</option>
                      {/* {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))} */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto gap-10 flex my-5">
                <div className="w-1/2">
                  <label
                    htmlFor="company_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Số nhà, đường{" "}
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Địa chỉ nhà..."
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Ngày sinh: </label>
                  <Datepicker language="vi" />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-1/2 py-2 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
