import LogInPage from "./Log_in";
import { useState } from "react";
import RegisterPage from "./Registration";

const Auth = () => {
  let [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <LogInPage setIsLogin={setIsLogin} />
      ) : (
        <RegisterPage setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default Auth;
