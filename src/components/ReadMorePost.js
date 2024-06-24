import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { createComment, deleteComment, getPostById } from "../services/post-service";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import { getUserById } from "../services/user-service";
import { MdDelete } from "react-icons/md";

const ReadMorePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [doComment, setDoComment] = useState({
    content: "",
  });
  // const [user,setUser] =useState(null);
  const navigate= useNavigate();
  const baseURL = "http://localhost:8080/api";
  const doLogIn = Cookies.get('isLoggedIn');
  const userId = Cookies.get('id');

  useEffect(() => {
    getPostById(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);


  const printDate = (number) => {
    return new Date(number).toLocaleString();
  };


  const submitComment = () => {

    if(!doLogIn){
        toast.error("Log-in to your account");
        navigate('/login');
        return;
    }

    if(doComment.content.trim()===''){
        return;
    }

    createComment(post.user.id, post.postId, doComment)
      .then((data) => {
       setPost({
        ...post,
        comments:[...post.comments,data]
       })
        setDoComment({
            content: ''
        })
      }).catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleDeleteComment = (id) =>{

    const confirm = window.confirm("Are you sure you want to delete the comment?");

    if(confirm){
      deleteComment(userId,postId,id).then((data) =>{        
         toast.success(data.message);

        setTimeout(() =>{
          window.location.reload();
        },3000)
      }).catch(error =>{
        console.log(error);     
      })
    }
    else{
      toast.error("Comment not deleted!");
    }

  }



  // const getId = (userId) =>{
  //   getUserById(userId).then((data) =>{
  //     console.log(data);
  //     setUser(data);
  // }).catch(error =>{
  //     console.error("Error fetching data");
  // }) 
  // } 


  return (
    <>
      <CustomNavbar></CustomNavbar>

      <Container className="mt-4">
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2">
              {post && (
                <CardBody>
                  <CardText className="mt-2">
                    Posted by <b>{post.user.name} </b>on{" "}
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {" "}
                      {post.category.categoryTitle}
                    </span>
                  </CardText>

                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#000",
                    }}
                  ></div>

                  <h1 className="mt-5">{post.title}</h1>

                  <CardText
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>

                  <div className="image-container ">
                    <img
                      className="img-fluid"
                      src={baseURL + "/post/image/" + post.imageName}
                      style={{ maxWidth: "50%", maxHeight: "300px" }}
                      alt=""
                    />
                  </div>

                  <CardText className="mt-5" style={{ textAlign: "right" }}>
                    <span className="text-muted">
                      {" "}
                      {post ? post.comments.length : 0} comments
                    </span>
                  </CardText>
                  <div
                    className="divider mt-0"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <Row>
                    <Col md={{ size: 9, offset: 1 }}>
                      <div style={{ display: "flex" }} className="mt-1">
                        <Input
                          type="text"
                          style={{ borderRadius: "20px" }}
                          placeholder="Enter comments.."
                          value={doComment.content}
                          onChange={(event) =>
                            setDoComment({ content: event.target.value })
                          }
                        />
                        <Button
                          onClick={submitComment}
                          style={{
                            borderRadius: "20px",
                            backgroundColor: "#000",
                          }}

                        >
                          {" "}
                          Post
                        </Button>
                      </div>

                      {post &&
                        post.comments.map((c, index) => (                     
                          <Card className="mt-2 border-0" key={index}>
                            <CardBody>
                              <CardText  className="d-flex justify-content-between align-items-center"> 
                                {c.content} <button className="btn btn-danger px-1" onClick={() =>handleDeleteComment(c.id)} ><MdDelete style={{fontSize:"25px"}}/></button>
                              </CardText>
                            </CardBody>
                          </Card>
                        ))}
                    </Col>
                  </Row>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReadMorePost;
