import { useWishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
const ShoppingWishlist = () => {
  const { wishlistItems, removeWishlistItem } = useWishlistContext();
  const { addCartItem } = useCartContext();
  return (
    <div className=" my-6">
      {wishlistItems.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-xl font-semibold">Không có sản phẩm yêu thích</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg flex flex-col items-center relative"
            >
              <button
                onClick={() => removeWishlistItem(product._id)}
                className="absolute top-2 right-2 text-white bg-[#dc3545] p-0.5 rounded-full hover:bg-red-700 focus:outline-none shadow-lg z-50"
              >
                <FaTimes className="w-5 h-5" />
              </button>
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
      )}
    </div>
  );
};

export default ShoppingWishlist;
