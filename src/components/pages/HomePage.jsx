import image_1 from "../../assets/Main_page_image_1.svg";
import { Header } from "../cards/header";
import Style_lines from "../../assets/Style_lines.svg";
import banner_2 from "../../assets/Banner_2.svg";
import banner_3 from "../../assets/Banner_3.svg";
import banner_4 from "../../assets/Banner_4.svg";
import arrow from "../../assets/arrow.svg";
import font from "../../assets/font.svg";
import Footer from "../cards/Footer";
import Chat from "../cards/Chat";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigator=useNavigate();
  const application_navigation=()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      navigator('/application')
    }
    else{
      navigator('/login')
    }
  }

 
  return (
    <div className="no-select">
      <Header/>
     
      {/* Main Content */}
      <div className="p-3  md:p-5 w-full">
        <div className="bg-[#F3E9E7] w-full  rounded-3xl">
          <div className=" flex flex-col p-3 laptop:p-8 lg:flex-row">
            <div className=" h-[55%] w-full lg:w-[50%] lg:h-full ">
              <img
                src={image_1}
                alt="Main page graphic"
                className="w-full p-3 laptop:p-5 h-full object-contain"
              />
            </div>
            <div className="flex-1 flex  flex-col px-5 py-5 gap-3 md:gap-5  laptop:gap-4 laptop:py-20 md:px-4">
              <div>
                <div className="md:w-[60%] mr-auto ml-auto laptop:w-[80%]  flex items-end justify-end p-2  h-[20%]">
                  <img
                    src={Style_lines}
                    loading="eager"
                    alt=""
                    className="w-[40px] md:w-[50px] laptop:w-[80px] "
                  />
                </div>
                <div className="md:w-[60%] mr-auto ml-auto laptop:w-[80%]  h-[40%]">
                  <h1 className="linespaceing text-[30px] cursor-default md:text-[50px] text-[#757575] laptop:text-[4vw]">
                    <span className="text-black">Get Hired Faster </span>
                    <br></br> Let Us Handle the<br></br> Search for You
                  </h1>
                </div>
              </div>
              <div className="">
                <div className="md:w-[60%] mr-auto ml-auto laptop:w-[80%] ">
                  <button className="h-[60px] md:h-[80px] laptop:h-[90px] bg-[#e4d9d6] md:max-w-[400px] w-full border  rounded-full flex flex-row items-center pl-8 pr-1 text-xl"
                  onClick={application_navigation}
                  >
                    <h1 className="flex-1 text-left">Get Started</h1>
                    <div className=" bg-white flex-1 w-full h-[90%] flex items-center justify-center rounded-full">
                      <img src={arrow} className="w-[40px] md:w-auto"  />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Count */}
        <div className="h-auto py-8 laptop:py-20">
          <div className=" h-full w-[90%] gap-5 md:gap-4 laptop:w-[60%] mr-auto ml-auto flex flex-col  md:flex-row">
            <div className=" flex-1 flex flex-col">
              <div className="flex-1  flex items-end justify-center">
                <h1 className="text-[80px] laptop:text-[100px]">510+</h1>
              </div>
              <div className="flex-1 ">
                <h1 className="text-[17px] md:text-[22px] text-[#494848]  text-center px-3">
                  Successful Interviews
                </h1>
              </div>
            </div>
            <div className=" flex-1 flex flex-col">
              <div className="flex-1  flex items-end justify-center">
                <h1 className="text-[80px] laptop:text-[100px]">10k+</h1>
              </div>
              <div className="flex-1 ">
                <h1 className="text-[17px] md:text-[22px] text-[#494848]  text-center px-3 ">
                  Job Applications Processed
                </h1>
              </div>
            </div>
            <div className=" flex-1 flex flex-col">
              <div className="flex-1  flex items-end justify-center">
                <h1 className="text-[80px] laptop:text-[100px]">85+</h1>
              </div>
              <div className="flex-1 ">
                <h1 className=" text-[17px] md:text-[22px] text-[#494848] text-center">
                  Satisfied Clients
                </h1>
              </div>
            </div>
          </div>
          <div className="h-auto p-5 py-8 laptop:py-12 w-full md:w-[70%] laptop:w-[40%] mr-auto ml-auto">
            <h1 className="text-center laptop:text-[18px]">
              Save <b className="text-[#494848] ">180+ hours monthly </b>with
              our platform, giving you the freedom to focus on what truly
              matters: preparing for your dream job
            </h1>
          </div>
        </div>
      </div>
      <svg
        className="w-full"
        viewBox="0 0 1728 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M913.584 31.9583C506.004 104.935 134.703 84.1495 0 64.6345V119H1728V71.442C1626.35 27.8738 1321.16 -41.0186 913.584 31.9583Z"
          fill="#F5F7FB"
        />
      </svg>

      <div className="bg-[#F5F7FB]">
        <div className="relative ">
          <div className="flex  flex-col laptop:flex-row w-full py-8 md:top-36 md:px-10">
            <div className="flex-1 flex flex-col px-5 md:px-16">
              <div className="md:h-[15%] w-full  flex items-center ">
                <img src={font} className="" />
              </div>
              <div className="h-[70%] w-full py-5 flex flex-col gap-5">
                <h1 className="text-[22px] md:text-[30px] 2xl:text-[40px]">
                  Effortless <span className="text-[#9FA69A]">Job Hunting</span>
                </h1>
                <p className="text-[15px] md:text-[22px] 2xl:text-[30px] font-light text-[#555252] text-justify">
                  Our platform makes job searching simple with an intuitive
                  interface and smart tools. Discover opportunities tailored to
                  your skills and preferences in just a few clicks. Advanced
                  filters and personalized recommendations save you time,
                  helping you focus on finding the perfect fit for your career.
                  Start your journey confidently and connect to your dream job
                  today!
                </p>
              </div>
            </div>
            <div className="flex-1 px-5 md:px-0">
              <img src={banner_2} className=""  loading="eager"/>
            </div>
          </div>
        </div>
        <div className="relative ">
          <div className="flex  flex-col laptop:flex-row w-full pt-10 md:top-36 md:px-10">
            <div className="flex-1 px-5 md:px-0">
              <img src={banner_3} className="" loading="eager"/>
            </div>
            <div className="flex-1 flex flex-col py-5 px-5 md:px-16  ">
              <div className="h-[70%] w-full py-5 flex flex-col justify-center gap-5">
                <h1 className="text-[22px] md:text-[30px] 2xl:text-[40px]">
                  <span className="text-[#9FA69A]">Employer -</span>
                  <br></br>
                  Job Seeker Connect
                </h1>
                <p className="text-[15px] md:text-[22px] 2xl:text-[30px] font-light text-[#555252] text-justify">
                  Connect employers and job seekers seamlessly. Employers find
                  qualified candidates, while job seekers communicate directly
                  with potential opportunities. Simplified interactions and
                  efficient tools ensure quick matches, fostering meaningful
                  professional relationships and making the hiring process
                  smooth and effective for all.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative ">
          <div>
          <div className="flex flex-col laptop:flex-row w-full md:pt-14 md:top-36 md:px-10">
            <div className="flex-1 flex flex-col px-5 md:px-16">
              <div className="h-[70%] w-full py-5 flex flex-col gap-5">
                <h1 className="text-[22px] md:text-[30px] 2xl:text-[40px]">
                  <span className="text-[#9FA69A]"> Real-Time</span>
                  <br></br>
                  Application Tracking
                </h1>
                <p className="text-[15px] md:text-[22px] 2xl:text-[30px] font-light text-[#555252] text-justify">
                  Stay informed with real-time updates on your job application
                  status. Track your progress from submission to interview, and
                  receive notifications on any changes or feedback. Our
                  transparent process helps you stay on top of every
                  opportunity, making job searching smoother and more efficient.
                </p>
              </div>
            </div>
            <div className="flex-1 px-5 md:px-0">
              <img src={banner_4} className=""  loading="eager"/>
            </div>
            </div>
            <div className="py-5 px-5">
                <div className="md:w-[60%]   mr-auto ml-auto laptop:w-[92%] ">
                  <button
                  onClick={application_navigation}
                  className="h-[70px] md:h-[80px] laptop:h-[90px] bg-[#000000] md:max-w-[400px] w-full border  rounded-full flex flex-row items-center pl-8 pr-1 text-xl">
                    <h1 className="flex-1 text-white text-left font-light">Get Started</h1>
                    <div className=" bg-white flex-1 w-full h-[90%] flex items-center justify-center rounded-full">
                      <img src={arrow} className="w-[40px] md:w-auto" />
                    </div>
                  </button>
                </div>
              </div>
          </div>
          
        </div>
        
      </div>
      <svg className="w-full" viewBox="0 0 1728 127" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M817.244 95.0417C1226.24 22.0648 1598.83 42.8505 1734 62.3655V0.5H0V55.558C102 99.1262 408.249 168.019 817.244 95.0417Z" fill="#F5F7FB"/>
      </svg>
       {/* chat */}
        <Chat/>
        {/* footer */}
        <Footer/>
    </div>
  );
}

export default HomePage;
