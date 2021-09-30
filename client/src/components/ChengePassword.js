import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


const errorField = {
  otpErr:"",
  passwordErr:"",
  cpasswordError:""
};

const ChengePassword = ({emailprops}) => {
  const initialVal = {
    otp:"",
    password:"",
    email: emailprops
  };

  const history = useHistory();
  const [inputfield, setInputfield] = useState(initialVal);
  const [formvalid, setFormvalid] = useState(errorField);

  const inputHandler = (e) =>{
    setInputfield({...inputfield,[e.target.name]:e.target.value})
    // console.log(inputfield);
  }

  const login = async (e) =>{
    e.preventDefault();
    // let newinputfield = Object.assign(inputfield, emailprops);
    console.log(inputfield);
    const url = "http://localhost:8000/api/change-password";
    if(validForm()){
      let options = {
        method: 'POST',
        url: url,
        headers:{
        },
        data: inputfield
      };
      try{
        const res = await axios(options);
        console.log(res);
        if(res.status == 200){
          toast.success("User Login Successfully !", {
            position: toast.POSITION.TOP_CENTER
          });
          // localStorage.setItem('token',res.data.token);
          setTimeout(()=>{
            history.push("/");
          }, 1500);    
        }
      }catch(err){
        toast.error("Username/Password not valid! 2", {
          position: toast.POSITION.TOP_LEFT
        });
      }
    }else{
      toast.error("Username/Password not valid! hi", {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  const validForm = () =>{
    let formisvalid = true;
    setFormvalid(errorField);

    if(inputfield.otp === ''){
      formisvalid = false;
      setFormvalid(prevState => ({
        ...prevState, emailErr: "Please enter the otp"
      }))
    }
    if(inputfield.password === ''){
      formisvalid = false;
      setFormvalid(prevState => ({
        ...prevState, passwordErr: "Please enter the password"
      }))
    }
    if(inputfield.password !== inputfield.cpassword){
      formisvalid = false;
      setFormvalid(prevState => ({
        ...prevState,cpasswordError: 'Password are not match'
      }))
    }
    return formisvalid;
  }

  return (
    <>
      <form>
        <div className="container ">
          <ToastContainer/>
          <h1>Reset Password</h1>
          <p>Please fill in this form to reset your password.</p>

          <label htmlFor="otp"><b>OTP</b></label>
          { formvalid.otpErr.length > 0 && <span className="error">{formvalid.otpErr}</span> }
          <input autoComplete="off" type="text" placeholder="Enter OTP" name="otp" id="email" required maxLength="4" value={inputfield.otp} onChange={inputHandler} />

          <label htmlFor="psw"><b>Password</b></label>
          { formvalid.passwordErr.length > 0 && <span className="error">{formvalid.passwordErr}</span> }
          <input autoComplete="off" type="password" placeholder="Enter Password" name="password" id="pssword" required value={inputfield.password} onChange={inputHandler} />

          <label htmlFor="cpassword"><b>Confirm Password</b></label>
          { formvalid.cpasswordError.length > 0 && <span className="error">{formvalid.cpasswordError}</span> }
          <input autoComplete="off" type="password" placeholder="Confirm Password" name="cpassword" id="pssword" required value={inputfield.cpassword} onChange={inputHandler} />

          <button onClick={login} type="submit" className="registerbtn">Save Changes</button>
        </div>
      </form>
    </>
  );
};

export default ChengePassword;
