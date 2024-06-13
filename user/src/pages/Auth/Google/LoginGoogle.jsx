import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginGoogle() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const result = params.get("result");
    const user = params.get("user");

    console.log({ result, user }); //log thử

    localStorage.setItem("result", result);
    localStorage.setItem("user", user);
    navigate("/");
    window.location.reload();
  }, [params]);
  return <div>Login</div>;
}
