import React, { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { FaShoppingCart } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loader from "../../assets/loading.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

const Filter = () => {
  const { products, loading } = useProductContext();
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortOpen, setSortOpen] = useState(false);
  const { addCartItem } = useCartContext();
  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  if (loading)
    return (
      <div
        className="fixed w-full h-full z-[10000] flex items-center justify-center bg-white"
        style={{ left: 0, top: 0 }}
      >
        <img src={Loader} alt="Loading..." />
      </div>
    );

  return (
    <>
      <Breadcrumbs headline="Tất cả sản phẩm" />
      <div className="container mx-auto p-4 min-h-screen flex">
        {/* Sidebar */}
        <div className="w-1/5 p-4 flex-shrink-0">
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Bộ lọc sản phẩm</h2>
            <ul className="text-gray-500">
              <li>
                <input type="checkbox" /> Sữa chua
              </li>
              <li>
                <input type="checkbox" /> Sữa chua
              </li>
              <li>
                <input type="checkbox" /> Sữa cho mẹ bầu
              </li>
              <li>
                <input type="checkbox" /> Sữa bột
              </li>
              <li>
                <input type="checkbox" /> Sữa tươi
              </li>
              <li>
                <input type="checkbox" /> Sữa pha sẵn
              </li>
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h2 className="font-bold text-lg mb-2">Loại</h2>
            <ul className="text-gray-500">
              <li>
                <input type="checkbox" /> Sữa bột
              </li>
              <li>
                <input type="checkbox" /> Sữa pha sẵn
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Lọc giá</h2>
            <Slider
              range
              min={0}
              max={2000000}
              step={1000}
              defaultValue={[0, 2000000]}
              onChange={handleSliderChange}
              value={priceRange}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0].toLocaleString()}₫</span>
              <span>{priceRange[1].toLocaleString()}₫</span>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="w-4/5 p-4 flex-grow">
          <div className="flex justify-between mb-4">
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="bg-gray-200 px-10 py-2 rounded-lg"
              >
                Sắp xếp theo:
              </button>
              {sortOpen && (
                <div className="absolute right-0 bg-white border mt-2 rounded-lg shadow-lg">
                  <div className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/">Sản phẩm phổ biến</Link>
                  </div>
                  <div className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/">Giá thấp - cao</Link>
                  </div>
                  <div className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to="/">Giá cao - thấp</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {/* Change to 3 columns */}
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg flex flex-col items-center"
              >
                {" "}
                {/* Center items */}
                <Link
                  to="/product"
                  state={{ product: product }}
                  className="w-full"
                >
                  <div className="flex justify-center mb-2 relative">
                    <img
                      src={product.imgUrl}
                      alt={product.product_name}
                      className="w-44 h-44 object-cover"
                    />
                    {product.amount === 0 && (
                      <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          Hết hàng
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-20 mb-2 text-center w-full">
                    {" "}
                    {/* Center text */}
                    <h3
                      className="font-bold text-base overflow-hidden overflow-ellipsis"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.product_name}
                    </h3>
                  </div>
                </Link>
                <div className="flex justify-between items-center w-full">
                  <span>
                    {Number(product.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <button
                    onClick={() => addCartItem(product)}
                    disabled={product.amount === 0}
                    className={ product.amount === 0 ? "bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-not-allowed" : "bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"}
                  >
                    Thêm <FaShoppingCart className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
