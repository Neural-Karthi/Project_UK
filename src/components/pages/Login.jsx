import company_logo from "../../assets/Logo.svg";
import left_banner from "../../assets/Login_banner.svg";
import arrow from "../../assets/arrow.svg";
import google_icon from "../../assets/Google_icon.svg";
import help_icon from "../../assets/help_icon.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "../cards/Loader.jsx";
import Verification from '../../assets/Verification.gif'
import { ConfirmationCard } from "../cards/ConfirmationCards.jsx";
import { Login_authentication } from "../../api_modules/Api_file.jsx";

const FormSchema = z.object({
  EmailID: z.string().email(),
  Password: z.string().min(8),
});

function Login() {
  const navigate = useNavigate();
  const [warning_message, setmessage] = useState(false);
  const [passwordtoggle, setpassword] = useState(true);
  const [loader, setloader] = useState(false);

  const {register, handleSubmit, formState: { errors },setError,} = useForm({ resolver: zodResolver(FormSchema) });
  const onSubmit = async (data) => {

    try {
      setloader(true)
      const result = await Login_authentication(data)
      console.log(result)
      if(result.Code=='200'){
            navigate("/");
            setloader(false);
      }
      if(result.Code=='404'){
            setloader(false)
            setError("Password", {
                  type: "manual",
                  message: "Email ID Not Registered",
                });
      }
    if(result.Code=='400'){
         setloader(false)
         setmessage(true)
      }
      if(result.Code=='300') {
        setloader(false)
        setError("Password", {
                type: "manual",
                message: "Incorrect password or email ID",
              });
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="w-full no-select min-h-screen laptop:h-[100dvh] flex flex-col laptop:flex-row overflow-hidden">
      {loader ? (
        <>
          <Loader />
        </>
      ) : (
        <></>
      )}
      {/* Company Logo */}
      <img
        src={company_logo}
        onClick={() => {
          navigate("/");
        }}
        className="absolute w-[100px] md:w-[150px] top-7 left-7 cursor-pointer"
        alt="Company Logo"
      />

      {/* Left Banner Section */}
      <div className="h-1/2 w-full laptop:w-1/2 laptop:h-full bg-[#F5F7FB] flex">
        <img
          src={left_banner}
          alt="Left Banner"
          className="object-cover w-full h-full "
        />
      </div>

      {/* Login Form Section */}
      <div className="h-1/2 w-full laptop:w-1/2 laptop:h-full p-5 py-10 md:p-20">
        <div className="mr-auto ml-auto w-full  cursor-default md:w-3/4 flex flex-col gap-5 md:gap-7 h-full">
          {/* Header */}
          <div>
            <h1 className="font-light text-[#858181]">LOG IN</h1>
            <h1 className="text-[#665E5E] text-2xl md:text-3xl ">
              Hi, Welcome back!
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email Input */}
            <div className="flex gap-3 flex-col">
              <h1 className="font-light text-[17px] text-[#666363]">
                Email ID
              </h1>
              <input
                {...register("EmailID")}
                className="border border-[#d1cece] w-full h-[60px] rounded-lg px-2 md:px-5"
              />
              {errors.EmailID && (
                <p className="font-light p-2 text-red-500 text-[14px]">
                  {errors.EmailID.message}*
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="flex gap-3 text-[17px] flex-col">
              <h1 className="font-light text-[#666363]">Password</h1>
              <div className="relative">
                <input
                  type={passwordtoggle ? "password" : "text"}
                  {...register("Password")}
                  className="border border-[#d1cece] w-full h-[60px] rounded-lg px-2 md:px-5"
                />
                {passwordtoggle ? (
                  <EyeInvisibleOutlined
                    className="absolute top-1/2 right-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ fontSize: "120%" }}
                    onClick={() => setpassword(false)}
                  />
                ) : (
                  <EyeOutlined
                    className="absolute top-1/2 right-3 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ fontSize: "120%" }}
                    onClick={() => setpassword(true)}
                  />
                )}
              </div>
              {errors.Password && (
                <p className="font-light p-2 text-red-500 text-[14px]">
                  {errors.Password.message}*
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex gap-3 flex-col text-right">
              <Link to="/Forgetpage" className="font-light text-[15px] text-[#3184B7] cursor-pointer">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-end">
              <button className="border w-[170px] h-[50px] gap-3 bg-[#E7ECFB] rounded-xl flex items-center justify-center text-[18px]">
                Login
                <img src={arrow} alt="Arrow" className="w-[50px]" />
              </button>
            </div>
          </form>
          {/* Divider */}
          <div className="flex items-center justify-center space-x-4">
            <hr className="w-1/4 border-gray-300" />
            <h1 className=" text-sm md:text-md font-light text-[#7B817A]">
              OR
            </h1>
            <hr className="w-1/4 border-gray-300" />
          </div>

          {/* Google Login */}
          {/* <div>
            <div className="bg-[#FDFFFC] cursor-pointer w-full h-[60px] border rounded-lg text-[#8D8989] flex gap-3 items-center justify-center">
              <img src={google_icon} alt="Google Icon" className="w-[25px]" />
              Continue with Google
            </div>
          </div> */}

          {/* Sign Up */}
          <div className="text-center font-light">
            <h1 className="text-[#8D8989]">
              Don't Have an account?{" "}
              <Link to="/signup" className="text-[#3184B7] cursor-pointer">
                Sign up
              </Link>
            </h1>
          </div>

          {/* Help Icon */}
          <div className="flex items-end justify-end py-5">
            <img
              src={help_icon}
              className="w-[50px] md:w-[80px] cursor-pointer"
              alt="Help Icon"
            />
          </div>
        </div>
      </div>
      {warning_message && (
        <ConfirmationCard
          imgdata={Verification}
          title={"Verification Pending"}
          nav={"/login"}
          data={
            "We have sent a verification link to your email ID. Please check your inbox to complete the process."
          }
        />
      )}
    </div>
  );
}

export default Login;
