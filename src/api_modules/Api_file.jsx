import axios from "axios";
import { auth } from "../Config/Firebase.jsx";
import { sendEmailVerification, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";

const BASE_URL = "http://192.168.1.38:4000";
const axiosInstance = axios.create({ baseURL: BASE_URL });

// User New Registration API Module
export const New_Registration = async (data) => {
  try {
    
    const res = await axiosInstance.post("/Signup", {
      EmailID: data.EmailID,
    });
    if (res.data === "Email-ID Not Exist") {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        data.EmailID,
        data.Password
      );
      const user = userCred.user;
      await sendEmailVerification(user);
      const registerRes = await axiosInstance.post("/registration", {
        Username: data.Name,
        Gender: data.Gender,
        EmailID: data.EmailID,
      });
      return registerRes.data;

    } else {
      return { error: res.data };
    }
  } catch (error) {
    console.error("Registration Error:", error);
    throw new Error("Failed to register. Please try again.");
  }
};


// User Login Authentication API Module
export const Login_authentication = async (data) => {
  try {
    const res = await axiosInstance.post("/Signup", { EmailID: data.EmailID,});
    
    if (res.data === "Email Already Exist") {
      const userCredential = await signInWithEmailAndPassword(auth,data.EmailID, data.Password);
      const idToken = await userCredential.user.getIdToken();
      const tokenVerification = await axiosInstance.get("/tokenVerification", {params: { token: idToken,},});
     
      if (tokenVerification.data.message == "Verified account") {
        const account_verified_status = await axiosInstance.post("/change_status",{token: idToken});
        console.log(account_verified_status)
        if (account_verified_status.data == "registered") {
          sessionStorage.setItem("token", idToken);
          return {Code:"200",message:"Authenticated"}
        }
      }
    } else {
      if(res.data=="Email-ID Not Exist"){
         return {Code:"404",message: "Email ID Not Registered",}
      }
      else{
        return {Code:"400",message: "Verification Pending"}
      }
    }
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      return {Code:"300",message: "Incorrect password or email ID",}
    }
  }
};


// Password reset API Module
export const Forget_module = async (data) => {
  try {
    const res = await axiosInstance.post("/Signup", { EmailID: data.EmailID });   
    if (res.data === "Email-ID Not Exist") {
      return { Code: "404", message: "Email ID Not Registered" };
    } else {
      await sendPasswordResetEmail(auth, data.EmailID);
      return { Code: "200", message: "Password reset email sent successfully" };
    }
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};


// New Job Application API Module
export const New_application = async (data) => {
  try {
    const response = await axiosInstance.post("/newRegistration", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   
    console.log(response)
    if( response.data.message=="File uploaded and saved to MongoDB"){
      return { Code: 200, message: "File uploaded and saved to MongoDB" };
    }
    else if(response.data.message=="Application Already Exists") {
      return { Code: 400, message: "Application Already Exist" };
    }
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};


export const help_module = async (data,token) => {
  try {
    console.log(token)
    const res = await axiosInstance.post("/helpForm", { 
      TokenID: token,
      Name: data.Name,
      EmailID: data.EmailID,
      contact_number: data.contact_number,
      Subject: data.Subject
    });
    if(res.data=="Submitted"){
      return {status:200}
    }
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};

// User details fetching API Module
export const Fetch_user_details = async (data) => {
  try {
 
    const result = await axiosInstance.get("/Fetch_userdetails",{params: { token: data}});
    return result.data
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};


// User JobApplicatoin fetching API Module
export const User_applications = async () => {
  try {
    const idToken = sessionStorage.getItem("token");
    const result = await axiosInstance.get("/jobapplication",{params: { token: idToken}});
    console.log(result)
    return{data_1:result.data.data1,data_2:result.data.data2}
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};

// User subscription process API Module
export const New_Payment_request = async (Payment_type) => {
  try {
   const idToken = sessionStorage.getItem("token");
  //  console.log(Payment_type)
  } catch (error) {
    console.log(error);
    return { Code: "500", message: "An error occurred while processing the request" };
  }
};

