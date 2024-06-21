import { Card, CardBody, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';


function Post({postData = {title:"This is default title",content : "This is default content"}}) {


    const baseURL = 'http://localhost:8080/api';
    useEffect(() =>{
        console.log(postData);
    })


    return(
        <>
        

          
            <Card className="border-0 shadow mt-3">
                <CardBody>
                    {/* <div className="container">
                        <h4>By {postData.user.name}</h4>
                    </div> */}
                    <h1 className="mt-5">{postData.title}</h1>
                    <CardText dangerouslySetInnerHTML={{__html :postData.content.substring(0,60)+"..."}}>
                    </CardText>
                    <div className="image-container " >
                        <img className='img-fluid' src={baseURL+'/post/image/'+postData.imageName} style={{maxWidth:'50%',maxHeight:'300px'}}alt="" />
                    </div>
                    <div className="mt-5">
                        <Link className="btn btn-dark"  to ={'/readMore/'+postData.postId}>Read more</Link>
                    </div>
                </CardBody>       
            </Card>



        </>




    )
}

export default Post;