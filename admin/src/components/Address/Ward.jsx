// import axios from 'axios';
// import { Dropdown } from 'primereact/dropdown';
// import React, { useState, useEffect } from 'react';

// const Ward = ({  districtCode, onWardChange  }) => {
//   const [wards, setWards] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedWard, setSelectedWard] = useState(null);

//   useEffect(() => {
//     if (districtCode) {
//       axios.get(`/vietnam/xa-phuong/${districtCode}.json`)
//       .then(response => {
//         const data = response.data;
//         const formattedWards = Object.values(data).map(district => ({
//           label: district.name_with_type,
//           value: district.code
//         }));
//         setWards(formattedWards);
//       })
//       .catch(error => {
//         console.error('khong lay duoc phuong:', error);
//         setError(error);
//       });
//     }
//   }, [districtCode]);


//   const handleChange = (e) => {
//     setSelectedWard(e.value);
//     onWardChange(e.value);
//   };

//   return (
//     <div>
//       <Dropdown
//         value={selectedWard}
//         options={wards}
//         onChange={handleChange}
//         placeholder="Chọn phường/xã"
//         className=" w-full border border-gray-300 rounded-md"
//       />
//     </div>
//   );
// };

// export default Ward;