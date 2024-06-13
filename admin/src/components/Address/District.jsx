// import axios from 'axios';
// import { Dropdown } from 'primereact/dropdown';
// import React, { useState, useEffect } from 'react';

// const District = ({ provinceCode, onDistrictChange }) => {
//   const [districts, setDistricts] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);

//   useEffect(() => {
//     if (provinceCode) {
//       axios.get(`/vietnam/quan-huyen/${provinceCode}.json`)
//       .then(response => {
//         const data = response.data;
//         const formattedDistricts = Object.values(data).map(district => ({
//           label: district.name_with_type,
//           value: district.code
//         }));
//         setDistricts(formattedDistricts);
//       })
//       .catch(error => {
//         console.error('khong lay duoc quan', error);
//         setError(error);
//       });
//     }
//   }, [provinceCode]);

//   const handleChange = (e) => {
//     setSelectedDistrict(e.value);
//     onDistrictChange(e.value);
//   };

//   return (
//     <div>
//       <Dropdown
//         value={selectedDistrict}
//         options={districts}
//         onChange={handleChange}
//         placeholder="Chọn quận/huyện"
//         className=" w-full border border-gray-300 rounded-md"

//       />
//     </div>
//   );
// };

// export default District;