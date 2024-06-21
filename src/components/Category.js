import React, { useState,useEffect } from "react";
import { Col, Row} from "reactstrap";
import {  useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import { getPostByCategory } from "../services/post-service";
import Post from "./Post";
import CategoryComponent from "./CategoryComponent";


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

        <Row>
            <Col md={{size:2}} className='border pt-3'>
                <CategoryComponent/>
            </Col>

            <Col md={{size:9}} >

             { posts  &&  
                    posts.map((postData) =>{
                        return(
                            <Post key={postData.postId} postData={postData}/>  
                        )                       
                    }) 
                }  
            </Col>
        </Row>
       
        </>


    )
}

export default Category;