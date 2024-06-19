import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts } from "../data/api.jsx";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const localProducts = localStorage.getItem("products");
        if (localProducts) {
          setProducts(JSON.parse(localProducts));
          setLoading(false);
          setTimeout(async () => {
        
            const productData = await fetchProducts();
          
            setProducts(productData);
            localStorage.setItem("products", JSON.stringify(productData));
          }, 1000);
        } else {
      
      
          const productData = await fetchProducts();
       
          setProducts(productData);
          localStorage.setItem("products", JSON.stringify(productData));
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
