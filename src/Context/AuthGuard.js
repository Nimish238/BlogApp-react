import React, {useContext, useEffect } from "react";
import AuthContext from "./Auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const AuthGuard = ({children}) =>{

    const {status,setStatus} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() =>{
        checkUser();
    },[children])

    const userCredentials = useSelector((state) =>{
        return (state.userItems).user;
    })

    const checkUser = () =>{
        const userId = Cookies.get('id');
        try{
            if(userId){
                if(userCredentials.hasOwnProperty(userId)){
                    // console.log(userCredentials.hasOwnProperty(userId))
                    setStatus(true);
                    return;
                }
                else{
                    setStatus(false);
                }
            }else{
                setStatus(false);
            }
            
            if(!status){
                navigate('/login');
            }
        }catch(error){
            console.log(error);
            navigate('/login');
        }

    }

    

    return(
        <>

        {status ? <React.Fragment>{children}</React.Fragment>:<React.Fragment></React.Fragment>}
        
        </>
    )
}

export default AuthGuard;