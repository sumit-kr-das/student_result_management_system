import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

const initialVal = {
  name:"",
  email:"",
  phone:"",
  password:"",
  confirm_password:""
};

const errorMsg = {
  nameErr:"",
  emailErr:"",
  phoneErr:"",
  passwordErr:"",
  confirm_passwordErr:""
};

const Registration = () => {
  const history = useHistory();
  const [inputfield, setInputfield] = useState(initialVal);
  const [errorfield, setErrorfield] = useState(errorMsg);

  const inputHandler = (e) =>{
    setInputfield({ ...inputfield, [e.target.name]:e.target.value });
  }

  const submit = async (e) =>{
    e.preventDefault();
    const url = "http://localhost:8000/api/setUser";
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
        if(res.status == 200){
          toast.success("User Regisrtered Successfully !", {
            position: toast.POSITION.TOP_CENTER
          });
          setTimeout(()=>{
            history.push("/login");
          }, 1500);    
        }
      }catch(err){
        toast.error("Error: Something want wrong !", {
          position: toast.POSITION.TOP_LEFT
        });
      }
    }else{
      toast.error("Error: Form is not valid !", {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  const validForm = () =>{
    let formIsValid = true;
    setErrorfield(errorMsg); // clear state
    const validEmail = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    if(inputfield.name == ''){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,nameErr: 'Please Enter Name'
      }))
    }
    if(inputfield.email == ''){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,emailErr: 'Please Enter Email'
      }))
    }
    if(!validEmail.test(inputfield.email)){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,emailErr: 'Email is not valid'
      }))
    }
    if(inputfield.phone == ''){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,phoneErr: 'Please Enter Phone no'
      }))
    }
    if(inputfield.password == ''){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,passwordErr: 'Please Enter Password'
      }))
    }
    if(inputfield.confirm_password == ''){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,confirm_passwordErr: 'Please Enter Confirm Password'
      }))
    }
    if(inputfield.password !== inputfield.confirm_password){
      formIsValid = false;
      setErrorfield(prevState => ({
        ...prevState,confirm_passwordErr: 'Password are not match'
      }))
    }

    return formIsValid;
  }

  return (
    <>
      <form>
        <div className="container ">

          <ToastContainer/>
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>

          <label htmlFor="username"><b>Username</b></label><br />
          { errorfield.nameErr.length > 0 && <span className="error">{errorfield.nameErr}</span> }
          <input type="text" placeholder="Enter Username" name="name" value={inputfield.name} onChange={inputHandler} />
          
          <label htmlFor="email"><b>Email</b></label><br />
          { errorfield.emailErr.length > 0 && <span className="error">{errorfield.emailErr}</span> }
          <input type="text" placeholder="Enter Email" name="email" value={inputfield.email} onChange={inputHandler} />

          <label htmlFor="phone"><b>Phone</b></label><br />
          { errorfield.phoneErr.length > 0 && <span className="error">{errorfield.phoneErr}</span> }
          <input type="text" placeholder="Enter Phone no" name="phone" value={inputfield.phone} onChange={inputHandler} id="email" />

          <label htmlFor="password"><b>Password</b></label><br />
          { errorfield.passwordErr.length > 0 && <span className="error">{errorfield.passwordErr}</span> }
          <input type="password" placeholder="Enter Password" name="password" value={inputfield.password} onChange={inputHandler} id="psw" />

          <label htmlFor="psw-repeat"><b>Repeat Password</b></label><br />
          { errorfield.confirm_passwordErr.length > 0 && <span className="error">{errorfield.confirm_passwordErr}</span> }
          <input type="password" placeholder="Repeat Password" name="confirm_password" value={inputfield.confirm_password} onChange={inputHandler} id="psw-repeat" />

          <p>By creating an account you agree to our Terms & Privacy.</p>
          <button onClick={submit} className="registerbtn">Register</button>
        </div>
        <div className="container signin">
          <p>Already have an account? <Link to="/login">Sign in</Link>.</p>
        </div>
      </form>
    </>
  );
};

export default Registration;
