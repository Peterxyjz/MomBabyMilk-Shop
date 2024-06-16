import { createContext, useContext, useEffect, useState } from "react";

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
    (amount, item) => amount + item.amount,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const removeCartItem = (id) => {
    const currentItemIndex = cartItems.findIndex((item) => item.id === id);
    const newCartItems = [...cartItems];
    newCartItems.splice(currentItemIndex, 1);
    setCartItems(newCartItems);
  };

  const addCartItem = (item) => {
    const currentCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (currentCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...currentCart, amount: currentCart.amount + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, amount: 1 }]);
    }
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, amount: item.amount + 1 }
          : item
      )
    );
  };
  
  const decreaseAmount = (id) => {
    setCartItems(prevItems => {
      const currentCart = prevItems.find(item => item.id === id);
      if (currentCart) {
        if (currentCart.amount > 1) {
          return prevItems.map(item =>
            item.id === id
              ? { ...item, amount: item.amount - 1 }
              : item
          );
        } else {
          return prevItems.filter(item => item.id !== id);
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
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
