import {  Button, Card, CardBody, CardText } from "reactstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import React from 'react';
import {  deletePostById } from "../services/post-service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";




function Post({postData = {title:"This is default title",content : "This is default content"}}) {


    const baseURL = 'http://localhost:8080/api';

    const {userId} =useParams();

    const id = Cookies.get('id');

 


    const deletePost = () =>{
        const confirm = window.confirm("are you sure you want to delete this post?");
        if(confirm){
            deletePostById(postData.postId).then((data) =>{
                console.log(data);          
                toast.success(data.message);
               
                setTimeout(() =>{
                    window.location.reload();
                },3000)
    
            }).catch(error =>{
                console.error(error);
            })
        }
        else{
            toast.error("Failed to delete the post");
        }

    }


    



    const location = useLocation();
    const showButtonPaths = ['/userPosts/'+userId];
    const shouldShowButton = showButtonPaths.includes(location.pathname);

    return(
        <>
                  
            <Card className="border-0 shadow mt-3">
                <CardBody>
        
                    <h1 className="mt-3">{postData.title}</h1>
                    <CardText dangerouslySetInnerHTML={{__html :postData.content.substring(0,30)+"..."}}>
                    </CardText>
                    <div className="image-container " >
                        <img className='img-fluid' src={baseURL+'/post/image/'+postData.imageName} style={{maxWidth:'50%',maxHeight:'300px'}}alt="" />
                    </div>
                    <div className="mt-5">
                        <Link className="btn btn-dark my-3"  to ={'/readMore/'+postData.postId}>Read more</Link>


                    {
                        shouldShowButton && id===userId && (
                            <Button className="btn btn-danger mx-2" onClick={() => deletePost(postData.postId)}> Delete </Button>
                        )
                    }
                                            
                    </div>

                </CardBody>       
            </Card>



        </>




    )
}

export default Post;