import { useWishlistContext } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const ShoppingWishlist = () => {
  const { wishlistItems } = useWishlistContext();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 my-6">
      {wishlistItems.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-xl font-semibold">Không có sản phẩm yêu thích</p>
        </div>
      ) : (
        wishlistItems.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg flex flex-col items-center"
          >
            {" "}
            {/* Center items */}
            <Link to="/product" state={{ product: product }} className="w-full">
              <div className="flex justify-center mb-2">
                <img
                  src={product.imgUrl}
                  alt={product.product_name}
                  className="w-44 h-44 object-cover"
                />{" "}
                {/* Larger image */}
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
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                Thêm <FaShoppingCart className="ml-2" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShoppingWishlist;
