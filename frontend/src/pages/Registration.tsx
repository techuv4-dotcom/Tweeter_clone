import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../utils/Axios.instance";

interface Props {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC<Props> = ({ setIsLogin }) => {
  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [user_id, setUserId] = useState<number>();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Please re-enter password"),
  });

  const checkOtp = async () => {
    console.log(user_id);
    const response = await axiosInstance.post(`/users/verify_Otp`, {
      user_id: user_id,
      otp: otp,
    });
    if (response.data === true) {
      toast.success("Verification successfull");
      setIsLogin(true);
      return true;
    }
    toast.error("Verification fail");
    return false;
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues,
    validationSchema,

    onSubmit: async (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      /*  user creation */

      try {
        const response = await axiosInstance.post("/users", userData);
        console.log(response);
        const data = response.data;

        if (data.statusCode === 401) {
          toast.error("status code 401 mila");
          console.log(data.message);
          return;
        }

        if (data.statusCode !== 201) {
          toast.error(data.message);
          return;
        }
        (setUserId(data.data.id), console.log(data));

        console.log(user_id);

        toast.success("User registered successfully");
        if (data.data.is_verification === 1) {
          setIsLogin(true);
        } else {
          setShowOtp(true);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-[#0f172a] to-black text-white relative overflow-hidden">
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_30%)]"></div>

      {/* LEFT SIDE - REGISTER */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-sky-500">
              FeedSpace
            </h1>
          </div>

          {/* REGISTER CARD */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-3">Create Account</h2>

              <p className="text-zinc-400">
                Join the conversation and connect with people worldwide.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-black/40 transition-all duration-300"
                />

                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.name}
                  </p>
                )}
              </div>

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
              {/* OTP */}

              {showOtp && (
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

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-sky-500 focus:bg-black/40 transition-all duration-300"
                />

                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-sky-500/20"
              >
                Create Account
              </button>
            </form>

            {/* FOOTER */}
            <p className="text-center text-zinc-500 mt-8">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-white hover:text-sky-400 font-semibold transition"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - BIG LOGO */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10">
        {/* Logo Content */}
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

export default RegisterPage;
