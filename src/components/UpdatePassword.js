import React, { useState } from "react";
import { Form, FormGroup, Button, Container, Input, Label } from "reactstrap";
import CustomNavbar from "./CustomNavbar";
import Cookies from "js-cookie";
import { updateUserPassword } from "../services/user-service";
import { removeUserDetails } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


const UpdatePassword = () => {

    const userId = Cookies.get('id');
    const email = Cookies.get('email');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user,setUser] = useState({
        username:email,
        password:''
    })

    const updatePassword = (event) =>{
        event.preventDefault();

        const confirm = window.confirm("Are you sure you want to update password?");

        if(confirm){
            updateUserPassword(user).then((data) =>{
                console.log(data);
                toast.success(data.message);
                alert("You will be logged out, Kindly login again with updated password!");

                setTimeout(()=>{
                    logOut();
                },2000)

            }).catch(error =>{
                console.error(error);
            })
        }
        else{
            toast.error("Can not update password!");
        }




    }

    
  const logOut = () => {
    dispatch(removeUserDetails(userId));
    Cookies.remove("isLoggedIn");
    Cookies.remove("id");
    Cookies.remove("name");
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        console.log(user)
    };

  return (
    <>
      <CustomNavbar></CustomNavbar>
      <Container className="mt-5 text-center border shadow p-5">
        <Form onSubmit={updatePassword}>
            <h2>UPDATE PASSWORD</h2>
            <br/>

          <FormGroup >
            <Label for="exampleEmail" hidden>
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="username"
              type="email"
              defaultValue={user.username}           
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
          </FormGroup>{" "}
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};
export default UpdatePassword;
