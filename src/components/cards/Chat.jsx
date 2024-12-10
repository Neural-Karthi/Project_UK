import chat_temp from "../../assets/chat_temp.svg";
import { useState } from "react";
import {Help_Component} from '../cards/ConfirmationCards'
function Chat() {
  const [helptoggle,sethelptoggle]=useState(false)
  const help_toggle=()=>{
    sethelptoggle(!helptoggle)
  }

  return (
    <div className="h-[400px] w-[90%] laptop:w-[80%] py-10 md:pt-20 no-select flex flex-col md:flex-row mr-auto ml-auto">
       {
      helptoggle &&(
        <Help_Component toggle={help_toggle}/>
      )
    }
    <div className="w-full  md:w-[60%]  text-center flex flex-col gap-10 ">
        <div className="flex flex-col gap-2">
        <h1 className="text-[22px] md:text-[25px] laptop:text-[33px] 2xl:text-[40px]">Got Questions? Let’s Talk!</h1>
        <p className="font-extralight text-[12px] md:text-[14px] laptop:text-[18px] 2xl:text-[40px]">Have queries about your unique needs? <br></br>
        Connect with our founder for expert guidance and support.</p>
        </div>
        <button className=" w-[90%] md:w-[50%] bg-[#EBEFF7] h-[60px] mr-auto ml-auto rounded-xl border" onClick={help_toggle}>
           Chat with the Founder 👋
        </button>
    </div>
    <div className="w-full md:w-[40%]">
        <img src={chat_temp} alt='' className="w-[200px] md:w-[250px] laptop:w-[250px] mr-auto ml-auto"/>
    </div>
 </div>
  )
}

export default Chat
