import React from "react";
import { Card } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import "./Swiper.css";
import RenderRating from "../elements/RenderRating";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ products, headline, viewAllLink }) => {
  const { addCartItem } = useCartContext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    className: "center",
    centerMode: true,
    centerPadding: "40px",
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <button className="slick-arrow-button">
          <IoIosArrowForward className="icon" />
        </button>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <button className="slick-arrow-button">
          <IoIosArrowBack className="icon" />
        </button>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addCartItem(product);
    toast.success('Sản phẩm đã được thêm vào giỏ hàng', {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-2 mt-12">
        <h1 className="text-2xl font-bold">{headline}</h1>
        <Link to={viewAllLink} className="text-blue-500 hover:underline">
          Xem tất cả
        </Link>
      </div>
      <Slider {...settings}>
        {products.map((product) => {
          if (product.isActive) {
            return (
              <div key={product._id} className="p-1">
                <Card className="max-w-xs m-1 product-card flex flex-col justify-between h-full relative">
                  <Link to="/product" state={{ product: product }}>
                    <img
                      className="product-image mx-auto"
                      src={product.imgUrl}
                      alt={product.product_name}
                    />
                    {product.amount === 0 && (
                      <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">Hết hàng</span>
                      </div>
                    )}
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white h-16 overflow-hidden overflow-ellipsis" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                      {product.product_name}
                    </h5>
                  </Link>
                  <div className="mb-2 mt-1 flex items-center">
                    <RenderRating rating={product.rating} />
                    <span className="ml-2 mr-1 rounded bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                      {product.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {Number(product.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    {product.amount > 0 && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="rounded-lg bg-cyan-700 p-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 flex items-center justify-center"
                      >
                        <FaShoppingCart />
                      </button>
                    )}
                  </div>
                </Card>
              </div>
            );
          }
        })}
      </Slider>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
