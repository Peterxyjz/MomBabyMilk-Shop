import axios from "axios";


const SCHEMA_HOSTNAME = import.meta.env.VITE_SCHEMA_HOSTNAME;

//fetchGetVoucher 
export const fetchGetVoucher = async (voucherCode) => {
  return await axios
  .get(`${SCHEMA_HOSTNAME}/vouchers/voucher/${voucherCode}`)
}


//reset-pssword:
export const fetchResetPassword = async (
  user_id,
  digit,
  password,
  confirm_password
) => {
  return await axios.post(
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

//registter
export const fetchRegister = async ({
  username,
  email,
  password,
  confirm_password,
}) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/register`, {
    username,
    email,
    password,
    confirm_password,
  });
};

//login

export const fetchLogin = async ({ email, password }) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/login`, {
    email,
    password,
  });
};

//OTP:
export const fetchOtp = async ({
  user_id,
  digit,
  email,
  key,
  navigateTo,
  result,
}) => {
  const apiList = [
    {
      navigateTo: "/",
      methodHander: "get",
      handlerOtp: `${SCHEMA_HOSTNAME}/users/verify-email`,
      methodResend: "post",
      handlerResendOtp: `${SCHEMA_HOSTNAME}/users/resend-verify-email`,
      data: {
        headers: {
          Authorization: `Bearer ${result === null ? "" : result.access_token}`,
        },
      },
    },
    {
      navigateTo: "/reset-password",
      methodHander: "get",
      handlerOtp: `${SCHEMA_HOSTNAME}/users/verify-forgot-password`,
      methodResend: "post",
      handlerResendOtp: `${SCHEMA_HOSTNAME}/users/forgot-password`,
      data: {
        headers: {
          Authorization: `Bearer ${result === null ? "" : result.access_token}`,
        },
      },
    },
  ];

  const apiFormValue = {
    methodHander: "",
    handlerOtp: "",
    methodResend: "",
    handlerResendOtp: "",
    data: {},
  };

  apiList.find((item) => {
    if (item.navigateTo === navigateTo) {
      apiFormValue.methodHander = item.methodHander;
      apiFormValue.handlerOtp = item.handlerOtp;
      apiFormValue.methodResend = item.methodResend;
      apiFormValue.handlerResendOtp = item.handlerResendOtp;
      apiFormValue.data = item.data;
    }
  });

  if (key === "resend") {
    return await axios({
      method: apiFormValue.methodResend,
      url: apiFormValue.handlerResendOtp,
      body: { email },
      ...apiFormValue.data,
    });
  } else {
    return await axios({
      method: apiFormValue.methodHander,
      url: apiFormValue.handlerOtp,
      params: { user_id, digit: digit },
    });
  }
};

//fortgot password

export const fetchForgotPassword = async ({ email }) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/users/forgot-password`, {
    email,
  });
};

//logout
export const fetchLogout = async (result) => {
  await axios.post(
    "${SCHEMA_HOSTNAME}/users/logout",
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

//order
export const fetchOrder = async (order_infor) => {
  return await axios.post(`${SCHEMA_HOSTNAME}/orders/upload`, order_infor);
};

export const fetchProducts = async () => {
  try {
    console.log("dang lay products");
    const res = await axios.get(`${SCHEMA_HOSTNAME}/products/all-products`);
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//categori

export const fetchCategories = async () => {
  return await axios.get(`${SCHEMA_HOSTNAME}/categories/all-categories`);
};

export const displayProducts = async (page, limit) => {
  try {
    const res = await axios.get(
      `${SCHEMA_HOSTNAME}/products/all-products-page`,
      {
        params: {
          page: page,
          limit: limit,
        },
      }
    );
    return res.data.result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//todo API province

const baseUrl = "https://open.oapi.vn/location";

class Http {
  // get:
  async get(url) {
    console.log(url);
    const response = await fetch(url);
    if (response.ok) {
      console.log(url);
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  }
}
// class Storage()
class Store {
  constructor() {
    this.http = new Http();
  }
  //getProvince() : lấy  nhiều tp theo code
  async getProvince() {
    try {
      const provinces = await this.http.get(`${baseUrl}/provinces?&size=64`);

      return provinces.data;
    } catch (error) {
      console.log(error);
    }
  }

  //lấy danh sách các quận dựa vào provinceCode
  async getDistrictByProvinceCode(provinceCode = 1) {
    try {
      const districts = await this.http.get(
        `${baseUrl}/districts?provinceId=${provinceCode}&size=705 `
      );
      return districts.data;
    } catch (error) {
      console.log(error);
    }
  }
  //lấy danh sách các huyện phường dựa vào districtCode
  async getWardByDistrictCode(districtCode = 271) {
    try {
      const wards = await this.http.get(
        `${baseUrl}/wards?districtId=${districtCode}&size=10603`
      );

      return wards.data;
    } catch (error) {
      console.log(error);
    }
  }
}
const store = new Store();
export const getProvinces = async () => {
  const provinces = await store.getProvince();
  return provinces;
};

export const getDistricts = async (id) => {
  const districts = await store.getDistrictByProvinceCode(id);
  return districts;
};
export const getWards = async (id) => {
  const wards = await store.getWardByDistrictCode(id);
  return wards;
};

export const checkQRPaymet = async (content, price) => {
  try {
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbz-C6H0trt5-1XR9RkmneIztfnP4raYUD_0Os-Qjwjyblx1xVCrzwCkuSJqj_LkUtVf/exec"
    );

    const data = response.data.data;
    const lastPaid = data[data.length - 1];
    const lastContent = lastPaid["Mô tả"];
    const lastPrice = lastPaid["Giá trị"];
    if (lastPrice === price && lastContent.includes(content)) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.post(`${SCHEMA_HOSTNAME}/orders/delete`, {
      order_id: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
