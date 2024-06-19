import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../data/api.jsx";
const SearchBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả Sản Phẩm");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
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

  let sampleProducts = [];
  if (selectedCategory === "Tất Cả Sản Phẩm") {
    products.forEach((item) => {
      if (item.isActive) sampleProducts.push(item.product_name);
    });
  } else {
    products.forEach((item) => {
      if (item.category_name === selectedCategory) {
        if (item.isActive) sampleProducts.push(item.product_name);
      }
    });
  }
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setDropdownVisible(false);
  };

  const getCategory = async () => {
    try {
      console.log("dang lay categories");
      const res =await fetchCategories();
      console.log("lay xong cate: ",res.data.result);
      const categories = [
        { category_name: "Tất Cả Sản Phẩm" },
        ...res.data.result,
      ];
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getSuggestions = (query) => {
    if (query.length < 0) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = sampleProducts.filter((product) =>
      product.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    getSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion);

    setSuggestions([]);

    const _product = products.find(
      (product) => product.product_name === suggestion
    );
    navigate("/product", { state: { product: _product } });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <form className="w-full mx-auto">
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Email
        </label>
        <div className="relative">
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center justify-between h-12 py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-[200px]"
          >
            <div>{selectedCategory}</div>
            <div>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
          </button>
          {dropdownVisible && (
            <div className="absolute left-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul
                className="border-solid py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {categories.map((category) => (
                  <li key={category._id}>
                    <button
                      type="button"
                      onClick={() =>
                        handleCategorySelect(category.category_name)
                      }
                      className="border-solid inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {category.category_name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchTerm}
            onChange={handleInputChange}
            className="block h-12 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 h-12 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-700">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        handleSuggestionSelect(suggestion);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
