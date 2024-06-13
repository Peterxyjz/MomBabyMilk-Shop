import React from "react";
import Breadcrumbs from "../../../components/elements/Breadcrumb";
import logBg from "../../../assets/images/background/log-in-bg.png";
import otpImg from "../../../assets/images/auth/otp.png";
import OtpForm from "./OtpForm";
const Otp = () => {
  return (
    <>
      <Breadcrumbs headline="Mã OTP" link="/otp" />
      <div
        className={
          "w-full bg-cover bg-center flex flex-col lg:flex-row gap-8 my-4"
        }
        style={{ backgroundImage: `url(${logBg})` }}
      >
        <div className="lg:w-3/5 hidden lg:block">
          <div className="flex items-center justify-center w-full">
            <img src={otpImg} className="w-[80%]" />
          </div>
        </div>
        <div className="lg:w-2/5 w-full flex items-center justify-center">
          <OtpForm />
        </div>
      </div>
    </>
  );
};

export default Otp;
