import React from "react";
import { useLocation } from "react-router-dom";
import RenderRating from "../elements/RenderRating";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { toast, Toaster } from "react-hot-toast";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state.product || null;
  const { cartItems, addCartItem } = useCartContext(); // Thêm cartItems vào context
  const { addWishlistItem } = useWishlistContext();

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (product) => {
    const currentCart = cartItems.find((cartItem) => cartItem._id === product._id);
    if (currentCart && currentCart.quantity >= product.amount) {
      toast.error(`Số lượng mua vượt quá số lượng trong kho`, {
        position: "top-right",
      });
    } else {
      addCartItem(product);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
        position: "top-right",
      });
    }
  };

  // Function to format description
  const formatDescription = (description) => {
    const parts = description.split("\n").filter((part) => part.trim() !== "");
    return parts.map((part, index) => {
      if (part.startsWith("*")) {
        // Convert lists (assuming '*' is used for list items)
        const items = part.split("*").filter((item) => item.trim() !== "");
        return (
          <ul className="list-disc list-inside mb-4" key={index}>
            {items.map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        );
      } else {
        // Regular paragraphs
        return (
          <p className="mb-4" key={index}>
            {part.trim()}
          </p>
        );
      }
    });
  };

  // Function to calculate the discounted price
  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <Toaster />
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto relative">
            <img
              className={`w-full ${product.amount === 0 ? "grayscale" : ""}`}
              src={product.imgUrl}
              alt={product.product_name}
            />
            {product.amount === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white text-lg font-bold">
                Hết hàng
              </div>
            )}
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.product_name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              {product.discount > 0 ? (
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {discountedPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="text-lg line-through text-gray-500 sm:text-xl">
                    {Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                  <p className="text-lg font-medium text-green-500 sm:text-xl">
                    {product.discount}% off
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {Number(product.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <RenderRating rating={product.rating} />
                </div>
                <p className="text-sm font-medium leading-none text-gray-500">
                  ({product.rating})
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                >
                  {product.reviewer} Đánh Giá
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                onClick={() => addWishlistItem(product)}
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
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

              {product.amount > 0 ? (
                <button
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                  onClick={() => handleAddToCart(product)}
                >
                  <svg
                    className="w-5 h-5 -ms-2 me-2"
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
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6"
                    />
                  </svg>
                  Thêm Vào Giỏ Hàng
                </button>
              ) : (
                <span className="text-white mt-4 sm:mt-0 bg-gray-400 px-5 py-2.5 font-medium rounded-lg text-sm flex items-center justify-center">
                  Hết Hàng
                </span>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6 md:my-8 border-gray-200" />

        <div className="text-gray-500 text-lg">
          {formatDescription(product.description)}
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
