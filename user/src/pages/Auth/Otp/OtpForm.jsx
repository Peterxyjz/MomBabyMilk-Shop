import React, {useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";

const OtpForm = () => {
  const location = useLocation();
  const navigateTo = location.state?.navigateTo;
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  const user_id = user._id;
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 

  const resendMail = async (event) => {
    event.preventDefault();
    
    await axios
      .get(`http://localhost:4000/users/resend-verify-email`, {
        email,
      })
      .then((res) => {
        console.log(res.data);
      })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join(''); 

      await axios
        .get(`http://localhost:4000/users/verify-email`, {
          params: {
            user_id,
            digit: otpValue 
          }
      }).then((res) => { 
        alert("Xac thuc thanh cong");
        navigate({navigateTo});
      })
      .catch((error) => {
        let errorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          errorList.push(value);
          setErrorList(errorList);
        }
      });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động focus vào ô tiếp theo nếu đã nhập đủ 1 ký tự
    if (value && index < 5) {
      const nextInput = document.querySelectorAll('input')[index + 1];
      nextInput.focus();
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-50 ">
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12 min-w-[500px]">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-3xl font-bold">
                  <p>Xác Thực OTP</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>Chúng tôi đã gửi mã tới email của bạn: {email}</p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} >
                  <div className="flex flex-col space-y-16">
                    <div className="flex flex-row items-center justify-between mx-auto w-full">
                      {otp.map((value, index) => (
                        <div key={index} className="w-16 h-16">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            maxLength={1}
                          />
                        </div>
                      ))}
                    </div>
                    {
                      errorList.length > 0 && (
                        <div className="error-list mt-3 mb-3">
                          {errorList.map((error, index) => (
                            <p key={index} className="text-red-600">
                              {error}
                            </p>
                          ))}
                        </div>
                      )
                    }
                    <div className="flex flex-col space-y-5">
                      <div>
                        <button
                          type="submit"
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        >
                          Xác Nhận
                        </button>
                      </div>
                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Không có mã?</p>{" "}
                        <Button onClick={resendMail}>Gửi lại mã</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpForm;

