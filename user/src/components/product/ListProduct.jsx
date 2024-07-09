import { FaShoppingCart } from "react-icons/fa";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import banner from "../../assets/images/body/babyDrinkMilk.png";

const ListProduct = () => {
  const { addCartItem } = useCartContext();
  const location = useLocation();
  const products = location.state?.products || [];
  const headline = location.state?.headline;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Breadcrumbs headline={headline} />
      <div
        className="relative bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${banner})`, height: "350px" }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
          <div className="md:w-1/2 lg:w-2/3 ml-10 p-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-black font-bold mb-6">
              {headline} của
              <br className="hidden md:block" />
              <span className="text-indigo-500">MomBabyMilk</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <Toaster />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(
            (product) =>
              product.isActive && (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg flex flex-col items-center"
                >
                  <Link
                    to="/product"
                    state={{ product: product }}
                    onClick={() => window.scrollTo(0, 0)}
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
                    <div className="flex flex-col justify-between">
                      {product.discount > 0 ? (
                        <>
                          <div className="text-xl font-bold text-gray-900 ">
                            {formatCurrency(
                              product.price -
                                (product.price * product.discount) / 100
                            )}
                          </div>
                          <div>
                            <span className="text-sm line-through text-gray-500">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="font-semibold text-green-500 text-md ml-2">
                              Giảm {product.discount}%
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900 mt-auto">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addCartItem(product)}
                      disabled={product.amount === 0}
                      className={
                        product.amount === 0
                          ? "bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"
                          : "bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                      }
                    >
                      Thêm <FaShoppingCart className="ml-2" />
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                index + 1 === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProduct;