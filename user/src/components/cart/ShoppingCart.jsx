import React from "react";
import cartEmptyImg from "../../assets/images/background/cart_empty.png";
import { useCartContext } from "../../context/CartContext";

const ShoppingCart = () => {
  const {
    cartItems,
    totalPrice,
    removeCartItem,
    increaseAmount,
    decreaseAmount,
    cartAmount,
  } = useCartContext();
  let ship = 0
  let discount = 0
  if(cartAmount > 1){
    ship = 50000
    discount = 30000
  }
  
  const total = totalPrice + ship - discount;
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Giỏ hàng{" "}
          {cartAmount > 0 ? <span className="text-base">({cartAmount} sản phẩm)</span> : ""}
        </h2>
        {cartAmount > 0 ? (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.map(
                (product) => (
                  console.log(product),
                  (
                    // cart Item
                    <>
                      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src={product.imgUrl}
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src={product.imgUrl}
                          />
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
                                value={product.amount}
                                readOnly
                              />
                              <button
                                type="button"
                                onClick={() => increaseAmount(product._id)}
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
                                {Number(product.price).toLocaleString("vi-VN", {
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
                                Add to Favorites
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCartItem(product._id)}
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
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
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )
              )}
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
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-lg bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] focus:outline-none focus:ring-4 focus:ring-[#93c5fd] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
              >
                Thanh Toán Ngay
              </a>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {" "}
                  Hoặc{" "}
                </span>
                <a
                  href="/"
                  title=""
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
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="voucher"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {" "}
                    Bạn có voucher hoặc thẻ quà tặng không?{" "}
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-[#1d4ed8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1e40af] focus:outline-none focus:ring-4 focus:ring-[#93c5fd] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]"
                  >
                  Áp Dụng Mã
                </button>
              </form>
            </div>
          </div>
        </div>
        ) : (
          <div className="w-full min-h-60 flex flex-col items-center justify-center outline-none rounded-xl border-2 border-[rgba(0,0,0,0.1)] mx-8 my-8 p-4">
            <h1 className="text-2xl font-semibold">Giỏ hàng trống</h1>
            <img src={cartEmptyImg} className="min-h-[400px] "/>
          </div>
          
        )}
      </div>
    </section>
  );
};

export default ShoppingCart;
