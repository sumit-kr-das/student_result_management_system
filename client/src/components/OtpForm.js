import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ChengePassword from './ChengePassword';

const initialVal = {
  email: "",
};

const OtpForm = () => {
  const [val, getVal] = useState(initialVal);
  const [otpForm, showForm] = useState(true);
    
  const getEmail = (e) => {
    getVal({ ...val, [e.target.name]: e.target.value });
  };
  const sendOtp = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/email-send";
    let options = {
      method: "POST",
      url: url,
      headers: {},
      data: val,
    };
    const res = await axios(options);
    if (res.status == 200) {
      toast.success("Check Your Email", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(()=>{
        showForm(false);
      },4600)
    } else if (res.status <= 400) {
      toast.error("Email not match", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  return (
    <form>
        {
            otpForm ? (
                <div className="container ">
                    <ToastContainer />
                    <h1>Reset Password</h1>
                    <p>Please enter your email for reset your password</p>
                    <label htmlFor="email">
                    <b>Email</b>
                    </label>
                    <input autoComplete="off" type="text" placeholder="Enter Email" name="email" value={val.email} onChange={getEmail} id="email" />
                    <button onClick={sendOtp} type="submit" className="registerbtn">Send OTP</button>
                </div>
            ):(
                <ChengePassword emailprops={val.email} />
            )
        }
    </form>
  );
};

export default OtpForm;
