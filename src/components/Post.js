import {  Button, Card, CardBody, CardText, Modal, ModalBody, ModalFooter, ModalHeader,Container, Form, Label, Input,FormText } from "reactstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import React from 'react';
import {  deletePostById, updatePost, uploadPostImage } from "../services/post-service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState,useRef } from "react";
import JoditEditor from "jodit-react";
import FormData from "form-data";




function Post({postData = {title:"This is default title",content : "This is default content"}}) {


    const baseURL = 'http://localhost:8080/api';
    const {userId} =useParams();
    const id = Cookies.get('id');
        
    const location = useLocation();
    const showButtonPaths = ['/userPosts/'+userId];
    const shouldShowButton = showButtonPaths.includes(location.pathname);

   

   

    const editor = useRef(null);

    const [modal, setModal] = useState(false);

    const [postId,setPostId] = useState(0);

    const[post,setPost] = useState({
        title:'',
        content:'',
    })

    const [image,setImage] = useState(null);

    const toggleOpen = (id) => {
        setModal(true)
        setPostId(id);
        
    };

    const toggleClose = () =>{
        setModal(false);
        setPostId(0);
        setPost({
            title:'',
            content:'',
        })
    }
       
    const resetButton = () =>{
        setPost({
            title:'',
            content:'',
        })
    }

    const fieldChange = (event) =>{   
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChange = (data) =>{
        setPost({...post,'content':data});
    }

    const deletePost = (id) =>{
        const confirm = window.confirm("are you sure you want to delete this post?");
        if(confirm){
            deletePostById(id).then((data) =>{
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

    const handleUpdatePost = async(event) =>{
        event.preventDefault();

        if(post.title.trim() ==='' || post.content.trim() ===''){
            toast.error("Field should not be empty!");
            return;
        }

        try{
            const response = await updatePost({post,postId});

            if(!response.hasError){
                setPost({
                    title:'',
                    content:'',
                })
                toast.success("Post Updated successfully");
                toggleClose();
                setTimeout(() =>{
                    window.location.reload();
                },2000)
            }
            else{
                console.log("Error");
            }

            if(image!=null){
                
                const formData = new FormData();
                formData.append('image',image);

                const response = await uploadPostImage({formData,postId});

                if(!response.hasError){
                    setPost({
                        title:'',
                        content:'',
                    })
                    toggleClose();

                }
                else{
                    console.log("Error");
                }

            }

        }catch(error){
            console.log(error);

        }
    }


    


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
                            <>
                                <Button className="btn btn-danger mx-2" onClick={() => deletePost(postData.postId)}> Delete </Button>
                                <Button className="btn btn-warning mx-2" onClick={() =>toggleOpen(postData.postId)}> Update</Button>
                            </>

                        )
                    }

                    
                    <Modal isOpen={modal}  toggle={toggleClose} >
                    <Form onSubmit={handleUpdatePost}>
                        <ModalHeader toggle={toggleClose}>
                            Update your blog!
                        </ModalHeader>
                        <ModalBody>
                            <div className="my-3">
                                <Label for="title">Title</Label>

                                <Input 
                                type="text" 
                                id="title" 
                                placeholder="Enter here ..."
                                className="rounded-0"
                                name="title"
                                value={post.title}
                                onChange={fieldChange}
                                />
                            </div>


                            <div className="my-3">
                            <Label for="content" >Post content </Label>

                            <JoditEditor 
                            ref={editor} 
                            value={post.content}                       
                            onChange={contentFieldChange}
                            />
                            </div>
                            <div>
                            <Label for="image">
                                Image
                            </Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(e) =>{setImage(e.target.files[0])}}
                            />
                            <FormText>
                                Image size should be less then 10MB!
                            </FormText>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Container className="text-center">
                                <Button color="primary" type="submit" >Create post</Button>
                                <Button color="danger" className="ms-2" onClick={resetButton}>Reset post</Button>
                            </Container>
                        </ModalFooter>
                        </Form>
                    </Modal>

                    

                                            
                    </div>

                </CardBody>       
            </Card>



        </>




    )
}

export default Post;