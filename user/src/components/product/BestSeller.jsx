import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Loader from "../../assets/loading.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchProducts } from "../../data/api";

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addCartItem } = useCartContext();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetchProducts();
                console.log('API response:', res); // In toàn bộ phản hồi API để kiểm tra

                if (res && Array.isArray(res)) {
                    const sortedProducts = res.sort((a, b) => b.sales - a.sales);
                    const topProducts = sortedProducts.slice(0, 12);
                    setProducts(topProducts);
                } else {
                    console.error("API response is not as expected.");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <img src={Loader} alt="Loading..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Breadcrumbs headline="Sản phẩm bán chạy" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border p-4 rounded-lg flex flex-col items-center"
                    >
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
                                        <span className="text-white text-xl font-bold">Hết hàng</span>
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
                            <span>
                                {Number(product.price).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
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
        </div>
    );
};

export default BestSeller;
