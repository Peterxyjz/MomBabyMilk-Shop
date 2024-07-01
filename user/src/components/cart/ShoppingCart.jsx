import cartEmptyImg from "../../assets/images/background/cart_empty.png";
import { MdDeleteForever } from "react-icons/md";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGetAllVoucher, fetchGetVoucher } from "../../data/api";
import { Button } from "flowbite-react";

const ShoppingCart = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const verify = user === null ? 0 : user.verify;
  const {
    cartItems,
    totalPrice,
    removeCartItem,
    increaseAmount,
    decreaseAmount,
    cartAmount,
  } = useCartContext();

  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [ship, setShip] = useState(0);
  const [errorList, setErrorList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [voucherList, setVoucherList] = useState([]);

  useEffect(() => {
    const getAllVoucher = async () => {
      await fetchGetAllVoucher()
        .then((res) => {
          setVoucherList(res.data.result);
          console.log(res.data.result);
        })
        .catch((error) => {
          let errorList = [];
          for (let [key, value] of Object.entries(error.response.data.errors)) {
            errorList.push(value);
            setErrorList(errorList);
          }
        });
    };
    getAllVoucher();
  }, []);

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    document.getElementById("voucherCode").value = selectedValue;
    setVoucherCode(selectedValue);
  };

  const handChangeVoucherCode = (e) => {
    setVoucherCode(e.target.value);
  };

  const handClickVoucher = async (event) => {
    event.preventDefault();
    console.log(voucherCode);
    await fetchGetVoucher(voucherCode)
      .then((res) => {
        console.log(res.data.discount);
        setDiscount(Number(res.data.discount));
      })
      .catch((error) => {
        let errorList = [];
        setDiscount(0);
        setVoucherCode("");
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };

  const calculateShip = (cartAmount) => {
    if (cartAmount > 20) {
      return 0;
    } else if (cartAmount > 10) {
      return 30000;
    } else {
      return 50000;
    }
  };

  useEffect(() => {
    setShip(calculateShip(cartAmount));
  }, [cartAmount]);

  const total = totalPrice + ship - discount;

  return (
    <>
      <ol className="flex items-center justify-center w-full px-24 text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
        <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="w-full flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Giỏ Hàng
          </span>
        </li>
        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="w-full flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Thông Tin
          </span>
        </li>
        <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-[#6b7280] dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <span className="w-full flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
            <svg
              className="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Thanh Toán
          </span>
        </li>
        <li className="flex shrink-0 items-center">
          <svg
            className="me-2 h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Hoàn Thành
        </li>
      </ol>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Giỏ hàng{" "}
            {cartAmount > 0 ? (
              <span className="text-base">({cartAmount} sản phẩm)</span>
            ) : (
              ""
            )}
          </h2>
          {cartAmount > 0 ? (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((product) => (
                    // cart Item
                    <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img className="h-20 w-20 dark:hidden" src={product.imgUrl} />
                        <img className="hidden h-20 w-20 dark:block" src={product.imgUrl} />
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={() => decreaseAmount(product._id)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                              value={product.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              onClick={() => increaseAmount(product)}
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                              <svg
                                className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">
                              {Number(product.price - (product.price * product.discount) / 100).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                          >
                            {product.product_name}
                          </a>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                              </svg>
                              Yêu Thích
                            </button>
                            <button
                              type="button"
                              onClick={() => removeCartItem(product._id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <MdDeleteForever className="me-1.5 h-5 w-5" />
                              Xóa Khỏi Giỏ Hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Order summary */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tóm Tắt Đơn Hàng
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Giá gốc
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {Number(totalPrice).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Phí ship:
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {Number(ship).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Mã giảm giá
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          -
                          {Number(discount).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Tổng Cộng
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {Number(total).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </dd>
                    </dl>
                  </div>
                  <Link
                    to={"/order"}
                    state={{
                      discount: discount,
                      ship: ship,
                      voucherCode: voucherCode,
                    }}
                    className="flex w-full items-center justify-center rounded-lg bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] focus:outline-none focus:ring-4 focus:ring-[#93c5fd] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
                  >
                    Thanh Toán Ngay
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      Hoặc{" "}
                    </span>
                    <a
                      href="/filter"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Tiếp Tục Mua Hàng
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <form className="space-y-4" onSubmit={handClickVoucher}>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bạn có voucher hoặc thẻ quà tặng không?
                    </label>
                    <div className="w-full flex justify-between items-center gap-2">
                      <div className="w-3/4">
                        <input
                          type="text"
                          id="voucherCode"
                          name="voucherCode"
                          value={voucherCode}
                          onChange={handChangeVoucherCode}
                          className="block w-full h-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className="w-1/4">
                        <Button color="blue" size="xs" type="submit">
                          Áp Dụng
                        </Button>
                      </div>
                    </div>
                    <div className="w-full">
                      {verify === 1 && (
                        <div>
                          <button
                            id="dropdownRadioHelperButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full inline-flex justify-center items-center"
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                            Kho Voucher
                          </button>

                          {/* Dropdown menu */}
                          {dropdownOpen && (
                            <div
                              id="dropdownRadioHelper"
                              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownRadioHelperButton"
                              >
                                {voucherList.map((voucher) => (
                                  <li key={voucher._id}>
                                    <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                      <div className="flex items-center h-5">
                                        <input
                                          id="helper-radio-4"
                                          name="helper-radio"
                                          type="radio"
                                          value={voucher._id}
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                          onChange={handleRadioChange}
                                        />
                                      </div>
                                      <div className="ms-2 text-sm">
                                        <label
                                          htmlFor="helper-radio-4"
                                          className="font-medium text-gray-900 dark:text-gray-300"
                                        >
                                          <div>Voucher giảm {voucher.discount}</div>
                                          <p
                                            id="helper-radio-text-4"
                                            className="text-xs font-normal text-gray-500 dark:text-gray-300"
                                          >
                                            Voucher chỉ còn {voucher.amount} lượt
                                          </p>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
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
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full min-h-60 flex flex-col items-center justify-center outline-none rounded-xl border-2 border-[rgba(0,0,0,0.1)] mx-8 my-8 p-4">
              <h1 className="text-2xl font-semibold">Giỏ hàng trống</h1>
              <img src={cartEmptyImg} className="min-h-[400px] " />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
