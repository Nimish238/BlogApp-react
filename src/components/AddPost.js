import { useEffect,useRef,useState } from "react";
import { Button, Card, CardBody,Container,Form, FormText, Input, Label } from "reactstrap";
import CustomNavbar from "./CustomNavbar";
import { getAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost } from "../services/post-service";
import Cookies from "js-cookie";
import FormData from "form-data";
import { useNavigate } from "react-router-dom";

const AddPost = () =>{

    const[postData,setPostData] = useState({
        title:'',
        content:'',
    })
    const [image,setImage] = useState(null);
    const [categoryId,setCategoryId] = useState(0);

    const editor = useRef(null);
    const navigate = useNavigate();
 
    const [categories,setCategories] = useState([]);

    

    useEffect(() =>{
        getAllCategories().then((data) =>{
            setCategories(data);
        }).catch(error =>{
            console.log(error);
        })
    },[]);

    const fieldChange = (event) =>{   
        setPostData({...postData,[event.target.name]:event.target.value})
    }

    const contentFieldChange = (data) =>{
        setPostData({...postData,'content':data});
    }

    const submitPost = async(event) =>{
        event.preventDefault();

        if(postData.title.trim() ===''){
            toast.error("title is required");
            return;
        }

        if(postData.content.trim() ===''){
            toast.error("content is required");
            return;
        }

        if(categoryId.trim() ===''){
            toast.error("Please select category");
            return;
        }

                
        try{
                    
            const userId = Cookies.get('id');
            const formData = new FormData();
            formData.append('image',image);
            formData.append('postData',JSON.stringify({...postData}));


            const response = await createPost({formData,userId,categoryId});
            
            if(!response.hasError){
                setPostData({
                    title:'',
                    content:'',
                })
                setCategoryId(0);
                toast.success("Post Created successfully");
                navigate(0);
                
            }
            else{
                console.log("Error");
            }

        }catch(error){
            console.log("Error :",error);
        }
    }

    const resetButton = () =>{
        setPostData({
            title:'',
            content:'',
        })
        setImage(null);
        setCategoryId(0);
    }

    return(
        <>
        <CustomNavbar></CustomNavbar>

        <div className="wrapper">
            <Card className="shadow-sm">
                <CardBody>
                  
                    <h3>What's goin on in your mind ?</h3>
                    <Form onSubmit={submitPost}>
                        
                        <div className="my-3">
                            <Label for="title" >Post title </Label>
                            <Input 
                            type="text" 
                            id="title" 
                            placeholder="Enter here ..."
                            className="rounded-0"
                            name="title"
                            required 
                            value={postData.title}
                            onChange={fieldChange}/>
                        </div>

                        <div className="my-3">
                            <Label for="content" >Post content </Label>

                            <JoditEditor 
                            ref={editor} 
                            value={postData.content}                       
                            onChange={contentFieldChange}
                            required
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

                        <div className="my-3">
                            <Label for="category" >Select category </Label>
                            <Input 
                            type="select" 
                            id="category" 
                            placeholder="Enter here ..."
                            className="rounded-0"
                            name="categoryId"
                            value={categoryId}
                            onChange={(e) =>{setCategoryId(e.target.value)}}
                            required>
                                <option disabled value={0}> ---Select category---</option>
                                {
                                    categories.map((category) =>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }
                            </Input>    
                        </div>
                        <Container className="text-center">
                            <Button color="primary" type="submit">Create post</Button>
                            <Button color="danger" className="ms-2" onClick={resetButton}>Reset post</Button>
                        </Container>
                    </Form>


                </CardBody>
            </Card>
        </div>
        </>
    )
}

export default AddPost;