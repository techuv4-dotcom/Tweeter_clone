import React from "react";

const logout: React.FC = () => {
  localStorage.removeItem("token");
};

export default logout;
