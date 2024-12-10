import { Header } from "../cards/header";
import profile from "../../assets/person.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Female from "../../assets/Female.png";
import Others from "../../assets/Others.png";
import { User_applications } from "../../api_modules/Api_file";
import Loader from "../cards/Loader";
function Profile_page() {
  const navigator = useNavigate();
  const [userdata, setuserdata] = useState(null);
  const [data, setdata] = useState(null);
  const [jobdata, setjobdata] = useState(data);
  const [status, setstatus] = useState("All");
  const [loader, setloader] = useState(false);
  const [status_, setstatus_] = useState(true);
  useEffect(() => {
    const userdata = async () => {
      try {
          setloader(true)
          const result= await User_applications()
          console.log(result.data_2)
          setloader(false)
          setuserdata(result.data_2);
          setjobdata(result.data_1);
          setdata(result.data_1);
      } catch (error) {
        console.log(error);
      }
    };

    userdata();
  }, [status_]);

  return (
    <div className="no-select">
        {
      loader?<>
      <Loader/>
      </>:<>
      </>
    }
      <Header title="My Application" />
      <div className="flex flex-col  laptop:flex-row md:py-6 ">
        <div className="flex-1 flex px-5 md:px-14 gap-5 py-10">
          <div className="  flex items-center justify-end">
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
                className="w-[130px]"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-3 justify-center">
            <div>
              <h1 className="text-[20px] md:text-[30px] text-[#4D4848]">
                {userdata ? userdata.Username : ""}
              </h1>
              <h1 className="text-[11px]  md:text-[16px]  text-[#4D4848] underline underline-offset-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {userdata ? userdata.EmailID : ""}
              </h1>
            </div>
            <div>
              {userdata ? (
                userdata.Plan === null ? (
                  <button
                    className="w-[180px] font-light bg-[#fa3838] text-white rounded-md text-[15px] py-1 md:py-0 md:h-[35px]"
                    onClick={() => {
                      navigator("/Pricing");
                    }}
                  >
                    No Subscription
                  </button>
                ) : (
                  <button className=" px-5 font-light bg-[#7CF476] rounded-md text-[15px] py-1 md:py-0 md:h-[35px]">
                    {userdata ? userdata.Plan : ""}
                  </button>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="  flex-1 md:p-5">
          <div className="flex flex-row h-full">
            <div className=" flex-1  flex flex-col">
              <div className=" ">
                <h1 className="text-[13px] text-center laptop:text-left md:text-[17px] 2xl:text-[20px] text-[#757575]">
                  Depute
                </h1>
              </div>
              <div className=" flex-1  flex items-center justify-center">
                <h1 className="text-[40px] md:text-[60px] 2xl:text-[80px]">
                  {userdata ? userdata.Deputed : ""}
                </h1>
              </div>
            </div>
            <div className=" flex-1  flex flex-col">
              <div className=" ">
                <h1 className="text-[13px] text-center laptop:text-left md:text-[17px] 2xl:text-[20px] text-[#757575]">
                  Applied
                </h1>
              </div>
              <div className=" flex-1  flex items-center justify-center">
                <h1 className="text-[40px] md:text-[60px] 2xl:text-[80px]">
                  {userdata ? userdata.Applied : ""}
                </h1>
              </div>
            </div>
            <div className=" flex-1  flex flex-col">
              <div className=" ">
                <h1 className="text-[13px] text-center laptop:text-left md:text-[17px] 2xl:text-[20px] text-[#757575]">
                  Applications left
                </h1>
              </div>
              <div className=" flex-1  flex items-center justify-center">
                <h1 className="text-[40px] md:text-[60px] 2xl:text-[80px]">
                  {userdata ? userdata.Application_left : ""}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full px-5 md:px-14">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex items-center relative py-10 md:py-0">
            <input
              type="text"
              className="border border-[#b8b6b6] w-full max-w-[500px]  h-[60px] rounded-xl px-14 font-light"
              placeholder="Search...."
              onChange={(e) => {
                const value = e.target.value;
                setjobdata(
                  data.filter(
                    (item) =>
                      item.company_name
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      item.job_title
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                      item._id.toLowerCase().includes(value.toLowerCase())
                  )
                );
              }}
            />
            <div className="absolute left-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7085 19.7401L23.3018 23.3334M22.1667 13.4167C22.1667 15.7374 21.2448 17.963 19.6038 19.6039C17.9629 21.2449 15.7373 22.1667 13.4167 22.1667C11.096 22.1667 8.87042 21.2449 7.22947 19.6039C5.58853 17.963 4.66666 15.7374 4.66666 13.4167C4.66666 11.0961 5.58853 8.87051 7.22947 7.22956C8.87042 5.58862 11.096 4.66675 13.4167 4.66675C15.7373 4.66675 17.9629 5.58862 19.6038 7.22956C21.2448 8.87051 22.1667 11.0961 22.1667 13.4167Z"
                  stroke="#978D8D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1  flex items-center justify-center md:justify-end gap-7 px-5">
            <h1
              className={`${
                status === "All"
                  ? "underline underline-offset-[16px] decoration-[#ff3c3c] laptop:text-[22px] 2xl:text-[25px]  text-center "
                  : "laptop:text-[22px] 2xl:text-[25px]  text-center  hover:underline hover:underline-offset-[16px]  "
              } cursor-pointer `}
              onClick={() => {
                setstatus("All");
                setjobdata(data);
              }}
            >
              All ({data && data.length})
            </h1>
            <h1
              className={`${
                status === "in progress"
                  ? "underline underline-offset-[16px] decoration-[#ff3c3c] cursor-pointer laptop:text-[22px] 2xl:text-[25px]  text-center "
                  : "laptop:text-[22px] 2xl:text-[25px]  text-center  hover:underline hover:underline-offset-[16px]  "
              } cursor-pointer `}
              onClick={() => {
                setstatus("in progress");
                setjobdata(
                  data.filter((value) => value.status === "in progress")
                );
              }}
            >
              Depute (
              {data &&
                data.filter((value) => value.status === "in progress").length}
              )
            </h1>
            <h1
              className={`${
                status === "applied"
                  ? "underline underline-offset-[16px] decoration-[#ff3c3c] cursor-pointer laptop:text-[22px] 2xl:text-[25px]  text-center "
                  : "laptop:text-[22px] 2xl:text-[25px]  text-center  hover:underline hover:underline-offset-[16px]  "
              } cursor-pointer `}
              onClick={() => {
                setstatus("applied");
                setjobdata(data.filter((value) => value.status === "applied"));
              }}
            >
              Applied (
              {data &&
                data.filter((value) => value.status === "applied").length}
              )
            </h1>
          </div>
        </div>
      </div>
      <div className="border-black h-auto w-full flex pt-10 items-center justify-center">
        <div className="w-[95%] h-[500px] bg-[#F5F7FB] rounded-3xl overflow-x-auto">
          {/* Wrapper for Scrollable Table */}
          <div className="min-w-[1000px]">
            {/* Heading Row */}
            <div className="flex border-b py-4 text-center">
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Application ID
              </div>
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Title
              </div>
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Company
              </div>
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Depute On
              </div>
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Status
              </div>
              <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                Action
              </div>
            </div>
            {/* Data Row */}

            {jobdata && jobdata.length > 0 ? (
              jobdata.map((value, index) => {
                const { _id, job_title, company_name, depute_on, status, doc } =
                  value;

                const handleViewClick = () => {
                  window.open(doc.file_url, "_blank");
                };

                const handleDownloadClick = () => {
                  const link = document.createElement("a");
                  link.href = doc.file_url;
                  link.download = doc.file_name;
                  link.click();
                };

                return (
                  <div className="flex py-4 text-center" key={index}>
                    <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                      {_id.slice(-8).toUpperCase()}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                      {job_title}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                      {company_name}
                    </div>
                    <div className="flex-1 flex items-center justify-center text-sm md:text-base">
                      {depute_on}
                    </div>
                    {status === "in progress" ? (
                      <div className="flex-1 flex items-center justify-center">
                        <button className="px-4 py-2 bg-[#FFF0C9] rounded-xl text-sm md:text-base">
                          In Progress
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <button className="px-4 py-2 bg-[#cfffc9] rounded-xl text-sm md:text-base">
                          Applied
                        </button>
                      </div>
                    )}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex flex-row gap-2 md:gap-4">
                        <h1
                          onClick={handleViewClick}
                          className="underline cursor-pointer underline-offset-2 text-[#1979D3] text-sm md:text-base"
                        >
                          View
                        </h1>
                        <h1
                          onClick={handleDownloadClick}
                          className="underline cursor-pointer underline-offset-2 text-[#1979D3] text-sm md:text-base"
                        >
                          Download
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 text-[#a8a6a6] text-[24px] font-light">
                You have not applied any Jobs
              </div> // Or any fallback component/message
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile_page;
