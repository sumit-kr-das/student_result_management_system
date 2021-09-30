import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import Context from "../store/context"; // context api

const Home = () => {
  const { state, dispatch } = useContext(Context); //context api 
  const history = useHistory();

  const [userdata,setUserdata] = useState({
    name: "",
    email: " ",
    phone:" "
  });

  const getData = async () =>{
    const url = "http://localhost:8000/api/list";
    let options = {
      method: "GET",
      url: url,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try{

      const res = await axios(options);
      // console.log("login is",res.data);
      let record = res.data;
      // console.log("log is:" ,record)
      dispatch({ type: "UPDATE_NAME", payload: record.name }); // context api
      setUserdata({
        name: record.name,
        email: record.email,
        phone:record.phone
      })

    }catch(err){
      // history.push("/login")
      console.log("error",err);
    }
  }

  useEffect(() => {
    getData();
    // console.log("Yeah",localStorage.getItem('token'));
  },[]); 


  const login = () =>{
    history.push('/stdmarks')
  }

  return (
    <div className="home">
      <img src="/img/exam.jpg" alt="" />
      <div className="form">
      <form>
        <div className="container ">
          <h1>Student Login</h1>
          <p>Please fill in this form to Login your account.</p>

          <label htmlFor="roll"><b>Roll No</b></label>
          <input autoComplete="off" type="text" placeholder="Enter Roll no." name="roll" id="email" required/>

          <label htmlFor="psw"><b>Password</b></label>
          <input autoComplete="off" type="password" placeholder="Enter Password" name="password" id="pssword" required />

          <p>By creating an account you agree to our Terms & Privacy.</p>
          <button onClick={login} type="submit" className="registerbtn">Login</button>
        </div>
        <div className="container signin">
          <p>Create a new account? <Link to="/signup">Register</Link>.</p>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Home;
