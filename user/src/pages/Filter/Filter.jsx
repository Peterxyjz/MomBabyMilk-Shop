import React, { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import Loader from '../../assets/loading.gif';

const Filter = () => {
    const { products, loading } = useProductContext();
    const [sortOpen, setSortOpen] = useState(false);
    const [price, setPrice] = useState(500000);
    const [quantities, setQuantities] = useState(Array(8).fill(1)); // Assuming 8 products for example
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9; // Adjust this number as needed

    if (loading)
        return (
            <div
                className="fixed w-full h-full z-[10000] flex items-center justify-center bg-white"
                style={{ left: 0, top: 0 }}
            >
                <img src={Loader} alt="Loading..." />
            </div>
        );

    const handleQuantityChange = (index, delta) => {
        setQuantities(prev => {
            const newQuantities = [...prev];
            newQuantities[index] = Math.max(1, newQuantities[index] + delta);
            return newQuantities;
        });
    };

    const totalPages = Math.ceil(products.length / productsPerPage);
    const displayedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <div className="container mx-auto p-4">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 p-4">
                    <div>
                        <h2 className="font-bold text-lg mb-2">Categories</h2>
                        <ul>
                            <li><input type="checkbox" /> Fruits & Vegetables (15)</li>
                            <li><input type="checkbox" /> Bakery, Cake & Dairy (12)</li>
                            <li><input type="checkbox" /> Beverages (20)</li>
                            <li><input type="checkbox" /> Snacks & Branded Foods (5)</li>
                            <li><input type="checkbox" /> Beauty & Household (30)</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="font-bold text-lg mb-2">Price</h2>
                        <input type="range" min="0" max="1000000" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full" />
                        <div>₫{new Intl.NumberFormat().format(price)}</div>
                    </div>
                    <div className="mt-4">
                        <h2 className="font-bold text-lg mb-2">Discount</h2>
                        <ul>
                            <li><input type="checkbox" /> Upto 5% (6)</li>
                            <li><input type="checkbox" /> 5% - 10% (8)</li>
                            <li><input type="checkbox" /> 10% - 15% (10)</li>
                            <li><input type="checkbox" /> 15% - 25% (14)</li>
                            <li><input type="checkbox" /> More than 25% (13)</li>
                        </ul>
                    </div>
                </div>
                {/* Main Content */}
                <div className="w-3/4 p-4">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Products</h2>
                        <div className="relative">
                            <button onClick={() => setSortOpen(!sortOpen)} className="bg-gray-200 px-4 py-2 rounded-lg">
                                Sort By: Most Popular
                            </button>
                            {sortOpen && (
                                <div className="absolute right-0 bg-white border mt-2 rounded-lg shadow-lg">
                                    <a href="#" className="block px-4 py-2">Popularity</a>
                                    <a href="#" className="block px-4 py-2">Low - High Price</a>
                                    <a href="#" className="block px-4 py-2">High - Low Price</a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {displayedProducts.map((product, index) => (
                            <div key={product.id} className="border p-4 rounded-lg">
                                <img src={product.imgUrl} alt={product.product_name} className="w-full h-40 object-cover mb-2" />
                                <h3 className="font-bold text-lg">{product.product_name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <div>
                                        {product.discount > 0 ? (
                                            <>
                                                <span className="text-red-500">{Number(product.price - (product.price * (product.discount / 100))).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}</span>
                                                <span className="line-through">{Number(product.price).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}</span>
                                            </>
                                        ) : (<span>{Number(product.price).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}</span>)
                                        }
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleQuantityChange(index, -1)} className="bg-gray-200 px-2 rounded-l-lg">-</button>
                                        <input type="text" value={quantities[index]} readOnly className="w-12 text-center border-t border-b" />
                                        <button onClick={() => handleQuantityChange(index, 1)} className="bg-gray-200 px-2 rounded-r-lg">+</button>
                                    </div>
                                </div>
                                <button className="bg-green-500 text-white w-full mt-2 py-2 rounded-lg">Add</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="bg-gray-200 px-4 py-2 mx-1 rounded-lg"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`bg-gray-200 px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-gray-400' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="bg-gray-200 px-4 py-2 mx-1 rounded-lg"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
