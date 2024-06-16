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
// new Store().getProvince().then((provinces) => {
//   console.log(provinces);
// });

// class RenderUI
// class RenderUI {
//   constructor() {}
//   //hàmn hận vào danh sáhc các province và render lên giao diện
//   renderProvinces(provinces) {
//     let htmlContent = "";
//     provinces.forEach((province) => {
//       const { id, name } = province;
//       htmlContent += `<option value="${id}">${name}</option>`;
//     });
//     //nehst voo
//     document.querySelector("#province").innerHTML = htmlContent;
//   }

//   //hàmn hận vào danh sáhc các district và render lên giao diện
//   renderDistrict(districts) {
//     let htmlContent = "";
//     districts.forEach((district) => {
//       const { id, name } = district;
//       htmlContent += `<option value="${id}">${name}</option>`;
//     });
//     //nehst voo
//     document.querySelector("#district").innerHTML = htmlContent;
//   }

//   //hàmn hận vào danh sáhc các wards và render lên giao diện
//   renderWards(wards) {
//     let htmlContent = "";
//     wards.forEach((ward) => {
//       const { id, name } = ward;
//       htmlContent += `<option value="${id}">${name}</option>`;
//     });
//     //nehst voo
//     document.querySelector("#ward").innerHTML = htmlContent;
//   }
//   renderInformation(infor) {
//     const { province, district, ward, address } = infor;
//     let htmlContent = `${address}, ${ward}, ${district}, ${province}`;
//     document.querySelector("#information").innerHTML = htmlContent;
//   }
// }
// //
// //sự kiện khi load trang //todo-------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", async (event) => {
//   let store = new Store();
//   let ui = new RenderUI();
//   //
//   const provinces = await store.getProvince();

//   //render danh sach province lên ui
//   ui.renderProvinces(provinces);

//   //lấy province code hiện tại
//   let provinceCode = document.querySelector("#province").value;
//   const districts = await store.getDistrictByProvinceCode(provinceCode);

//   // render các quận ra ui
//   ui.renderDistrict(districts);
//   //lấy districtCode hiện tại
//   let districtCode = document.querySelector("#district").value;
//   const wards = await store.getWardByDistrictCode(districtCode);

//   //render wards lên ui
//   ui.renderWards(wards);
// });
// //-----------------------------------------------------------------------------------
// //sự kiện khi thay đổi province  //todo-------------------------------------------------------------
// document
//   .querySelector("#province")
//   .addEventListener("change", async (event) => {
//     let store = new Store();
//     let ui = new RenderUI();
//     let provinceCode = document.querySelector("#province").value;
//     // render lại quận

//     const districts = await store.getDistrictByProvinceCode(provinceCode);

//     // render các quận ra ui
//     ui.renderDistrict(districts);
//     //lấy districtCode hiện tại
//     let districtCode = document.querySelector("#district").value;
//     const wards = await store.getWardByDistrictCode(districtCode);

//     //render wards lên ui
//     ui.renderWards(wards);
//   });
// //-----------------------------------------------------------------------------------
// //sự kiện khi thay đổi district  //todo-------------------------------------------------------------
// document
//   .querySelector("#district")
//   .addEventListener("change", async (event) => {
//     let store = new Store();
//     let ui = new RenderUI();
//     let districtCode = document.querySelector("#district").value;
//     // render lại quận
//     const wards = await store.getWardByDistrictCode(districtCode);

//     //render wards lên ui
//     ui.renderWards(wards);
//   });

// //khi submit
// document.querySelector("form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   let province = document.querySelector("#province option:checked").innerHTML;
//   let district = document.querySelector("#district option:checked").innerHTML;
//   let ward = document.querySelector("#ward option:checked").innerHTML;
//   let address = document.querySelector("#address").value;
//   //   console.log(address);
//   let infor = {
//     address,
//     ward,
//     district,
//     province,
//   };
//   let ui = new RenderUI();
//   //làm 1 hàm renderInformation
//   ui.renderInformation(infor);
// });
