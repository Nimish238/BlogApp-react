import React, { useEffect,useState } from "react";
import CustomNavbar from "./CustomNavbar";
import Cookies from "js-cookie";
import { getPostByUser } from "../services/post-service";
import Post from "./Post";
import { Col, Row } from "reactstrap";

const UserPosts = () =>{

    const id = Cookies.get('id');
    const [posts,setPosts] = useState([]);

    useEffect(() =>{

        getPostByUser(id).then((data) =>{
            setPosts(data);
        }).catch(error=>{
            console.error(error);
        })

    },[id])


    return(
        <>
        <CustomNavbar></CustomNavbar>

        <Row>
            <Col md={2} className='border pt-3'>

            </Col >
            <Col md={9}>
                {
                    posts && 
                    posts.map((postData) =>{
                        return(
                            <Post  key={postData.postId} postData={postData}/>
                        )
                        
                    })
                }
            </Col>
        </Row>

        </>
       

    )
}

export default UserPosts;