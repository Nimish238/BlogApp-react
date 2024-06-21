import { useEffect,useRef,useState } from "react";
import { Button, Card, CardBody,Container,Form, Input, Label } from "reactstrap";
import CustomNavbar from "./CustomNavbar";
import { getAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
// import { createPost } from "../services/post-service";
// import Cookies from "js-cookie";

const AddPost = () =>{

    const[post,setPost] = useState({
        title:'',
        content:'',
        image:null,
        categoryId:0
    })


    const editor = useRef(null);


    const [categories,setCategories] = useState([]);

    // const config = {
    //     placeholder:"Start typing..."
    // }

    useEffect(() =>{
        getAllCategories().then((data) =>{
            setCategories(data);
        }).catch(error =>{
            console.log(error);
        })
    },[]);

    const fieldChange = (event) =>{   
        setPost({...post,[event.target.name]:event.target.value})
    }

    const contentFieldChange = (data) =>{
        setPost({...post,'content':data});
    }

    const imageFieldChange = (event) =>{
        setPost({...post,'image':event.target.files[0]});
    }

    const submitPost = async(event) =>{

        event.preventDefault();

        if(post.title.trim ===''){
            toast.error("title is required");
            return;
        }

        if(post.content.trim ===''){
            toast.error("content is required");
            return;
        }

        if(post.categoryId.trim ===''){
            toast.error("category is required");
            return;
        }
        

        // post['userId'] = Cookies.get('id');

        // try{
        //     const response = await createPost(post);
        //     if(!response.hasError){
        //         toast.success("Post Created successfully");
        //         setPost({
        //             title:'',
        //             content:'',
        //             image:null,
        //             categoryId:0
        //         })
        //     }
        //     else{
        //         console.log("Error");
        //     }

        // }catch(error){
        //     console.log("Error :",error);
        // }

    }

    const resetButton = () =>{
        setPost({
            title:'',
            content:'',
            image:null,
            categoryId:0
        })
    }

    return(
        <>
        <CustomNavbar></CustomNavbar>

        <div className="wrapper">
            <Card className="shadow-sm">
                <CardBody>
                    {JSON.stringify(post)}
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
                            onChange={fieldChange}/>
                        </div>

                        <div className="my-3">
                            <Label for="content" >Post content </Label>

                            <JoditEditor 
                            ref={editor}                        
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
                            onChange={imageFieldChange}
                        />
                        </div>

                        <div className="my-3">
                            <Label for="category" >Select category </Label>
                            <Input 
                            type="select" 
                            id="category" 
                            placeholder="Enter here ..."
                            className="rounded-0"
                            defaultValue={0}
                            name="categoryId"
                            onChange={fieldChange}
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