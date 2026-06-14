import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../utils/Axios.instance";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserLogin {
  email: string;
  password: string;
}

const LogInPage: React.FC<Props> = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [showResendOtp, setshowResendOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password is required"),
  });

  const checkOtp = async () => {
    const response = await axiosInstance.post(`/users/verify_Otp`, {
      user_id: localStorage.getItem("id"),
      otp: otp,
    });

    if (response.data === true) {
      toast.success("Verification successfull");
      navigate("/home", { replace: true });
      return true;
    }

    toast.error("Verification fail");
    return false;
  };

  const formik = useFormik<UserLogin>({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };

      try {
        const response = await axiosInstance.post("/users/login", userData);

        const data = response.data;

        if (data.statusCode !== 200) {
          toast.error(data.message);
          return;
        }

        localStorage.clear();
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("email", data.data.email);
        if (data.data.is_verification === 0) {
          toast.error("You are not verifiyde");
          setshowResendOtp(true);
        } else {
          localStorage.setItem("token", data.accessToken);
          toast.success(data.message);
          navigate("/home", { replace: true });
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-[#0f172a] to-black text-white relative overflow-hidden">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_30%)]"></div>

      {/* LEFT SIDE - LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-sky-500">
              FeedSpace
            </h1>
          </div>

          {/* LOGIN CARD */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3">Welcome Back</h2>

              <p className="text-zinc-400">
                Sign in to continue to your account.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-black/40 transition-all duration-300"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {showResendOtp && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="flex-1 px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-black/40 transition-all duration-300"
                  />

                  <button
                    type="button"
                    onClick={checkOtp}
                    className="px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-300"
                  >
                    Verify
                  </button>
                </div>
              )}

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-black/40 transition-all duration-300"
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                  <input type="checkbox" className="accent-sky-500" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-sky-400 hover:text-sky-300 transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-sky-500/20"
              >
                Sign In
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-zinc-500 mt-8">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-white hover:text-sky-400 font-semibold transition"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - BIG LOGO */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10">
        {/* Big Logo */}
        <div className="text-center">
          <h1 className="text-8xl xl:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-500 bg-clip-text text-transparent">
            FeedSpace
          </h1>

          <p className="mt-6 text-2xl text-zinc-300 font-light tracking-wide">
            Connect. Share. Explore.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
