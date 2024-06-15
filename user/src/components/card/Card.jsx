import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./Swiper.css"; // Đảm bảo bạn import file CSS mới vào đây
import { fetchProducts } from "../../data/api";

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đồng');
}

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const productData = await fetchProducts();
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        getProducts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Hiển thị 4 sản phẩm cùng lúc
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
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

    return (
        <div className="h-full">
            <Slider {...settings}>
                {products.map(product => (
                    product.isActive && (
                        <div key={product._id} className="p-2">
                            <Card className="max-w-xs m-2 product-card">
                                <a href="#">
                                    <img className="product-image" src={product.imgUrl} alt={product.product_name} />
                                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {product.product_name}
                                    </h5>
                                </a>
                                <div className="mb-3 mt-1.5 flex items-center">
                                    <span className="ml-2 mr-1 rounded bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                        5 sao ne
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                                    <a
                                        href="#"
                                        className="rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                    >
                                        Add to cart
                                    </a>
                                </div>
                            </Card>
                        </div>
                    )
                ))}
            </Slider>
        </div>
    );
};

export default ProductCard;
