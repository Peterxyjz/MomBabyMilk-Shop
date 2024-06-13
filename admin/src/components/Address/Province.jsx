// import axios from 'axios';
// import { Dropdown } from 'primereact/dropdown';
// import React, { useState, useEffect } from 'react';

// const Province = ({ onProvinceChange }) => {
//   const [provinces, setProvinces] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProvince, setSelectedProvince] = useState(null);

//   useEffect(() => {
//     axios.get('/vietnam/tinh_tp.json')
//       .then(response => {
//         const data = response.data;
//         const formattedProvinces = Object.values(data).map(province => ({
//           label: province.name_with_type,
//           value: province.code
//         }));
//         setProvinces(formattedProvinces);
//       })
//       .catch(error => {
//         console.error('khong lay duoc tinh', error);
//         setError(error);
//       });
//   }, []);


//   const handleChange = (e) => {
//     setSelectedProvince(e.value);
//     onProvinceChange(e.value);
//   };


//   return (
//     <div>
//       <Dropdown
//         value={selectedProvince}
//         options={provinces}
//         onChange={handleChange}
//         placeholder="Chọn tỉnh/thành phố"
//         className=" w-full border border-gray-300 rounded-md"
//       />
//     </div>
//   );
// };

// export default Province;