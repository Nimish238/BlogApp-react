import React, { useEffect, useState } from 'react'
import CustomNavbar from './CustomNavbar';
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import { getPostById } from '../services/post-service';

const ReadMorePost = ()=> {

    const {postId} = useParams();
    const [post,setPost] = useState(null);
    const baseURL = 'http://localhost:8080/api';

    useEffect (()=>{

        getPostById(postId).then((data) =>{
            console.log(data);
            setPost(data);
        }).catch(error =>{
            console.log(error);
        })
    },[]);

    const printDate = (number) =>{
        return new Date(number).toLocaleString();
    }

  return (
    <>
    <CustomNavbar></CustomNavbar>


    <Container className='mt-4'>

        <Row>
            <Col md = {{ size : 12}}>
            <Card className='mt-3 ps-2'>
                { post &&
                <CardBody>

                    <h1 >{post.title}</h1>
                    
                    <CardText  dangerouslySetInnerHTML={{__html :post.content}}></CardText>

                    <div className="image-container " >
                        <img className='img-fluid' src={baseURL+'/post/image/'+post.imageName} style={{maxWidth:'50%',maxHeight:'300px'}}alt="" />
                    </div>

                    <div className="divider mt-5" style={{
                         width:'100%',
                         height:'1px',
                         background:'#000'
                    }}>
                       
                    </div>
                    <CardText className='mt-2'>
                        Posted by <b>{post.user.name} </b>on <b>{printDate(post.addedDate)}</b>
                    </CardText>
                    <CardText>
                        <span className='text-muted'> {post.category.categoryTitle}</span>
                    </CardText>
                </CardBody>
                }
            </Card>
            </Col>
        </Row>
        
    </Container>
    </>
    
  )
}

export default ReadMorePost;