import React from "react";
import Breadcrumbs from "../../../components/elements/Breadcrumb";
import logBg from "../../../assets/images/background/log-in-bg.png";
import forgotImg from "../../../assets/images/auth/forgot.png";
import ForgotPasswordForm from "./ForgotPasswordForm";
const ForgotPassword = () => {
  return (
    <>
      <Breadcrumbs headline="Quên Mật Khẩu" />
      <div
        className={
          "w-full bg-cover bg-center flex flex-col lg:flex-row gap-8 my-4"
        }
        style={{ backgroundImage: `url(${logBg})` }}
      >
        <div className="lg:w-3/5 hidden lg:block">
          <div className="flex items-center justify-center w-full h-full">
            <img src={forgotImg} className="w-[80%] h-auto" />
          </div>
        </div>
        <div className="lg:w-2/5 w-full flex items-center justify-center">
          <ForgotPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
