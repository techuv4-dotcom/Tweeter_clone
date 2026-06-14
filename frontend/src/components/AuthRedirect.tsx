import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthRedirectProps = {
  children: ReactNode;
};

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AuthRedirect;
