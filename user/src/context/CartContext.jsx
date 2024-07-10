import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartAmount = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce((total, item) => {
    const discount = parseFloat(item.discount) / 100;
    const itemTotal = item.price * item.quantity * (1 - discount);
    return total + itemTotal;
  }, 0);

  const removeCartItem = (id) => {
    const currentItemIndex = cartItems.findIndex((item) => item._id === id);
    const newCartItems = [...cartItems];
    newCartItems.splice(currentItemIndex, 1);
    setCartItems(newCartItems);
    toast.success("Sản phẩm đã được xóa khỏi giỏ hàng", {
      position: "top-right",
      duration: 1000,
    });
  };

  const addCartItem = (product) => {
    setCartItems((prevCartItems) => {
      const currentCart = prevCartItems.find(
        (cartItem) => cartItem._id === product._id
      );
      if (currentCart) {
        if (currentCart.quantity >= product.amount) {
          toast.error("Số lượng mua vượt quá số lượng trong kho", {
            position: "top-right",
            duration: 1000,
          });
          return prevCartItems;
        } else {
          return prevCartItems.map((cartItem) =>
            cartItem._id === product._id
              ? { ...currentCart, quantity: currentCart.quantity + 1 }
              : cartItem
          );
        }
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });

    toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
      position: "top-right",
      duration: 1000,
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (product) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === product._id && item.quantity < product.amount
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    const currentCart = cartItems.find((item) => item._id === product._id);
    if (currentCart && currentCart.quantity >= product.amount) {
      toast.error(`Số lượng mua vượt quá số lượng trong kho`, {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const decreaseAmount = (id) => {
    setCartItems((prevItems) => {
      const currentCart = prevItems.find((item) => item._id === id);
      if (currentCart) {
        if (currentCart.quantity > 1) {
          return prevItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevItems.filter((item) => item._id !== id);
        }
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartAmount,
        totalPrice,
        increaseAmount,
        decreaseAmount,
        addCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      <Toaster />
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
