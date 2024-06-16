import React, { useContext, useEffect } from 'react'
import CustomNavbar from './CustomNavbar'
import { useSelector } from 'react-redux'
import AuthContext from '../Context/Auth';



export default function Home() {

  const {status,userId} = useContext(AuthContext);




  let cartObj = useSelector((state) =>{
    return (state.userItems).user;
  });


//  useEffect (()=>{
//   console.log(cartObj);
//   console.log(status);
 
//   const u = userId;
//   console.log(u);


//  })


  return (  
    <>
    <CustomNavbar></CustomNavbar>
    <h1>This is Home page</h1>
    
    </>

 

  )
}
