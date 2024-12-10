import { useState, useEffect } from "react";
import company_logo from "../../assets/Logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import SortIcon from "@mui/icons-material/Segment";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import profile from "../../assets/person.png";
import Female from "../../assets/Female.png";
import Others from "../../assets/Others.png";
import notification from "../../assets/notification.svg";
import notification_alert from "../../assets/notification_alert.svg";
import { Fetch_user_details } from "../../api_modules/Api_file";
import {Help_Component} from '../cards/ConfirmationCards'
export const Header = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profiletoggle, setprofiletoggle] = useState(false);
  const [Notificationtoggle, setNotificationtoggle] = useState(false);

  const [menutoggle, setmenutoggle] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      setprofiletoggle(false);
    } else {
      setIsScrolled(false);
    }
  };
  const idToken = sessionStorage.getItem("token");
  const [userdata, setuserdata] = useState(null);
  const [status, setstatus] = useState(false);

   

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        if (idToken) {
          const result = await Fetch_user_details(idToken);
          setuserdata(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserdata();
  }, [status]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const [helptoggle,sethelptoggle]=useState(false)
  const nav_homepage = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to /home
      navigate("/");
    }
  };

  const help_toggle=()=>{
    setmenutoggle(false);
    sethelptoggle(!helptoggle)
  }

  return (
    <>
    {
      helptoggle &&(
        <Help_Component toggle={help_toggle}/>
      )
    }
      <div
        className={` no-select sticky top-0 z-30 h-[10dvh] items-center px-12 transition-all laptop:block hidden duration-300 ease-out ${
          isScrolled ? "bg-white " : "bg-transparent"
        }`}
      >
        <div className="h-full flex w-full">
          <div className="flex-1">
            <div className="flex h-full gap-8 items-center">
              <img
                src={company_logo}
                className="w-[120px]"
                onClick={nav_homepage}
              />
              <hr className="border-l-2 h-1/3 mt-2 border-[#7C7676]" />
              <div className="flex mt-[8px] font-light gap-10">
                {props.title ? (
                  <>
                    <h1 className="cursor-pointer laptop:text-[18px]">
                      {props.title}
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="cursor-pointer" onClick={nav_homepage}>
                      Home
                    </h1>
                    {/* <h1 className="cursor-pointer">Our Story</h1> */}
                    <h1
                      className="cursor-pointer"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate("/Pricing");
                      }}
                    >
                      Price
                    </h1>
                    <h1 className="cursor-pointer" onClick={help_toggle}>Help</h1>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex h-full gap-5 items-center justify-end">
              {idToken ? (
                <div className="flex  items-center gap-5">
                  <div
                    onClick={() => {
                      setNotificationtoggle(true);
                    }}
                  >
                    <img
                      src={notification}
                      alt=""
                      className="w-[25px] cursor-pointer"
                    />
                  </div>
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      setprofiletoggle(true);
                    }}
                  >
                    {userdata && (
                      <img
                        src={
                          userdata.Gender === "Male"
                            ? profile
                            : userdata.Gender === "Female"
                            ? Female
                            : Others
                        }
                        alt=""
                        className="w-[45px]"
                      />
                    )}
                    <h1 className="text-[20px] font-light">
                      {" "}
                      {userdata && userdata.Username}
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="flex  items-center gap-5">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className="bg-black w-[130px] text-white rounded-full h-[45px]"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {profiletoggle && (
        <div className="fixed top-0 right-0 h-full z-50 w-full flex  transition-all  duration-800 ease-in-out ">
          <div
            className="flex-1 bg-[#00000060]"
            onClick={() => {
              setprofiletoggle(false);
            }}
          ></div>
          <div className="w-[30%] bg-[#F5F7FB] py-16 px-10 relative">
            <div className="w-full h-full">
              <div
                className="flex items-center gap-3 cursor-default"
                onClick={() => {
                  setprofiletoggle(true);
                }}
              >
                {userdata && (
                  <img
                    src={
                      userdata.Gender === "Male"
                        ? profile
                        : userdata.Gender === "Female"
                        ? Female
                        : Others
                    }
                    alt=""
                    className="w-[45px]"
                  />
                )}

                <h1 className="text-[20px] font-light">{userdata.Username}</h1>
              </div>
              <div className="py-5 flex flex-col gap-2">
                <div
                  className="h-[8%]  flex items-center hover:bg-[#e8eefa] p-3 cursor-pointer rounded-lg"
                  onClick={() => {
                    navigate("/Profile");
                    window.location.reload();
                  }}
                >
                  <h1 className="text-[18px] 2xl:text-[20px] flex-1 font-light">
                    Go to Profile
                  </h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
                <div
                  className="h-[8%]  flex items-center hover:bg-[#e8eefa] p-3 cursor-pointer rounded-lg"
                  onClick={() => {
                    navigate("/Application");
                  }}
                >
                  <h1 className="text-[18px] 2xl:text-[20px] flex-1 font-light">
                    New Application
                  </h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className=" flex items-center cursor-pointer gap-3 w-[200px] hover:opacity-75 px-5"
              onClick={() => {
                navigate("/");
                window.location.reload();
                setprofiletoggle(false);
                sessionStorage.removeItem("token");
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13H25M25 13L20.5 8.5M25 13L20.5 17.5"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1 13C1 9.8174 2.26428 6.76516 4.51472 4.51472C6.76516 2.26428 9.8174 1 13 1M13 25C11.201 25.0011 9.42476 24.5971 7.80313 23.8181C6.18151 23.0391 4.75605 21.905 3.6325 20.5"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <h1 className="text-[20px]">Logout</h1>
            </div>
          </div>
        </div>
      )}

      {Notificationtoggle && (
        <div className="fixed top-0 right-0 h-full z-50 w-full flex  transition-all  duration-800 ease-in-out ">
          <div
            className="flex-1 bg-[#00000060]"
            onClick={() => {
              setNotificationtoggle(false);
            }}
          ></div>
          <div className="w-[30%] bg-[#F5F7FB] py-16 px-10 relative">
            <h1 className="text-[25px]">Notifications</h1>
            <div className="h-full flex items-center justify-center">
              <h1 className="font-light text-[25px] text-[#7e7c7c]">
                No messages found
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* mobile view */}
      <div
        className={`no-select sticky top-0 z-30 h-[8dvh] items-center px-2 md:px-8 transition-all block laptop:hidden duration-300 ease-out ${
          isScrolled ? "bg-white " : "bg-transparent"
        }`}
      >
        <div className="flex flex-row h-full ">
          <div className="flex-1 flex items-center">
            <img
              src={company_logo}
              className="w-[120px] px-2 md:w-[180px]"
              onClick={nav_homepage}
            />
          </div>
          <div className="flex-1  flex px-2 justify-end items-center ">
            <SortIcon
              className="menubar"
              onClick={() => {
                setmenutoggle(true);
              }}
            />
          </div>
        </div>
        {menutoggle && (
          <div className="fixed top-0 left-0 w-full h-[100dvh] z-50 bg-white overflow-hidden transition-all duration-300 ease-out ">
            <div className="h-[10%] flex items-center justify-end px-10">
              <CloseIcon
                className="menubar"
                onClick={() => {
                  setmenutoggle(false);
                }}
              />
            </div>
            <div
              className="h-[8%]  flex items-center px-10 bg-[#F5F7FB]"
              onClick={() => {
                if (location.pathname === "/") {
                  setmenutoggle(false);
                } else {
                  navigate("/");
                }
              }}
            >
              <h1 className="text-[16px] md:text-[25px] flex-1">Home</h1>
              <div className="flex-1 flex items-center justify-end ">
                <ArrowRightIcon className="menubar" />
              </div>
            </div>
            <div className="h-[8%]  flex items-center px-10 ">
              <h1 className="text-[16px] md:text-[25px] flex-1">Our Story</h1>
              <div className="flex-1 flex items-center justify-end ">
                <ArrowRightIcon className="menubar" />
              </div>
            </div>
            <div
              className="h-[8%]  flex items-center px-10"
              onClick={() => {
                if (location.pathname === "/Pricing") {
                  setmenutoggle(false);
                } else {
                  navigate("/Pricing");
                }
              }}
            >
              <h1 className="text-[16px] md:text-[25px] flex-1">Price</h1>
              <div className="flex-1 flex items-center justify-end ">
                <ArrowRightIcon className="menubar" />
              </div>
            </div>
            <div className="h-[8%]  flex items-center px-10 " onClick={help_toggle}>
              <h1 className="text-[16px] md:text-[25px] flex-1">Help</h1>
              <div className="flex-1 flex items-center justify-end ">
                <ArrowRightIcon className="menubar" />
              </div>
            </div>
            {idToken ? (
              <>
                <div
                  className="h-[8%]  flex items-center px-10 "
                  onClick={() => {
                    if (location.pathname === "/Profile") {
                      setmenutoggle(false);
                    } else {
                      navigate("/Profile");
                    }
                  }}
                >
                  <h1 className="text-[16px] md:text-[25px] flex-1">
                    {userdata.Username}
                  </h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
                <div
                  className="h-[8%]  flex items-center px-10 "
                  onClick={() => {
                    if (location.pathname === "/Application") {
                      setmenutoggle(false);
                    } else {
                      navigate("/Application");
                    }
                  }}
                >
                  <h1 className="text-[16px] md:text-[25px] flex-1">
                    New Application
                  </h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
                <div
                  className=" flex w-full h-[200px] justify-center  md:hidden  items-end cursor-pointer gap-3  hover:opacity-75 px-5"
                  onClick={() => {
                    if (location.pathname === "/") {
                      setmenutoggle(false);
                      sessionStorage.removeItem("token");
                    } else {
                      sessionStorage.removeItem("token");
                      navigate("/");
                    }
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 13H25M25 13L20.5 8.5M25 13L20.5 17.5"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 13C1 9.8174 2.26428 6.76516 4.51472 4.51472C6.76516 2.26428 9.8174 1 13 1M13 25C11.201 25.0011 9.42476 24.5971 7.80313 23.8181C6.18151 23.0391 4.75605 21.905 3.6325 20.5"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <h1 className="text-[20px]">Logout</h1>
                </div>
                <div className="h-[8%]   items-center px-10 hidden md:flex">
                  <h1 className="text-[16px] md:text-[25px] flex-1">Logout</h1>
                  <div className="flex-1 flex items-center justify-end "></div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="h-[8%]  flex items-center px-10 "
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <h1 className="text-[16px] md:text-[25px] flex-1">Login</h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
                <div
                  className="h-[8%]  flex items-center px-10 "
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  <h1 className="text-[16px] md:text-[25px] flex-1">Sign up</h1>
                  <div className="flex-1 flex items-center justify-end ">
                    <ArrowRightIcon className="menubar" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
