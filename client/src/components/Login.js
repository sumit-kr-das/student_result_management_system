import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


const initialVal = {
  email:"",
  password:""
};

const errorField = {
  emailErr:"",
  passwordErr:""
};

const Login = () => {
  const history = useHistory();
  const [inputfield, setInputfield] = useState(initialVal);
  const [formvalid, setFormvalid] = useState(errorField);

  const inputHandler = (e) =>{
    setInputfield({...inputfield,[e.target.name]:e.target.value})
    // console.log(inputfield);
  }

  const login = async (e) =>{
    e.preventDefault();
    const url = "http://localhost:8000/api/login";
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
        // console.log(res);
        if(res.status == 200){
          toast.success("User Login Successfully !", {
            position: toast.POSITION.TOP_CENTER
          });
          localStorage.setItem('token',res.data.token);
          setTimeout(()=>{
            history.push("/admin");
          }, 1500);    
        }
      }catch(err){
        toast.error("Username/Password not valid!", {
          position: toast.POSITION.TOP_LEFT
        });
      }

    }else{
      toast.error("Username/Password not valid!", {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  const validForm = () =>{
    let formisvalid = true;
    setFormvalid(errorField);

    if(inputfield.email === ''){
      formisvalid = false;
      setFormvalid(prevState => ({
        ...prevState, emailErr: "Please enter the email"
      }))
    }
    if(inputfield.password === ''){
      formisvalid = false;
      setFormvalid(prevState => ({
        ...prevState, passwordErr: "Please enter the password"
      }))
    }

    return formisvalid;
  }

  return (
    <>
      <form>
        <div className="container ">
          <ToastContainer/>
          <h1>Login User</h1>
          <p>Please fill in this form to Login your account.</p>

          <label htmlFor="email"><b>Email</b></label>
          { formvalid.emailErr.length > 0 && <span className="error">{formvalid.emailErr}</span> }
          <input autoComplete="off" type="text" placeholder="Enter Email" name="email" id="email" required value={inputfield.email} onChange={inputHandler} />

          <label htmlFor="psw"><b>Password</b></label>
          { formvalid.passwordErr.length > 0 && <span className="error">{formvalid.passwordErr}</span> }
          <input autoComplete="off" type="password" placeholder="Enter Password" name="password" id="pssword" required value={inputfield.password} onChange={inputHandler} />

          <p>By creating an account you agree to our Terms & Privacy.</p>
          <button onClick={login} type="submit" className="registerbtn">Login</button>
        </div>
        <div className="container signin">
          <p>Create a new account? <Link to="/signup">Register</Link>.</p>
        </div>
        <div className="container signin" style={{marginTop:10}}>
          <p><Link to="/reset_password">Forgot Password</Link>.</p>
        </div>
      </form>
    </>
  );
};

export default Login;
