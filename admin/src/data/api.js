import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const res = await axios.get(`http://localhost:4000/products/all-products`);
        return res.data.result;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchOrder = async () => {
    try {
        const res = await axios.get(`http://localhost:4000/orders/all-orders`);
        return res.data.result
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}