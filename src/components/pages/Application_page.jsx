import { Header } from "../cards/header"
import arrow from '../../assets/arrow.svg';
import Footer from '../cards/Footer'
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "../cards/Loader";
import { ConfirmationCard } from "../cards/ConfirmationCards";
import upload_animation from '../../assets/Uploaded_animation.gif'
import Existgif from '../../assets/Exsit.gif'
import { New_application } from "../../api_modules/Api_file";

const FormSchema = z.object({
    Name: z.string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(100, { message: "Name must not exceed 100 characters." }),
    EmailID: z.string().email({ message: "Invalid email address." }),
    contact_number: z.string().regex(/^\d{10}$/, { message: "Contact number must be exactly 10 digits." }),
    LinkedInURL: z.string().url({ message: "Must be a valid LinkedIn URL." }),
    University: z.string().min(1, { message: "University name cannot be empty." }),
    Preferred_job: z.string().min(1, { message: "Preferred job cannot be empty." }),
    VisaStatus: z.enum(["Citizen", "Permanent Resident", "Work Visa", "Student Visa", "Other"]),
    WorkExperience: z.string(),
  });


function Application_page() {
  const [loader,setloader]=useState(false)
    const [fileData, setFileData] = useState("");
    const [fileerror,setfileerror] = useState("")
    const [filename,setFilename]=useState("")
    const [register_message,setmessage]=useState(false)
    const [Exist,setExist]=useState(false)

    const {register, handleSubmit,formState: { errors },setError} = useForm({resolver: zodResolver(FormSchema)});
    const onSubmit = async (data) => {
      try {
        setloader(true)
        if (!fileData) {
          setfileerror("Please select a file to upload")
          setloader(false)
          return;
        }
    
        if (fileData.type !== "application/pdf") {
          setfileerror("Only PDF files are allowed. Please upload a valid PDF file.")
          setloader(false)
          return;
        }
    
        const MAX_SIZE = 3 * 1024 * 1024; 
        if (fileData.size > MAX_SIZE) {
          setfileerror("File size exceeds 3MB. Please upload a smaller PDF file.")
          setloader(false)
          return;
        }
    
        const formData = new FormData();
        formData.append("file", fileData); 
        formData.append("data", JSON.stringify(data)); 
    
        const result = await New_application(formData);
        console.log(result)
        if(result.Code=="200"){
          setmessage(true)
        }
        if(result.Code=="400"){
          setExist(true)
        }
       
      } catch (error) {
        setloader(false)
        console.error("Error uploading file:", error);
      }
    };
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFileData(file);
      
      if (file) {
        setFilename(file.name); 
      } 
      else if(filename){
        setfileerror(null); 
      }
      else{
        setfileerror("No file selected"); 
      }
    };
    

  return (
    <div>
       {
      loader?<>
      <Loader/>
      </>:<>
      </>
    }
        <Header title="Application Form"/>
        <div className="w-[90%] md:w-[80%] laptop:w-[60%] h-[80px] md:h-[100px] flex items-center ml-auto mr-auto  ">
            <h1 className="text-[24px] md:text-[28px]">Client Application Form</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} >
       <div className="flex flex-col gap-5 md:gap-8 py-5">
           <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-5 md:gap-8 flex-col md:flex-row">
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Name</h1>
                    <input {...register("Name")} type="text" className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl"/>
                    {errors.Name && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.Name.message}*
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">EmailID</h1>
                    <input  {...register("EmailID")} type="text" className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl"/>
                    {errors.EmailID && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.EmailID.message}*
                    </p>
                  )}
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-8 flex-col md:flex-row">
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Contact Number</h1>
                    <input  {...register("contact_number")} type="number" maxLength={10}  className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl no-spinner"/>
                    {errors.contact_number && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.contact_number.message}*
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">LinkedIn URL</h1>
                    <input  {...register("LinkedInURL")} type="text" className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl"/>
                    {errors.LinkedInURL && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.LinkedInURL.message}*
                    </p>
                  )}
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-8 flex-col md:flex-row">
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">University</h1>
                    <input  {...register("University")}  type="text" className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl"/>
                    {errors.University && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.University.message}*
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Preferred Job Role/s</h1>
                    <input {...register("Preferred_job")}   type="text" className="border bg-[#FDFFFC] px-3  h-[65px] rounded-xl"/>
                    {errors.Preferred_job && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.Preferred_job.message}*
                    </p>
                  )}
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-8 flex-col md:flex-row">
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Visa Status</h1>
                    <input {...register("VisaStatus")}  type="text" className="border bg-[#FDFFFC] px-3 h-[65px] rounded-xl"/>
                    {errors.VisaStatus && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.VisaStatus.message}*
                    </p>
                  )}
                </div>
                <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Work Experience in Years (Optional)</h1>
                    <input  {...register("WorkExperience")} className="border bg-[#FDFFFC] px-3  h-[65px] rounded-xl"/>
                    {errors.WorkExperience && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {errors.WorkExperience.message}*
                    </p>
                  )}
                </div>
            </div>
            <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-8 flex-col md:flex-row">
               <div className=" flex flex-col gap-3 flex-1">
                    <h1 className="text-[16px] text-[#858181]">Resume</h1>
                    <input type="file" id="resume_input" className="hidden" onChange={handleFileChange}/>
                    <label htmlFor="resume_input" className="border bg-[#F1F3F7] h-[170px] rounded-xl flex flex-col gap-3 items-center justify-center">
                    <svg width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M27 3.42912e-07C23.8749 -0.000638541 20.8163 0.891471 18.193 2.56879C15.5696 4.2461 13.4935 6.63702 12.2148 9.45333C12.0329 9.85709 11.8466 10.2589 11.6559 10.6587L11.6019 10.6613C11.4291 10.6667 11.1942 10.6667 10.8 10.6667C7.93566 10.6667 5.18864 11.7905 3.16325 13.7909C1.13785 15.7912 0 18.5044 0 21.3333C0 24.1623 1.13785 26.8754 3.16325 28.8758C5.18864 30.8762 7.93566 32 10.8 32H11.2644L16.6644 26.6667H10.8C9.36783 26.6667 7.99432 26.1048 6.98162 25.1046C5.96893 24.1044 5.4 22.7478 5.4 21.3333C5.4 19.9188 5.96893 18.5623 6.98162 17.5621C7.99432 16.5619 9.36783 16 10.8 16H10.9728C11.5344 16 12.1878 16.0027 12.7278 15.8933C13.4 15.7798 14.0425 15.535 14.6178 15.1733C15.2685 14.7573 15.7167 14.24 16.0569 13.768C16.2653 13.464 16.4469 13.1428 16.5996 12.808C16.7436 12.5111 16.92 12.1307 17.1288 11.6667L17.1396 11.64C17.9912 9.76043 19.3754 8.16441 21.125 7.04453C22.8747 5.92466 24.9151 5.32877 27 5.32877C29.0849 5.32877 31.1253 5.92466 32.875 7.04453C34.6246 8.16441 36.0088 9.76043 36.8604 11.64L36.8739 11.6667C37.0809 12.1289 37.2564 12.5093 37.4004 12.808C37.5246 13.0667 37.7082 13.4427 37.9431 13.768C38.2833 14.2373 38.7288 14.7573 39.3822 15.176C40.0356 15.592 40.6971 15.7813 41.2722 15.896C41.8122 16.0027 42.4656 16.0027 43.0272 16.0027L43.2 16C44.6322 16 46.0057 16.5619 47.0184 17.5621C48.0311 18.5623 48.6 19.9188 48.6 21.3333C48.6 22.7478 48.0311 24.1044 47.0184 25.1046C46.0057 26.1048 44.6322 26.6667 43.2 26.6667H37.3356L42.7356 32H43.2C46.0643 32 48.8114 30.8762 50.8368 28.8758C52.8621 26.8754 54 24.1623 54 21.3333C54 18.5044 52.8621 15.7912 50.8368 13.7909C48.8114 11.7905 46.0643 10.6667 43.2 10.6667C42.8058 10.6667 42.5709 10.6667 42.3981 10.6613H42.3441L42.2766 10.52C42.1095 10.1659 41.9457 9.81036 41.7852 9.45333C40.5065 6.63702 38.4304 4.2461 35.807 2.56879C33.1837 0.891471 30.1251 -0.000638541 27 3.42912e-07Z" fill="black"/>
                             <path d="M27 26.8404L25.0474 24.9202L27 23L28.9526 24.9202L27 26.8404ZM29.7618 51.284C29.7618 52.0044 29.4709 52.6952 28.9529 53.2045C28.435 53.7139 27.7325 54 27 54C26.2675 54 25.565 53.7139 25.0471 53.2045C24.5291 52.6952 24.2382 52.0044 24.2382 51.284H29.7618ZM14 35.784L25.0474 24.9202L28.9526 28.7606L17.9052 39.6244L14 35.784ZM28.9526 24.9202L40 35.784L36.0948 39.6244L25.0474 28.7606L28.9526 24.9202ZM29.7618 26.8404V51.284H24.2382V26.8404H29.7618Z" fill="black"/>
                    </svg>
                    <h1>Drop your file here or browse</h1>
                    </label>
                    {
                  fileerror && (
                    <p className="font-light p-2 text-red-500 text-[14px]">
                      {fileerror}
                    </p>
                  )
                }
                    {
                  filename && (
                    <p className="font-light p-2 text-green-600 text-[14px]">
                      {filename}
                    </p>
                  )
                }
                </div>
                
            </div>
            <div className="w-[90%] md:w-[80%] laptop:w-[60%] ml-auto mr-auto flex gap-8 py-10 ">
                <div className="flex-1">
                     <Link to="/" className="border w-[120px] md:w-[170px] h-[50px] gap-3 bg-[#E6E6E6] rounded-xl flex items-center justify-center text-[18px]" >
                       Cancel
                     </Link>
                </div>
                <div className="flex-1">
                <div className="flex items-center justify-end">
                     <button className="border w-[170px] h-[50px] gap-3 bg-[#E7ECFB] rounded-xl flex items-center justify-center text-[18px]">
                       Login
                       <img src={arrow} alt="Arrow" className="w-[50px]" />
                     </button>
                </div>
                </div>
            </div>
       </div>
       </form>
       <Footer/>
       {
        register_message&&(
          <ConfirmationCard imgdata={upload_animation} title={"Uploaded"}  nav={"/"} data={"Your application has been successfully uploaded. We will review it soon."}/>
        )
       }

       {
        Exist&&(
          <ConfirmationCard imgdata={Existgif} title={"Application Already Exist"} nav={"/"} data={" We found that you have already applied. We will review it soon. Please wait."}/>
        )
       }
      
    </div>
  )
}

export default Application_page