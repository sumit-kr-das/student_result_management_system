import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:8000/api/get_result";

const MarkSheet = () => {

  const [marks, setMarks] = useState({});
  const [prestnt, notPresent] = useState(true);


  useEffect(() => {
    setVal();
  }, []);


  const setVal = async () => {
    try {
      const resp = await axios.get(url);
      setMarks(resp.data.resu[0]);
      console.log("val is: ",marks.name);
      // notPresent(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="sheet">
      {/* {prestnt ? (
        <h1>Not</h1>
      ) : ( */}
        <>
          <h1>Name: Suman Das</h1>
          <h2>Roll No. 19CS060055</h2>
          <table>
            <thead>
              <tr>
                <td colspan="3">Course </td>
                <td rowspan="2"> CGPA </td>
                <td rowspan="2"> Credits </td>
                <td colspan="2"> Grade </td>
              </tr>
              <tr>
                {/* <td>Code </td> */}
                <td colspan="2"> Name </td>
                <td> Letter </td>
                <td> Points </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>CS 225 </td> */}
                <td colspan="2">Hindi </td>
                <td> Fall 2021</td>
                <td> 2.0 </td>
                <td> A </td>
                <td> 50 </td>
              </tr>
              <tr>
                {/* <td>PHIL 105 </td> */}
                <td colspan="2">English </td>
                <td> Fall 2021</td>
                <td> 2.0 </td>
                <td> A </td>
                <td> 50 </td>
              </tr>
              <tr>
                {/* <td>ECE 310 </td> */}
                <td colspan="2">Math </td>
                <td> Fall 2021</td>
                <td> 2.0 </td>
                <td> A </td>
                <td> 50 </td>
              </tr>
              <tr>
                {/* <td>CS 373 </td> */}
                <td colspan="2">Computer Science </td>
                <td> Fall 2021</td>
                <td> 2.0 </td>
                <td> A </td>
                <td> 50</td>
              </tr>
              <tr>
                {/* <td>MATH 225 </td> */}
                <td colspan="2">Physics </td>
                <td> Fall 2021</td>
                <td> 2.0 </td>
                <td> A </td>
                <td> 50 </td>
              </tr>
              <tr>
                {/* <td>MATH 225 </td> */}
                <td colspan="2">Chemistry </td>
                <td> Fall 2021</td>
                <td>2.0 </td>
                <td> A </td>
                <td> 50 </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="footer">
                  Total
                </td>
                <td> 15.0 </td>
                <td colspan="2">50.00 </td>
              </tr>
              <tr>
                <td colspan="4" class="footer">
                  GPA
                </td>
                <td colspan="3">2.0 / 4.0 </td>
              </tr>
            </tfoot>
          </table>
        </>
      {/* )} */}
    </div>
  );
};

export default MarkSheet;
