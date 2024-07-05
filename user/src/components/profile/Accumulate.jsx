import { useEffect, useState } from "react";
import Loader from "../../assets/loading2.gif";
import { fetchGetAllVoucher } from "../../data/api";
import { Button } from "flowbite-react";
import { ImGift } from "react-icons/im";

const Accumulate = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const getVouchers = async () => {
      try {
        const data = await fetchGetAllVoucher();
        const currentDate = new Date();
        const sortedVouchers = data.data.result
          .filter((voucher) => voucher.voucher_type === 1)
          .filter((voucher) => new Date(voucher.expire_date) > currentDate) // Filter vouchers that have not expired
          .sort((a, b) => {
            const userMembership = Number(user.member_ship);
            if (
              userMembership >= a.membership &&
              userMembership < b.membership
            ) {
              return -1;
            } else if (
              userMembership < a.membership &&
              userMembership >= b.membership
            ) {
              return 1;
            } else {
              return new Date(a.expire_date) - new Date(b.expire_date);
            }
          });
        setVouchers(sortedVouchers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getVouchers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Đổi quà tặng</h1>
          <p>Dùng membership tích lũy để đổi quà tại MomBabyMilk Shop</p>
        </div>
        <div>
          <Button
            color="light"
            size={"lg"}
            disabled
            className="text-blue-500 font-semibold"
          >
            <ImGift className="mr-2 h-5 w-5" />
            Điểm tích lũy:{" "}
            {Number(user.member_ship).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {vouchers.map((voucher, index) => (
            <div
              key={voucher._id}
              className="bg-white max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer"
            >
              <div
                className={`h-20 flex items-center justify-between ${
                  Number(user.member_ship) < voucher.membership
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                <h1 className="text-white mx-3 border-2 py-2 px-4 rounded-full">
                  {index + 1}
                </h1>
                <p className="mr-20 text-white text-lg">
                  VR{voucher._id.substring(voucher._id.length - 5)}
                </p>
                <p className="mr-4 text-white font-thin text-lg">
                  {Number(voucher.discount).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <p className="py-6 text-lg tracking-wide ml-16">
                Điểm để đổi:{" "}
                {Number(voucher.membership).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div className="flex justify-between px-5 mb-2 text-sm text-gray-600">
                <p>
                  Hết hạn: {new Date(voucher.expire_date).toLocaleDateString()}
                </p>
                <p>Số lượng: {voucher.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accumulate;
