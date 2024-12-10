import company_logo from "../../assets/Logo.svg";
import left_banner from "../../assets/Login_banner.svg";
import arrow from "../../assets/arrow.svg";
import google_icon from "../../assets/Google_icon.svg";
import help_icon from "../../assets/help_icon.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "../cards/Loader.jsx";
import { ConfirmationCard } from "../cards/ConfirmationCards.jsx";
import Reset from "../../assets/Reset.gif";
import { Forget_module } from "../../api_modules/Api_file.jsx";

const FormSchema = z.object({
  EmailID: z.string().email(),
});

function ForgetPage() {
  const navigate = useNavigate();
  const [warning_message, setmessage] = useState(false);
  const [loader, setloader] = useState(false);

  const { register,handleSubmit,formState: { errors },setError,} = useForm({ resolver: zodResolver(FormSchema) });

  const onSubmit = async (data) => {
    try {
      setloader(true);
      const result = await Forget_module(data);
      if (result.Code == 200) {
        setloader(false);
        setmessage(true);
      }
      if (result.Code == "404") {
        setloader(false);
        setError("EmailID", {
          type: "manual",
          message: "Email ID Not Registered",
        });
      }
    } catch (error) {
      console.log(error);
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
          <div className="flex flex-col gap-2">
            <h1 className="text-[#665E5E] text-2xl md:text-3xl ">
              Forget Password
            </h1>
            <h1 className="font-light text-[#858181]">
              we'll send you a link to reset your password
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

            {/* Login Button */}
            <div className="flex items-center justify-end">
              <button className="border w-[170px] h-[50px] gap-3 bg-[#E7ECFB] rounded-xl flex items-center justify-center text-[18px]">
                Submit
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
              <Link to="/login" className="text-[#3184B7] cursor-pointer">
                Signin
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
          imgdata={Reset}
          title={"Reset Link Has Been Sent"}
          nav={"/login"}
          data={
            "We have sent a Password reset link to your email ID. Please check your inbox to change your password."
          }
        />
      )}
    </div>
  );
}

export default ForgetPage;
