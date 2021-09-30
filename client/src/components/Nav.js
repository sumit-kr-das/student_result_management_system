import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
// context api
import React,{useContext} from 'react';
import Context from '../store/context';

const Nav = () =>{
    const history = useHistory();
    const { state, dispatch } = useContext(Context); // context api

    const logOut = () =>{
        localStorage.removeItem('token');
        history.push('/login');
    }

    return(
        <ul>
            <li><NavLink className="active" to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Admin Login</NavLink></li>
            {/* <li><NavLink to="/signup" activeClassName="active">Register User</NavLink></li> */}
            <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
            <div style={{ float: "right"}}>
                <li><a onClick={logOut} style={{cursor:"pointer"}} >Logout</a></li>
                <li><NavLink to="/test" activeClassName="active">{state.name}</NavLink></li> 
            </div>
        </ul>

    )
}
export default Nav;