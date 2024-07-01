import React from 'react';
import { Card } from 'flowbite-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import './Swiper.css';
import RenderRating from '../elements/RenderRating';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { Toaster, toast } from 'react-hot-toast';

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
    className: 'center',
    centerMode: true,
    centerPadding: '40px',
  };

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className='slick-arrow slick-next' onClick={onClick}>
        <button className='slick-arrow-button'>
          <IoIosArrowForward className='icon' />
        </button>
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className='slick-arrow slick-prev' onClick={onClick}>
        <button className='slick-arrow-button'>
          <IoIosArrowBack className='icon' />
        </button>
      </div>
    );
  }

  const handleAddToCart = (product) => {
    addCartItem(product);
    toast.success('Sản phẩm đã được thêm vào giỏ hàng');
  };

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center mb-2 mt-12'>
        <h1 className='text-2xl font-bold'>{headline}</h1>
        <Link to={viewAllLink} className='text-blue-500 hover:underline'>
          Xem tất cả
        </Link>
      </div>
      <Slider {...settings}>
        {products.map((product) => {
          if (product.isActive) {
            const discountedPrice = product.price - (product.price * product.discount) / 100;
            return (
              <div key={product._id} className='p-1'>
                <Card className='max-w-xs m-1 product-card flex flex-col justify-between h-full relative'>
                  <Link to='/product' state={{ product: product }}>
                    <div className='relative product-image-container'>
                      <img className='product-image mx-auto' src={product.imgUrl} alt={product.product_name} />
                      {product.amount === 0 && (
                        <div className='out-of-stock-overlay'>
                          <span className='text-white text-xl font-bold'>Hết hàng</span>
                        </div>
                      )}
                    </div>
                    <h5 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white h-16 overflow-hidden overflow-ellipsis' style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                      {product.product_name}
                    </h5>
                  </Link>
                  <div className='mb-2 mt-1 flex items-center'>
                    <RenderRating rating={product.rating} />
                    <span className='ml-2 mr-1 rounded bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'>
                      {product.rating}
                    </span>
                  </div>
                  <div className='flex justify-between items-end w-full h-20'>
                    <div className='flex flex-col justify-between'>
                      {product.discount > 0 ? (
                        <>
                          <span className='text-xl font-bold text-gray-900 dark:text-white'>
                            {formatCurrency(discountedPrice)}
                          </span>
                          <span className='text-sm line-through text-gray-500 dark:text-gray-400'>
                            {formatCurrency(product.price)}
                          </span>
                          <span className='text-green-500 text-sm'>Giảm {product.discount}%</span>
                        </>
                      ) : (
                        <span className='text-xl font-bold text-gray-900 dark:text-white mt-auto'>
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    {product.amount > 0 && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className='rounded-lg bg-cyan-700 p-3 text-center text-base font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 flex items-center justify-center'
                      >
                        <span className='mr-1'>Thêm</span>
                        <FaShoppingCart />
                      </button>
                    )}
                  </div>
                </Card>
              </div>
            );
          }
          return null;
        })}
      </Slider>
      <Toaster
        position="top-right"
      />
    </div>
  );
};

export default ProductCard;
