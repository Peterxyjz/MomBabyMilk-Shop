import axios from "axios";

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/products/all-products`);
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
    const response = await axios.get("https://script.google.com/macros/s/AKfycbz-C6H0trt5-1XR9RkmneIztfnP4raYUD_0Os-Qjwjyblx1xVCrzwCkuSJqj_LkUtVf/exec")
    
    const data = response.data.data;
    const lastPaid = data[data.length - 1];
    const lastContent = lastPaid["Mô tả"];
    const lastPrice = lastPaid["Giá trị"]; 
    if(lastPrice === price && lastContent.includes(content)){
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deleteOrder = async(id) =>{
  try {
    const res = await axios.post(`http://localhost:4000/orders/delete`,
      {
        order_id: id
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}