import { useNavigate,useLocation } from "react-router-dom"
import help from '../../assets/Support.gif'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../cards/Loader.jsx";
import registered from "../../assets/Customer_support.gif";
import { help_module } from "../../api_modules/Api_file.jsx";
const ConfirmationCard = (props) => {
  const navigate = useNavigate()
  const location = useLocation();
  const nav_homepage = (locationPath) => {
    if (location.pathname === locationPath) {
        window.location.reload();
    } else {
        navigate(locationPath);
    }
  };
  return (
    <div className="fullscreen-demo flex flex-row items-center justify-center" onClick={(e)=>{e.stopPropagation()}}>
        <div className=" py-5 w-[350px] md:w-[500px] h-[350px] border-[1px] bg-white rounded-xl px-3 px-10">
            <div className="w-full h-[30%] mt-[3%]  relative">
                <img src={props.imgdata} alt='' className='max-h-full mr-auto ml-auto '/>
            </div>
            <div className='h-[75%] relative'>
                <h1 className='text-center font-lexend-deca text-xl'>{props.title}</h1>
                <p className='text-[12px] md:text-[15px] font-lexend-deca font-light w-[90%] text-center mr-auto ml-auto mt-[5%] px-5'>

                        <p>{props.data}</p>
                    </p>
                <div className='flex items-center justify-center w-full h-[40%]'>
                    <button className='border w-[120px] h-2/4 rounded-lg font-lexend-deca text-white bg-green-500' onClick={()=>{nav_homepage(props.nav)}} >OK</button>
                </div>
            </div>
        </div>
    </div>
  )
}

const FormSchema = z.object({
    Name: z.string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." }),
    EmailID: z.string().email({ message: "Invalid email address." }),
    contact_number: z.string().regex(/^\d{10}$/, { message: "Phone no must be exactly 10 digits." }),
    Subject: z.string()
    .min(2, { message: "Subject must be at least 2 characters long." })
    .max(100, { message: "Subject must not exceed 200 characters." }),
  });

const Help_Component = (props) => {
    const idToken = sessionStorage.getItem("token");
    const {register,handleSubmit,formState: { errors }} = useForm({ resolver: zodResolver(FormSchema) });
      const onSubmit = async (data) => {
        try {
            const res= await help_module(data,idToken)
            if(res.status==200){
                setmessage(true)
            }
        } catch (error) {
            console.log(error)
        }
      };
      const [register_message, setmessage] = useState(false);
    return (
        
      <div className="fullscreen-demo flex flex-row items-center justify-center overflow-y-scroll" onClick={(e)=>{e.stopPropagation()}}>
          {register_message && (
            <ConfirmationCard
              imgdata={registered}
              title={"Application Received"}
              nav={"/"}
              data={
                "Thank you for your submission! We'll get in touch with you soon"
              }
            />
          )}
          <div className=" py-14 md:w-[700px]  border-[1px] bg-white rounded-xl px-3   md:px-10">
              <div className="w-full h-[100px]  relative">
                  <img src={help} alt='' className='max-h-full mr-auto ml-auto '/>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} >
              <div className='h-[85%] relative'>
                  <h1 className='text-center font-lexend-deca text-2xl'>We’re here to guide you on your career journey</h1>
                  <h1 className="text-[12px] mt-3 font-light text-center px-5 md:px-0 md:w-[80%] mr-auto ml-auto">Please take a moment to fill out the following details, and let us help you find the perfect job opportunity.</h1>
                 <div className="flex flex-col gap-5 px-5 md:px-10 py-5">
               
                   <div className="flex w-full gap-4 flex-col md:flex-row">
                   <div className="flex flex-1 gap-2 flex-col">
                       <h1 className="font-light text-[17px] text-[#666363]">
                         Name
                       </h1>
                       <input
                       {...register("Name")}
                          className="border border-[#d1cece] w-full h-[50px] rounded-lg px-2 md:px-5"
                       />
                       {errors.Name && (
                         <p className="font-light p-1 text-red-500 text-[12px]">
                           {errors.Name.message}*
                         </p>
                       )}
                  </div>
                  <div className="flex gap-2 flex-1 flex-col">
                       <h1 className="font-light text-[17px] text-[#666363]">
                        Phone Number
                       </h1>
                       <input
                       {...register("contact_number")}
                          className="border border-[#d1cece] w-full h-[50px] rounded-lg px-2 md:px-5"
                       />
                      {errors.contact_number && (
                         <p className="font-light p-1 text-red-500 text-[12px]">
                           {errors.contact_number.message}*
                         </p>
                       )}
                  </div>
                   </div>
                  <div className="flex gap-2 flex-col">
                       <h1 className="font-light text-[17px] text-[#666363]">
                         Email ID
                       </h1>
                       <input
                       {...register("EmailID")}
                          className="border border-[#d1cece] w-full h-[50px] rounded-lg px-2 md:px-5"
                       />
                      {errors.EmailID && (
                         <p className="font-light p-1 text-red-500 text-[12px]">
                           {errors.EmailID.message}*
                         </p>
                       )}
                  </div>
                  <div className="flex gap-2 flex-col">
                       <h1 className="font-light text-[17px] text-[#666363]">
                         Subject
                       </h1>
                       <textarea
                       {...register("Subject")}
                          className="border border-[#d1cece] w-full h-[130px] rounded-lg px-2 py-4 md:px-5"
                       />
                      {errors.Subject && (
                         <p className="font-light p-1 text-red-500 text-[12px]">
                           {errors.Subject.message}*
                         </p>
                       )}
                  </div>
                 </div>
                  <div className='flex  items-center justify-center w-full px-5 md:px-10'>
                    <div className="flex-1 " onClick={props.toggle}>
                        <button className="px-10 py-3 rounded-lg bg-[#dbdada]" >Cancel</button>
                    </div>
                    <div className="flex-1  flex justify-end">
                        <button className="px-10 py-3 rounded-lg bg-[#55c931]">Submit</button>
                    </div>
                  </div>
                 
              </div>
              </form>
          </div>
      </div>
    )
  }


export{ConfirmationCard,Help_Component}
