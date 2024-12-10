import React from "react";
import { Header } from "../cards/header";
import Person_pricing_page from "../../assets/Person_pricing_page.svg";
import Footer from "../cards/Footer";
import Chat from "../cards/Chat";
import left_arrow from '../../assets/left_arrow.svg'
import right_arrow from '../../assets/right_arrow.svg'
import { New_Payment_request } from "../../api_modules/Api_file";
function Price() {
  const pricingdata = {
    0: {
      Name: "Basic Plan",
      price: 80,
      Applications: 50,
      features: [
        "Tailored CV for each application",
        "Tailored cover letter for each application",
        "Personal Career Assistant",
      ],
      features_avalible: [1, 1, 0],
    },
    1: {
      Name: "Premium Plan",
      price: 140,
      Applications: 100,
      features: [
        "Tailored CV for each application",
        "Tailored cover letter for each application",
        "Personal Career Assistant to guide and support your job search",
      ],
      features_avalible: [1, 1, 1],
    },
    2: {
      Name: "Premium Plus Plan",
      price: 250,
      Applications: 200,
      features: [
        "Tailored CV for each application",
        "Tailored cover letter for each application",
        "Personal Career Assistant for one-on-one support throughout your job search journey",
      ],
      features_avalible: [1, 1, 1],
    },
  };


  const onsubmit=(data)=>{
    New_Payment_request(pricingdata[data].Name)
  }


  return (
    <div className="no-select">
      <Header title="Pricing" />

      <div className="bg w-full ">
        <div className="flex flex-col gap-3 items-center justify-center py-5">
          <div className="w-[100px] h-[30px] flex items-center justify-center rounded-full font-light bg-[#FCE097]">
            Price
          </div>
          <h1 className="text-[24px] md:text-[28px] laptop:text-[35px] text-center">
            Our best pricing plan
            <p className="font-light text-[#676363] text-[13px] md:text-[17px] laptop:text-[22px]">
              Affordable Plans Tailored to Your Job Search Needs
            </p>
          </h1>
          <div className=" w-full p-5 flex gap-8 flex-col laptop:flex-row items-center justify-center">
            {" "}
            {/* Added justify-center */}
            {/* Card 1 */}
            {Object.keys(pricingdata).map((key) => (
              <>
                <div className="h-[500px] w-full max-w-[400px] laptop:max-w-[450px] py-5 rounded-3xl  relative card_shadow bg-white" >
                  
                  {
                    key==1?(<>
                    <div className="absolute top-3 right-3 flex items-center font-light justify-center bg-[#D9E5FE] w-[38%] h-[35px] text-[15px] rounded-xl">
                        <h1>Most Selected</h1>
                    </div>
                    </>):(<></>)
                  }

                  <div className="h-[25%] flex items-center justify-center">
                    <h1 className="text-[50px] font-bold">
                      £{pricingdata[key].price}
                      <span className="text-[20px] font-normal text-[#676363]">
                        /{pricingdata[key].Applications} Applications
                      </span>
                    </h1>
                  </div>
                  <div className="h-[50%] py-1">
                    <h1 className="font-medium text-[22px] text-center underline underline-offset-4 pb-5">
                      {pricingdata[key].Name}
                    </h1>
                    <div className="flex flex-col w-full px-5 laptop:px-6 gap-5">
                      <div className="flex flex-col py-2 gap-4">
                        {pricingdata[key].features.map((features, index) => {
                          // Check if the corresponding value in features_avalible is not zero
                          if (pricingdata[key].features_avalible[index] !== 0) {
                            return (
                              <div className="flex gap-3" key={index}  >
                                <div className="w-[8%]">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                                      stroke="#4ECB71"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <h1 className="flex-1 text-justify text-[13px] laptop:text-[16px] pr-3">
                                  {features}
                                </h1>
                              </div>
                            );
                          } else {
                            return (
                              <div className="flex gap-3" key={index}>
                                <div className="w-[8%]">
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.758 17.2428L12.001 11.9998L17.244 17.2428M17.244 6.75684L12 11.9998L6.758 6.75684"
                                      stroke="#FF3535"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </div>
                                <h1 className="flex-1 text-[13px] laptop:text-[16px] ">
                                  {features}
                                </h1>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="h-[30%] p-7">
                    <button className="border border-[#C0C0C0] w-full hover:bg-black hover:text-white h-full rounded-3xl flex items-center" onClick={()=>onsubmit(key)}>
                      <h1 className="flex-1 text-left px-10">Pick this plan</h1>
                      <div className="w-[20%]">
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28.3333 17L19.8333 8.5M28.3333 17L19.8333 25.5M28.3333 17H13.4583M5.66665 17H9.20831"
                            stroke="#9F9F9F"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full bg-[#F5F7FB]  laptop:mt-24">
          <div className="laptop:w-[70%] mr-auto ml-auto  flex flex-col gap-7 text-justify laptop:flex-row items-center px-5 py-14 ">
            <div className="laptop:w-[40%]">
              <img src={Person_pricing_page} alt="" className="" />
            </div>
            <div className="md:w-[75%] laptop:w-[60%]">
              <div>
                <h1 className="text-[15px] md:text-[20px]"> 
                  "I’ve been using JobAvenue for about a year now, and it has
                  made my job search process so much easier. The interface is
                  user-friendly, and the personalized support really sets it
                  apart. I truly believe this is the best platform for job
                  seekers!"
                </h1>
              </div>
              <div className="h-[60px] flex flex-row">
                <div className="flex-1 flex items-center">
                   <h1 className="text-[#878787] text-[20px]">- John Doe</h1>
                </div>
                <div className="flex-1 h-full flex flex-row justify-end gap-2">
                    <img src={left_arrow} alt="" className=""/>
                    <img src={right_arrow} alt="" className=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chat/>
        <Footer/>
    
      </div>
    </div>
  );
}

export default Price;
