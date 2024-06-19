import axios from "axios";



const SCHEMA_HOSTNAME = import.meta.env.VITE_SCHEMA_HOSTNAME;



//get-prodduct
export const fetchProductById = async (id) => {
    return fetch(`${SCHEMA_HOSTNAME}/products/product/${id}`)
}

//get-all-brand
export const fetchBrandStaff = async () => {
    return     fetch(`${SCHEMA_HOSTNAME}/brands/all-brands`)
}

//get-categories
export const fetchCategories = async () => {
  return fetch(`${SCHEMA_HOSTNAME}/categories/all-categories`);
};

//upload -bill
export const fetchUploadBill = async (inputBill, token) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/inputBills/uploads`,
    inputBill,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
};

//get-all-user
export const fetchAllUsers = async (result) => {
  return await axios.get(`${SCHEMA_HOSTNAME}/users/get-all-user`, {
    headers: {
      Authorization: `Bearer ${result.access_token}`,
    },
  });
};

//updateProduct
export const fetchUpdateProduct = async (product, token, id) => {
  return await axios.patch(
    `${SCHEMA_HOSTNAME}/products/product/${id}`,
    {
      brand_id: product.brand_id,
      category_id: product.category_id,
      product_name: product.product_name,
      price: product.price,
      description: product.description,
      age: product.age,
      discount: product.discount,
      imgUrl: product.imgUrl,
      isActive: product.isActive,
    },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
};

//upload
export const fetchUploadProduct = async (product, token) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/products/upload`,
    { ...product },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
};

//reset-pssword:
export const fetchResetPassword = async ({
  user_id,
  digit,
  password,
  confirm_password,
}) => {
  await axios.post(
    `${SCHEMA_HOSTNAME}/users/reset-password`,
    {
      password,
      confirm_password,
    },
    {
      params: {
        user_id: user_id,
        digit: digit,
      },
    }
  );
};

//otp
export const fetchOtp = async ({ user_id, digit, email, key }) => {
  if (key === "resend") {
    return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
      email,
    });
  } else {
    return await axios.get(
      `${SCHEMA_HOSTNAME}/users/verify-forgot-password`,
      {
        params: {
          user_id,
          digit: digit,
        },
      }
    );
  }
};

//login
export const fetchLogin = async (email, password) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/login-admin-staff`, {
    email,
    password,
  });
};

//forgot-password
export const fetchForgotPassword = async (email) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
    email,
  });
};

//get-all-brand
export const fetchBrands = async () => {
  return await axios.get(`${SCHEMA_HOSTNAME}/brands/all-brands`);
};

//addbrand
export const fetchAddBrand = async (brand, token) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/brands/upload`,
    { ...brand },
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
};
//logout
export const fetchLogout = async (result) => {
  return await axios.post(
    `${SCHEMA_HOSTNAME}/users/logout`,
    {
      refresh_token: result.refresh_token,
    },
    {
      headers: {
        Authorization: `Bearer ${result.access_token}`,
      },
    }
  );
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${SCHEMA_HOSTNAME}/products/all-products`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchOrder = async () => {
  try {
    const res = await axios.get(`${SCHEMA_HOSTNAME}/orders/all-orders`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
