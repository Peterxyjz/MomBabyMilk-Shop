import { createContext, useContext, useEffect, useState } from "react";

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
  const addWishlistItem = (product) => {
    const currentWishlist = wishlistItems.find(item => item._id === product._id);
    if (!currentWishlist) {
      setWishlistItems([...wishlistItems, product]);
    } else {
      alert(`${product.name} is already in your wishlist`);
    }
  };

  const removeWishlistItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addWishlistItem,
        removeWishlistItem,
        wishlistAmount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
