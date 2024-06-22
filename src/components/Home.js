import React, { useEffect,useState} from 'react'
import CustomNavbar from './CustomNavbar'
// import { useSelector } from 'react-redux'
// import Cookies from 'js-cookie';
import { getAllPosts} from '../services/post-service';
import { Col,Container,Row,Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import Post from './Post';
import CategoryComponent from './CategoryComponent';



export default function Home() {



  const [posts,setPosts] = useState({
    content:[],
    totalElements:'',
    totalPages:'',
    lastPage:(false),
    pageNumber:''

  });




  // const id = Cookies.get('id');





  useEffect(() =>{
    changePageNumber (0)
  },[]);

  const changePageNumber = (pageNumber=0,pageSize=5) =>{
    if(pageNumber>posts.pageNumber && posts.lastPage){
      return;
    }

    if(pageNumber<posts.pageNumber && posts.pageNumber===0){
      return;
    }

    getAllPosts(pageNumber,pageSize).then((data) =>{
      setPosts(data);
      window.scroll(0,0)
      console.log(data);
    }).catch(error =>{
        console.log(error);
    })
  }



  return (  
    <>
    <CustomNavbar></CustomNavbar>

    <Container  className='mt-3'>

    <div className="container-fluid">
      <Row>

        <Col md={2} className='border pt-3'>
        <CategoryComponent/>
        </Col>



        <Col md={{size:9 }}>

          {posts &&
            posts.content.map((postData) =>(
              <Post key={postData.postId} postData={postData}/>             
            ))
          }

          <Pagination className='mt-5'>
            <PaginationItem disabled = {posts.pageNumber===0} onClick={()=>changePageNumber((posts.pageNumber)-1)}>
              <PaginationLink >
                Previous
              </PaginationLink>
            </PaginationItem>

             {
              [...Array(posts.totalPages)].map((item,index) =>(
                  <PaginationItem onClick={()=>changePageNumber(index)} key={index} active={index === posts.pageNumber}>
                    <PaginationLink>
                      {index+1}
                    </PaginationLink>
                  </PaginationItem>
              ))
             } 

            <PaginationItem disabled={posts.lastPage} onClick={()=>changePageNumber((posts.pageNumber)+1)}>
              <PaginationLink>
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>


    </Container>
    
    </>
  )
}
