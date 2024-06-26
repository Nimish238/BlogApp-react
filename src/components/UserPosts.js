import React, { useEffect,useState } from "react";
import CustomNavbar from "./CustomNavbar";
import Cookies from "js-cookie";
import { getPostByUser } from "../services/post-service";
import Post from "./Post";
import { Col, Container, Row } from "reactstrap";

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



        <Container>
            <Row>
                <Col >
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
        </Container>


        </>
       

    )
}

export default UserPosts;