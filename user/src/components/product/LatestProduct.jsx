import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Loader from "../../assets/loading.gif";
import Breadcrumbs from "../../components/elements/Breadcrumb";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchProducts } from "../../data/api";
import toast, { Toaster } from "react-hot-toast";
import banner from "../../assets/images/body/babyDrinkMilk.png"

const LatestProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addCartItem, cartItems } = useCartContext();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetchProducts();
                console.log('API response:', res);

                if (res && Array.isArray(res)) {
                    const sortedProducts = res.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    const newProducts = sortedProducts.slice(-10).reverse();
                    setProducts(newProducts);
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

    const handleAddToCart = (product) => {
        const currentCart = cartItems.find(
            (cartItem) => cartItem._id === product._id
        );
        if (currentCart && currentCart.quantity >= product.amount) {
            toast.error("Số lượng mua vượt quá số lượng trong kho", {
                position: "top-right",
            });
        } else {
            addCartItem(product);
            toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
                position: "top-right",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <img src={Loader} alt="Loading..." />
            </div>
        );
    }

    return (
        <>
            <Breadcrumbs headline="Sản phẩm mới nhất" />
            <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${banner})`, height: '500px' }}>
                <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
                    <div className="md:w-1/2 lg:w-2/3 ml-10 p-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-black font-bold mb-6">
                            Sản phẩm mới nhất của<br className="hidden md:block" />
                            <span className="text-indigo-500">MomBabyMilk</span>
                        </h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4 mb-4">
                <Toaster />
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
                                    onClick={() => handleAddToCart(product)}
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
        </>
    );
};

export default LatestProduct;
