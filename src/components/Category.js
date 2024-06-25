import React, { useState,useEffect } from "react";
import { Col, Row} from "reactstrap";
import {  useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import { getPostByCategory } from "../services/post-service";
import Post from "./Post";
import CategoryComponent from "./CategoryComponent";
import {Container} from "reactstrap";


const Category = () =>{

    const {categoryId} = useParams();
    const [posts,setPosts] = useState([]);


    useEffect(() =>{
        getPostByCategory(categoryId).then((data)=>{
            setPosts(data);
        }).catch(error =>{
            console.log('Error fetching data:',error);
        })
    },[categoryId])




    return(
        <>


        <CustomNavbar></CustomNavbar>

        <Container className='mt-3'>
            <div className="container-fluid">
                <Row>
                    <Col md={2} className='border pt-3'>
                        <CategoryComponent/>
                    </Col>

                    <Col md={{size:9 }} >

                    { posts  &&  
                            posts.map((postData) =>{
                                return(
                                    <Post key={postData.postId} postData={postData}/>  
                                )                       
                            }) 
                    }  
                    </Col>
                </Row>


            </div>


        </Container>


       
        </>


    )
}

export default Category;