import React,{useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const initialDetails = {
    name:"",
    roll:"",
    hindi:"",
    english:"",
    math:"",
    computer:"",
    physics:"",
    chemistry:"",
    total:"",
    average:""
};

const url =  "http://localhost:8000/api/new_result";

const Admin = () =>{
    const [marks,setMarks] = useState(initialDetails);
    const setVal = (e) =>{
        setMarks({ ...marks,[e.target.name]:e.target.value });
    }
    let totalmark=(+marks.english + +marks.hindi + +marks.math + +marks.computer + +marks.physics + +marks.chemistry);
    let avgmarks = (totalmark/ 6);
    let avgmark = avgmarks.toFixed(2);
    marks.total = totalmark;
    marks.average = avgmark;

    const saveChanges = async(e) =>{
        e.preventDefault();
        const response = await axios.post(url,marks);
        if(response){
            toast.success("Registeres Successfully !", {
                position: toast.POSITION.TOP_CENTER
            });
        }else{
            toast.error("error!", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }

    return(
        <form>
        <ToastContainer/>
        <div className="container ">
          <h1>Student Result</h1>
          <p>Please fill in this form.</p>

          <label htmlFor="name"><b>Name of the Student</b></label>
          <input autoComplete="off" type="text" placeholder="Name" name="name" id="email" required value={marks.name} onChange={setVal}  />

          <label htmlFor="roll"><b>Roll No of the Student</b></label>
          <input autoComplete="off" type="text" placeholder="Enter Roll No" name="roll" id="pssword" required value={marks.roll} onChange={setVal} />
          <p>Enter the marks</p>
            <div className="form_sub">
                <div className="container ">
                    <label htmlFor="hindi"><b>Hindi</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in Hindi" name="hindi" id="email" required value={marks.hindi} onChange={setVal}  />

                    <label htmlFor="english"><b>English</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in" name="english" id="pssword" required value={marks.english} onChange={setVal} />
                </div>
                <div className="container ">
                    <label htmlFor="name"><b>Math</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in Math" name="math" id="email" required value={marks.math} onChange={setVal}  />

                    <label htmlFor="computer"><b>Computer Science</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in CS" name="computer" id="pssword" required value={marks.computer} onChange={setVal} />
                </div>
                <div className="container ">
                    <label htmlFor="physics"><b>Physics</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in Physics" name="physics" id="email" required value={marks.physics} onChange={setVal}  />

                    <label htmlFor="chemistry"><b>Chemistry</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in" name="chemistry" id="pssword" required value={marks.chemistry} onChange={setVal} />
                </div>
                <div className="container ">
                    <label htmlFor="total"><b>Total</b></label>
                    <input autoComplete="off" type="text" placeholder="Total Marks" name="total" id="email" required 
                    value={totalmark}  onChange={setVal}
                    />

                    <label htmlFor="average"><b>Average</b></label>
                    <input autoComplete="off" type="text" placeholder="Marks in Avg" name="average" id="pssword" required 
                    value={avgmark+"%"} onChange={setVal}
                    />
                </div>
            </div>
          <p>By creating an result you agree to our Terms & Privacy.</p>
          <button onClick={saveChanges} type="submit" className="registerbtn">Save</button>
        </div>
      </form>
    )
}

export default Admin