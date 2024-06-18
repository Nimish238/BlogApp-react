import React, { useEffect } from 'react'
import CustomNavbar from './CustomNavbar'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie';
// import { Container } from 'reactstrap';
// import AddPost from './AddPost';



export default function Home() {



  let cartObj = useSelector((state) =>{
    return (state.userItems).user;
  });

  const id = Cookies.get('id');


  useEffect (()=>{
    console.log(cartObj);
    console.log(id);
  });


  return (  
    <>
    <CustomNavbar></CustomNavbar>
    <h1>This is Home page</h1>

    {/* <Container>
      <AddPost/>
    </Container> */}
    </>
  )
}
