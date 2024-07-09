import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdOutlineRestore } from "react-icons/md";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loader from "../../assets/loading.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchCategories } from "../../data/api";
import not_found from "../../assets/images/background/notFind.png"; // Import hình ảnh

const Filter = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const { products, loading } = useProductContext();
  const { addCartItem } = useCartContext();
  const search_name = location.state?.product_name || "";

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetchCategories();
        const categories = [...res.data.result];
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(search_name.toLowerCase())
      );

      if (selectedCategory) {
        updatedProducts = updatedProducts.filter(
          (product) => product.category_name === selectedCategory
        );
      }

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      if (selectedDiscounts.length > 0) {
        updatedProducts = updatedProducts.filter((product) => {
          return selectedDiscounts.some((discountRange) => {
            const [min, max] = discountRange.split("-").map(Number);
            return max
              ? product.discount >= min && product.discount <= max
              : product.discount >= min;
          });
        });
      }

      if (sortOption === "price-asc") {
        updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-desc") {
        updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === "popular") {
        updatedProducts = updatedProducts.sort((a, b) => b.sales - a.sales);
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [
    products,
    search_name,
    selectedCategory,
    priceRange,
    selectedDiscounts,
    sortOption,
  ]);

  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleDiscountSelect = (event) => {
    const { value } = event.target;
    setSelectedDiscounts((prevSelectedDiscounts) =>
      prevSelectedDiscounts.includes(value)
        ? prevSelectedDiscounts.filter((discount) => discount !== value)
        : [...prevSelectedDiscounts, value]
    );
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000000]);
    setSelectedDiscounts([]);
    setSortOption("");
    setCurrentPage(1);
    setFilteredProducts(products);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setSortOpen(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
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
        <div className="w-full md:w-1/5 p-4 flex-shrink-0">
          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2">Bộ lọc sản phẩm</h2>
            <ul className="text-gray-500">
              {categories.map((category) => (
                <li key={category._id}>
                  <input
                    type="radio"
                    name="category"
                    value={category.category_name}
                    checked={selectedCategory === category.category_name}
                    onChange={handleCategorySelect}
                  />{" "}
                  {category.category_name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h2 className="font-bold text-lg mb-2">Giảm giá</h2>
            <ul className="text-gray-500">
              <li>
                <input
                  type="checkbox"
                  value="0-5"
                  checked={selectedDiscounts.includes("0-5")}
                  onChange={handleDiscountSelect}
                />{" "}
                0 - 5%
              </li>
              <li>
                <input
                  type="checkbox"
                  value="5-10"
                  checked={selectedDiscounts.includes("5-10")}
                  onChange={handleDiscountSelect}
                />{" "}
                5% - 10%
              </li>
              <li>
                <input
                  type="checkbox"
                  value="10-15"
                  checked={selectedDiscounts.includes("10-15")}
                  onChange={handleDiscountSelect}
                />{" "}
                10% - 15%
              </li>
              <li>
                <input
                  type="checkbox"
                  value="15-25"
                  checked={selectedDiscounts.includes("15-25")}
                  onChange={handleDiscountSelect}
                />{" "}
                15% - 25%
              </li>
              <li>
                <input
                  type="checkbox"
                  value="25-"
                  checked={selectedDiscounts.includes("25-")}
                  onChange={handleDiscountSelect}
                />{" "}
                Hơn 25%
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
        <div className="w-full md:w-4/5 p-4 flex-grow">
          <div className="flex justify-between mb-4 items-center">
            <Link to="/filter" onClick={() => window.scrollTo(0, 0)}>
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex"
              >
                <MdOutlineRestore className="mr-2 my-auto w-5 h-5" />
                Khôi phục bộ lọc
              </button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="bg-gray-200 px-10 py-2 rounded-lg"
              >
                Sắp xếp theo
              </button>
              {sortOpen && (
                <div className="absolute right-0 bg-white border mt-2 rounded-lg shadow-lg z-10">
                  <div
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("popular")}
                  >
                    Phổ biến
                  </div>
                  <div
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("price-asc")}
                  >
                    Giá thấp - cao
                  </div>
                  <div
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSortChange("price-desc")}
                  >
                    Giá cao - thấp
                  </div>
                </div>
              )}
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
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
                ))}
              </div>
              <div className="flex justify-center items-center mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-2 bg-gray-300 rounded-lg flex items-center"
                >
                  <FaArrowLeft />
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-2 bg-gray-300 rounded-lg flex items-center"
                >
                  <FaArrowRight />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center mt-6">
              <img
                src={not_found}
                alt="No products found"
                className="w-128 h-64 mb-4"
              />{" "}
              {/* Thêm hình ảnh */}
              <p className="text-lg font-semibold">
                Không có sản phẩm phù hợp với tìm kiếm!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Filter;
