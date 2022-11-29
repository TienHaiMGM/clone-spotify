import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRouter(props) {
  const token = useSelector((state) => state.loginReducer.data.token);
  return token != null ? props.children : <Navigate to={"/"} replace={true} />;
}
