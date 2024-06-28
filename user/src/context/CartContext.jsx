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
  };

  const addCartItem = (product) => {
    const currentCart = cartItems.find((cartItem) => cartItem._id === product._id);
    if (currentCart) {
      if (currentCart.quantity < product.amount) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem._id === product._id
              ? { ...currentCart, quantity: currentCart.quantity + 1 }
              : cartItem
          )
        );
      } else {
        alert(`Maximum quantity of ${product.amount} reached for ${product.name}`);
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseAmount = (product) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === product._id && item.quantity < product.amount
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    const currentCart = cartItems.find(item => item._id === product._id);
    if (currentCart && currentCart.quantity >= product.amount) {
      alert(`Maximum quantity of ${product.amount} reached for ${product.name}`);
    }
  };

  const decreaseAmount = (id) => {
    setCartItems(prevItems => {
      const currentCart = prevItems.find(item => item._id === id);
      if (currentCart) {
        if (currentCart.quantity > 1) {
          return prevItems.map(item =>
            item._id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevItems.filter(item => item._id !== id);
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
