import Logo from "../../assets/Company_logo_2.svg";
import app1 from "../../assets/instragram.svg";
import app2 from "../../assets/facebook.svg";
import app3 from "../../assets/twitter.svg";
import app4 from "../../assets/youtube.svg";
import icon from "../../assets/footerjobIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import {Help_Component} from '../cards/ConfirmationCards'
import { useState } from "react";
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const nav_homepage = (locationPath) => {
    if (location.pathname === locationPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname === locationPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(locationPath);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    }
  };
  const [helptoggle,sethelptoggle]=useState(false)
  const help_toggle=()=>{
    sethelptoggle(!helptoggle)
  }


  return (
    <div className="relative no-select">
       {
      helptoggle &&(
        <Help_Component toggle={help_toggle}/>
      )
    }
      <svg
        className="w-full  absolute top-0 border-black"
        viewBox="0 0 1728 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M240.415 0C126.272 0 29.9121 39.6269 -4 59.4404V148.5H1728V58.2021C1696.98 69.3472 1472.42 75.5389 1364.48 47.057C1256.54 18.5751 1053.07 3.71502 926.516 18.5751C801.381 33.2691 752.671 32.2226 640.041 29.8028L636.195 29.7202C520.811 27.2435 383.095 0 240.415 0Z"
          fill="black"
        />
      </svg>

      <div className="w-full  absolute top-6 md:top-16 bg-black  flex  items-center">
        <div className=" w-[95%] py-10 mr-auto ml-auto  2xl:px-14 flex flex-col md:flex-row">
          <div className="py-5 md:py-0 px-5 md:px-0 md:w-2/6  flex flex-col gap-3 md:gap-4 ">
            <div className="h-1/6  flex items-end">
              <img
                src={Logo}
                alt=""
                className="md:px-5 laptop:px-8 2xl:px-16 w-[250px] md:w-[400px]"
              />
            </div>
            <div className="h-2/6  text-white md:px-5 laptop:px-8 2xl:px-16  ">
              <p className="font-extralight laptop:w-[90%] pb-3 md:pb-o  md:py-3 text-justify">
                Providing smart and efficient tools to help job seekers land
                their dream job with confidence and ease.{" "}
              </p>
              <hr className="w-[55%] mr-auto "></hr>
            </div>
            <div className="h-2/6 md:px-5 laptop:px-8  2xl:px-16  ">
              <div className="flex items-center flex-row gap-3">
                <img src={app1} alt="" className="w-[35px]" />
                <img src={app2} alt="" className="w-[35px]" />
                <img src={app3} alt="" className="w-[35px]" />
                <img src={app4} alt="" className="w-[35px]" />
              </div>
            </div>
            <div className="flex-1 flex  text-white font-extralight text-[10px] laptop:text-[16px] gap-3  md:px-5 laptop:px-8 2xl:px-16  py-5 ">
              <p>Privacy Policy </p>
              <p>Contact us </p>
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="flex-1  hidden md:block ">
            <div className=" h-[10%] text-white flex items-center px-16">
              Company
            </div>
            <div
              className=" h-[10%] text-white font-extralight flex items-center px-16 cursor-pointer"
              onClick={() => nav_homepage("/")}
            >
              Home
            </div>
            <div
              className=" h-[10%] text-white font-extralight flex items-center px-16"
              onClick={() => nav_homepage("/Pricing")}
            >
              Pricing
            </div>
            {/* <div className=" h-[10%] text-white font-extralight flex items-center px-16">
              Our Story
            </div> */}
            <div className=" h-[10%] text-white font-extralight flex items-center px-16" onClick={help_toggle}>
              Help
            </div>
          </div>
          {/* <div className="flex-1  hidden md:block ">
            <div className=" h-[10%] text-white flex items-center px-16">
              Resources
            </div>
            <div className=" h-[10%] text-white font-extralight flex items-center px-16">
              Blog
            </div>
          </div> */}
          <div className="flex-1">
            <img src={icon} className="p-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
