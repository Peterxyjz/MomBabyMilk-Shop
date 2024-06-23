import { useEffect, useState } from "react";
import {
  FaUser,
  FaHistory,
  FaLock,
  FaCommentDots,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import {
  fetchGetMe,
  getProvinces,
  getDistricts,
  getWards,
  fetchUpdateMe,
} from "../../data/api";

const EditProfile = () => {
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

  const [errorList, setErrorList] = useState([]);
  const token = JSON.parse(localStorage.getItem("result"));
  useEffect(() => {
    console.log("getme");
    const getMeProfile = async () => {
      await fetchGetMe(token)
        .then((res) => {
          setProfile({
            username: res.data.result.username || "",
            name: res.data.result.full_name || "",
            email: res.data.result.email || "",
            phone: res.data.result.phone || "",
            address: res.data.result.address || "",
            birthDate: {
              day: new Date(res.data.result.date_of_birth).getDate().toString(),
              month: (
                new Date(res.data.result.date_of_birth).getMonth() + 1
              ).toString(),
              year: new Date(res.data.result.date_of_birth)
                .getFullYear()
                .toString(),
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMeProfile();
  }, []);

  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceList = await getProvinces();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProvince();
  }, []);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const getDistrict = async (id) => {
      try {
        const districtList = await getDistricts(id);
        setDistricts(districtList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getDistrict();
  }, []);

  const [wards, setWards] = useState([]);
  useEffect(() => {
    const getWard = async () => {
      try {
        const wardList = await getWards();
        setWards(wardList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getWard();
  }, []);

  const [addressInput, setAddressInput] = useState("");

  const handlerChangeAddressInput = (event) => {
    setAddressInput(event.target.value);
  };

  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });

  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });

    setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;

    setSelectedDistrict({ id, name });
    setWards(await getWards(Number(id)));
  };

  const handleWardSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedWard({ id, name });
  };

  const [isAddress, setIsAddress] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [view, setView] = useState("profile"); // State to manage the current view

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      birthDate: {
        ...profile.birthDate,
        [name]: value,
      },
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    date.setDate(profile.birthDate.day);
    date.setMonth(profile.birthDate.month - 1);
    date.setFullYear(profile.birthDate.year);
    const data = {
      full_name: profile.name,
      phone: profile.phone,
      address: profile.address,
      date_of_birth: date,
    };
    await fetchUpdateMe(token, data)
      .then((res) => {
        console.log(res.data);
        console.log("Profile updated:", profile);
      })
      .catch((error) => {
        console.log(error);
        let errorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };
  console.log("profile: ", profile);
  return (
    <>
      <Breadcrumbs headline={"Thay đổi thông tin"} />
      <div className="flex flex-col md:flex-row p-4 md:p-8 bg-white rounded-lg shadow-md mb-12">
        {/* Sidebar */}
        <div
          className="md:w-1/4 flex flex-col p-4 border-r border-gray-200"
          style={{ minHeight: "100vh" }}
        >
          <nav className="flex flex-col divide-y divide-gray-200">
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "profile"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("profile")}
            >
              <FaUser className="mr-2" /> Hồ Sơ
            </a>
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "password"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("password")}
            >
              <FaLock className="mr-2" /> Đổi Mật Khẩu
            </a>
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "orders"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("orders")}
            >
              <FaHistory className="mr-2" /> Lịch Sử Đơn Hàng
            </a>
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "comments"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("comments")}
            >
              <FaCommentDots className="mr-2" /> Bình Luận Của Tôi
            </a>
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "favorites"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("favorites")}
            >
              <FaHeart className="mr-2" /> Sản Phẩm Yêu Thích
            </a>
            <a
              href="#"
              className={`flex items-center py-3 ${
                view === "referrals"
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              }`}
              onClick={() => setView("referrals")}
            >
              <FaShareAlt className="mr-2" /> Tích điểm
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 p-4">
          {view === "profile" && (
            <>
              <h2 className="text-xl font-bold mb-4">Hồ Sơ Của Tôi</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Biệt danh</label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  {
                    <div className="flex items-center">
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  }
                </div>
                <div>
                  <label className="block text-gray-700">Số điện thoại</label>
                  {
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  }
                </div>
                <div>
                  <label className="block text-gray-700">Địa chỉ</label>
                  {isAddress ? (
                    <div className="flex items-center">
                      <div>
                        <div className="sm:col-span-2 ">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Thành phố
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleProvinceSelect}
                                required
                              >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces.map((province) => (
                                  <option key={province.id} value={province.id}>
                                    {province.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Quận/Huyện*
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleDistrictSelect}
                                required
                              >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((district) => (
                                  <option key={district.id} value={district.id}>
                                    {district.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <label
                                  htmlFor="select-city-input-3"
                                  className="block text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Phường/Xã
                                </label>
                              </div>
                              <select
                                id="select-city-input-3"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                onChange={handleWardSelect}
                                required
                              >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map((ward) => (
                                  <option key={ward.id} value={ward.id}>
                                    {ward.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
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
                            value={addressInput}
                            onChange={handlerChangeAddressInput}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Địa chỉ nhà..."
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => {
                          setIsAddress(false);
                          const address =
                            addressInput +
                            ", " +
                            selectedWard.name +
                            ", " +
                            selectedDistrict.name +
                            ", " +
                            selectedProvince.name;

                          setProfile((prevProfile) => ({
                            ...prevProfile,
                            address: address,
                          }));
                        }}
                      >
                        Lưu
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-2 text-blue-500 hover:underline"
                        onClick={() => setIsAddress(true)}
                      >
                        Thay Đổi
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Ngày sinh</label>
                  <div className="flex space-x-4">
                    <select
                      name="day"
                      value={profile.birthDate.day}
                      onChange={handleDateChange}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Chọn Ngày</option>
                      {[...Array(31).keys()].map((day) => (
                        <option key={day + 1} value={day + 1}>
                          {day + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      name="month"
                      value={profile.birthDate.month}
                      onChange={handleDateChange}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Chọn Tháng</option>
                      {[...Array(12).keys()].map((month) => (
                        <option key={month + 1} value={month + 1}>
                          Tháng {month + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      name="year"
                      value={profile.birthDate.year}
                      onChange={handleDateChange}
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Chọn Năm</option>
                      {[...Array(120).keys()].map((year) => (
                        <option key={year + 1920} value={year + 1920}>
                          {year + 1920}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Lưu
                </button>
              </form>
              {errorList.length > 0 && (
                <div className="error-list mt-3 mb-3">
                  {errorList.map((error, index) => (
                    <p key={index} className="text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
          {view === "password" && (
            <>
              <h2 className="text-xl font-bold mb-4">Mật Khẩu & Bảo Mật</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Mật khẩu mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                  Lưu thay đổi
                </button>
              </form>
             
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Bảo mật hai lớp</h3>
                <p className="text-gray-600 mb-4">
                  Sử dụng xác thực hai lớp giúp tài khoản của bạn an toàn hơn,
                  tránh được các giao dịch được thực hiện trái phép.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700">
                      Xác thực khi thanh toán
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="allIPs">Áp dụng với mọi IP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Xác thực khi đăng nhập
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="noOTP">Không sử dụng OTP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700">
                      Phương thức xác thực
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="email">Bảo mật bằng Email</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                  >
                    Tiếp tục
                  </button>
                </form>
              </div>
            </>
          )}
          {view === "orders" && (
            <>
              <h2 className="text-xl font-bold mb-4">Lịch Sử Đơn Hàng</h2>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Mã đơn hàng"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Số tiền từ"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Số tiền đến"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Từ ngày"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Đến ngày"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Lọc
                  </button>
                </div>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Thời gian</th>
                      <th className="py-2 px-4 border-b">Mã đơn hàng</th>
                      <th className="py-2 px-4 border-b">Sản phẩm</th>
                      <th className="py-2 px-4 border-b">Tổng tiền</th>
                      <th className="py-2 px-4 border-b">Trạng thái</th>
                      <th className="py-2 px-4 border-b">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b">
                        2024-05-14 19:38:04
                      </td>
                      <td className="py-2 px-4 border-b">7052800</td>
                      <td className="py-2 px-4 border-b">
                        Gói gia hạn Duolingo 2 tháng x1
                      </td>
                      <td className="py-2 px-4 border-b">49.000đ</td>
                      <td className="py-2 px-4 border-b text-green-500">
                        Đã xử lý
                      </td>
                      <td className="py-2 px-4 border-b text-blue-500 hover:underline cursor-pointer">
                        Chi tiết
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
