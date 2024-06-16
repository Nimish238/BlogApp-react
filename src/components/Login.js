import React, {  useContext, useState } from "react";
import { loginApi,register } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {addUserDetails} from "../redux/slices/UserSlice";
import AuthContext from "../Context/Auth";


export default function Login() {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const dispatch = useDispatch();
  const [error,setError] = useState({
    errors:{},
    isError:false,
  })
 
  const {setStatus,setUserId} = useContext(AuthContext);

  
  const [loginDetails, setLoginDetails] = useState({
    username: "nimish@gmail.com",
    password: "nimish@123",
  });
  const [data,setData] = useState({
    name:'',
    email:'',
    password:'',
  })

  const toggleSignup = () => {
    setSignUp(true);
  };

  const toggleLogin = () => {
    setSignUp(false);
  };



  const handleEmail = (e) => {
    setLoginDetails((prev) => {
      return { ...prev, username: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setLoginDetails((prev) => {
      return { ...prev, password: e.target.value };
    });
  };

  //For login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(
      loginDetails.username.trim() === "" || loginDetails.password.trim() === "" 
    ){
      toast.error("Username or password is required");
      return;
    }

    try{
      const response = await loginApi(loginDetails);
   
      if (!response.hasError) {
        console.log(response);
        setStatus(true);     
        dispatch(addUserDetails(response.data));   
        setUserId(response.data.id);
        
        navigate("/");    
      } else {
        console.log("error");
      }
    }   
    catch(error){
      if(error.response.status === 400 || error.response.status === 404){
        toast.error(error.response.data.message);
      }
      else{
        toast.error("Login error!!");
      }
    }
  };

  // for registration
  const resetButton = () =>{
    setData({
      name:'',
      email:'',
      password:'',
    })
  }

  //for login
  const resetBtn = () =>{
    setLoginDetails({
      username:'',
      password:'',
    })
  }

  // change for email , password and username in registration
  const handleChange = (event,property) =>{
    //changing dynamically
    setData({...data,[property]:event.target.value})

  }


  // For registration
  const submitForm = async(event) =>{
    event.preventDefault();

    
    try {
      const response = await register(data);
      if (!response.hasError) {
        navigate('/login');
        toast.success("User registered successfully")
        setData({
          name:'',
          email:'',
          password:'',
        })
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError({
        errors:error,
        isError:true,
      })
    }
  

  }


  return (
    <>
      <CustomNavbar></CustomNavbar>

      <div className="form-modal">
        <div className="form-toggle">
          <button
            id="login-toggle"
            onClick={toggleLogin}
            style={{
              backgroundColor: signUp ? "#fff" : "#000",
              color: signUp ? "#222" : "#fff",
            }}
          >
            log in
          </button>

          <button
            id="signup-toggle"
            onClick={toggleSignup}
            style={{
              backgroundColor: signUp ? "#000" : "#fff",
              color: signUp ? "#fff" : "#222",
            }}
          >
            sign up
          </button>
        </div>

        {/* for Log-in */}
        <div id="login-form" style={{ display: signUp ? "none" : "block" }}>
          <form>
            <input
              placeholder="Enter email "
              type="username"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmail}
              value={loginDetails.username}
            />
            <input
              placeholder="Enter password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handlePassword}
              value={loginDetails.password}
            />
            <div className="container" style={{ display: "flex" }}>
            <button type="button" className="btn login" onClick={handleSubmit}>
              login
            </button>
            <button onClick={resetBtn} type="reset" className="btn signup">
                Reset
            </button>
            </div>


            <hr />
          </form>
        </div>


       {/* for registration */}
        <div id="signup-form" style={{ display: signUp ? "block" : "none" }}>
          <form onSubmit={submitForm}>

          <input 
            type="text" 
            placeholder="Enter name" 
            autoComplete="off"
            onChange={(e)=>handleChange(e,'name')} 
            value={data.name}
          />
           <small style={{ color: "red" }}>{error.errors?.response?.data?.name}<br/></small>

          <input
              placeholder="Enter email"
              type="email"
              onChange={(e)=>handleChange(e,'email')}
              autoComplete="off"
              value={data.email}
          />
           <small style={{ color: "red" }}>{error.errors?.response?.data?.email}<br/></small>

            <input
              type="password"
              placeholder="Create password"
              onChange={(e)=>handleChange(e,'password')}
              value={data.password}
            />
         <small style={{ color: "red" }}>{error.errors?.response?.data?.password}</small>
         <br/>


            <div className="container" style={{ display: "flex" }}>
              <button type="submit" className="btn signup">
                create account
              </button>
              <button onClick={resetButton} type="reset" className="btn signup">
                Reset
              </button>
            </div>
            <br></br>

            <p>
              Clicking <strong>Create Account</strong> means that you agree to
              our
              <span style={{ color: "red" }}> terms of services</span>.
            </p>
            <hr />
          </form>
        </div>
      </div>
    </>
  );
}
