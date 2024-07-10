import { createContext, useState, useEffect, useContext } from "react";
import { fetchProducts, fetchRefreshToken } from "../data/api.jsx";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const result = JSON.parse(localStorage.getItem("result")) || null;
  useEffect(() => {
    const getProducts = async () => {
      try {
        if(result !== null){
          await fetchRefreshToken(result).then((res) => {
            localStorage.setItem("result", JSON.stringify(res.data.result));
          }).catch(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("result");
            localStorage.removeItem("products");
            window.location.href("/");
          });
        }
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
