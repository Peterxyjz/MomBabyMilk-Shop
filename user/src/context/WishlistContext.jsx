import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};

export const WishlistContextProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const storedWishlistItems = localStorage.getItem("wishlistItems");
    return storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const wishlistAmount = wishlistItems.length;

  const checkWishlistItem = (product) => {
    return wishlistItems.find(item => item._id === product._id);
  }
  const addWishlistItem = (product) => {
    const currentWishlist = wishlistItems.find(item => item._id === product._id);
    if (!currentWishlist) {
      setWishlistItems([...wishlistItems, product]);
      toast.success(`Sản phẩm này đã được thêm vào danh sách yêu thích`, {
        position: "top-right",
      });
    } else {
      toast.error(`Sản phẩm này đã có trong danh sách yêu thích của bạn`, {
        position: "top-right",
      });
    }
  };

  const removeWishlistItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
    toast.success(`Sản phẩm đã được xóa khỏi danh sách yêu thích`, {
      position: "top-right",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        checkWishlistItem,
        addWishlistItem,
        removeWishlistItem,
        wishlistAmount,
      }}
    >
      <Toaster />
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
