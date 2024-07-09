import { useLocation } from "react-router-dom";
import RenderRating from "../elements/RenderRating";
import { useCartContext } from "../../context/CartContext";
import { useWishlistContext } from "../../context/WishlistContext";
import { Toaster } from "react-hot-toast";
import {
  FaAngleDown,
  FaAngleUp,
  FaReply,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchGetFeedbackById } from "../../data/api";
import ProductCard from "../card/Card";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product || null;
  const { addCartItem } = useCartContext();
  const { checkWishlistItem, addWishlistItem, removeWishlistItem } =
    useWishlistContext();
  const [reviews, setReviews] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const products = JSON.parse(localStorage.getItem("products"));
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (product) {
      const getFeedback = async () => {
        const data = await fetchGetFeedbackById(product._id);
        setReviews(data.data.result);
      };
      getFeedback();

      const relatedProduct = async () => {
        const relatedItems = products.filter(
          (item) =>
            item.category_id === product.category_id && item._id !== product._id
        );
        setRelatedProducts(relatedItems);
      };
      relatedProduct();
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatDescription = (description) => {
    const parts = description.split("\n").filter((part) => part.trim() !== "");
    return parts.map((part, index) => {
      if (part.startsWith("*")) {
        const items = part.split("*").filter((item) => item.trim() !== "");
        return (
          <ul className="list-disc list-inside mb-4" key={index}>
            {items.map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>
        );
      } else {
        return (
          <p className="mb-4" key={index}>
            {part.trim()}
          </p>
        );
      }
    });
  };

  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
  };

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <Toaster />
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto relative">
            <img
              className={`w-56 ${product.amount === 0 ? "grayscale" : ""}`}
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
                    Giảm {product.discount}%
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
                <a className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline">
                  {product.reviewer} Đánh Giá
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {checkWishlistItem(product) ? (
                <button
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={() => removeWishlistItem(product._id)}
                >
                  <FaHeart className="w-5 h-5 -ms-2 me-2 text-red-500" />
                  Yêu Thích
                </button>
              ) : (
                <button
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={() => addWishlistItem(product)}
                >
                  <FaRegHeart className="w-5 h-5 -ms-2 me-2" />
                  Yêu Thích
                </button>
              )}

              {product.amount > 0 ? (
                <button
                  className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
                  onClick={() => addCartItem(product)}
                >
                  <FaCartPlus className="w-5 h-5 -ms-2 me-2" />
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
        {/* Mô tả */}
        <h2 className="text-3xl font-semibold mb-4">Mô tả sản phẩm</h2>
        <div className="text-gray-500 text-lg text-justify">
          {showFullDescription
            ? formatDescription(product.description)
            : formatDescription(product.description.slice(0, 100))}
          <button
            className="w-full text-center text-blue-600 hover:text-blue-800 visited:text-purple-600"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            <div className="flex items-center justify-center mt-2">
              {showFullDescription ? `Thu gọn ` : `Xem thêm mô tả sản phẩm `}
              {showFullDescription ? (
                <FaAngleUp className="w-5 h-5 mx-2 my-2" />
              ) : (
                <FaAngleDown className="w-5 h-5 mx-2 my-2" />
              )}
            </div>
          </button>
        </div>

        {/* feedback */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">Đánh giá sản phẩm</h2>
          {reviews.length > 0 ? (
            <>
              {showAllReviews
                ? reviews.map((review) => (
                    <div
                      key={review._id}
                      className=" p-4 rounded-lg text-black mb-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="text-xl flex-shrink-0 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2 w-full flex items-start justify-between">
                          <p className="text-lg font-semibold">
                            {review.username}
                          </p>
                          <RenderRating rating={review.rating} />
                        </div>
                      </div>
                      <div className="text-black mx-2 flex">
                        <FaReply className="mx-2 mt-1 text-sm transform rotate-180" />
                        {review.description}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {formatDate(review.created_at)}
                      </p>
                      {review.reply_feedback && (
                        <div className="ml-10 mt-4 p-4 bg-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="text-lg flex-shrink-0 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                              M
                            </div>
                            <p className="font-medium ml-2">
                              MomBabyMilk Shop:
                            </p>
                          </div>
                          <div className="text-black mx-8 flex">
                            <FaReply className="mx-1 mt-1 text-sm transform rotate-180" />
                            {review.reply_feedback.description}
                          </div>

                          <div className="text-gray-500 text-sm mt-2">
                            {formatDate(review.reply_feedback.created_at)}
                          </div>
                          
                        </div>
                      )}
                    </div>
                  ))
                : reviews.slice(0, 1).map((review) => (
                    <div
                      key={review._id}
                      className=" p-4 rounded-lg text-black mb-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="text-xl flex-shrink-0 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2 w-full flex items-start justify-between">
                          <p className="text-lg font-semibold">
                            {review.username}
                          </p>
                          <RenderRating rating={review.rating} />
                        </div>
                      </div>
                      <div className="text-black mx-2 flex">
                        <FaReply className="mx-2 mt-1 text-sm transform rotate-180" />
                        {review.description}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {formatDate(review.created_at)}
                      </p>
                      {review.reply_feedback && (
                        <div className="ml-10 mt-4 p-4 bg-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="text-lg flex-shrink-0 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                              M
                            </div>
                            <p className="font-medium ml-2">
                              MomBabyMilk Shop:
                            </p>
                          </div>
                          <div className="text-black mx-8 flex">
                            <FaReply className="mx-1 mt-1 text-sm transform rotate-180" />
                            {review.reply_feedback.description}
                          </div>

                          <div className="text-gray-500 text-sm mt-2">
                            {formatDate(review.reply_feedback.created_at)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              <button
                className="w-full text-center text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                <div className="flex items-center justify-center mt-2">
                  {showAllReviews ? `Thu gọn ` : `Xem tất cả đánh giá `}
                  {showAllReviews ? (
                    <FaAngleUp className="w-5 h-5 mx-2 my-2" />
                  ) : (
                    <FaAngleDown className="w-5 h-5 mx-2 my-2" />
                  )}
                </div>
              </button>
            </>
          ) : (
            <p className="text-lg text-center text-gray-600">
              Sản phẩm chưa có đánh giá
            </p>
          )}
        </div>

        {/* related products */}
        <div className="w-full">
          <ProductCard
            products={relatedProducts}
            headline={"Sản phẩm liên quan"}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
