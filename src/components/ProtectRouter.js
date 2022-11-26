import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectRouter(props) {
  const token = useSelector((state) => state.loginReducer.data.token);
  return token != null ? props.children : <Navigate to={"/"} replace={true} />;
}
