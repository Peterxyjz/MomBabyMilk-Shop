import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { fetchOtp } from "../../../data/api.jsx";

const OtpForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateTo = location.state?.navigateTo;
  const email = location.state?.email;
  const user_id = location.state?.user_id;
  const result = JSON.parse(localStorage.getItem("result")) || null;

  const [errorList, setErrorList] = useState([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErrors, setOtpErrors] = useState(Array(6).fill(""));
  const [countdown, setCountdown] = useState(90);

  const resendMail = async (event) => {
    event.preventDefault();
    setCountdown(90);
    try {
      const response = await fetchOtp({
        user_id,
        digit: "",
        email,
        key: "resend",
        navigateTo,
        result,
      });
      alert(`${response.data.message}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpValue = otp.join("");
    console.log(otpValue);
    fetchOtp({
      user_id,
      digit: otpValue,
      email,
      key: "send",
      navigateTo,
      result,
    })
      .then((res) => {
        alert(`${res.data.message}`);
        console.log(res.data);
        navigate(`${navigateTo}`, { state: { user_id, digit: otpValue } });
        if (navigateTo !== "/reset-password") {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response);
        const newErrorList = [];
        for (let [key, value] of Object.entries(error.response.data.errors)) {
          newErrorList.push(value);
        }
        setErrorList(newErrorList);
      });
  };

  const handleOtpChange = (index, value) => {
    if (/[^0-9]/.test(value)) {
      const newOtpErrors = [...otpErrors];
      newOtpErrors[index] = "Chỉ nhập số.";
      setOtpErrors(newOtpErrors);
      return;
    } else {
      const newOtpErrors = [...otpErrors];
      newOtpErrors[index] = "";
      setOtpErrors(newOtpErrors);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      alert("Xác minh thất bại. Bạn sẽ được chuyển về trang chủ.");
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="relative flex flex-col justify-center overflow-hidden py-12 w-full">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-3xl font-bold">
              <p>Xác Thực OTP</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Chúng tôi đã gửi mã tới email của bạn: {email}</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Thời gian còn lại: {Math.floor(countdown / 60)}:{countdown % 60}</p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full">
                  {otp.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        id={`otp-input-${index}`}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border-solid border-2 border-[rgba(0,0,0,0.1)] text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        maxLength={1}
                      />
                      {otpErrors[index] && (
                        <p className="text-red-600 text-sm">{otpErrors[index]}</p>
                      )}
                    </div>
                  ))}
                </div>
                {errorList.length > 0 && (
                  <div className="error-list mt-3 mb-3">
                    {errorList.map((error, index) => (
                      <p key={index} className="text-red-600">
                        {error}
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-blue-700 border-none text-white shadow-sm"
                    >
                      <span className="text-xl font-semibold">Xác Nhận</span>
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-1 ">
                    <p className="text-lg font-medium text-gray-500">
                      Không có mã?
                    </p>
                    <Button type="submit" onClick={resendMail} size="small">
                      <span className="text-lg font-medium normal-case">
                        Gửi lại mã
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
