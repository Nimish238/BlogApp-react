import { useEffect,useRef,useState } from "react";
import { Button, Card, CardBody,Container,Form, Input, Label } from "reactstrap";
import CustomNavbar from "./CustomNavbar";
import { getAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";

const AddPost = () =>{

    const editor = useRef(null);

    const [content,setContent] = useState('');

    const [categories,setCategories] = useState([]);

    const config = {
        placeholder:"Start typing..."
    }

    useEffect(() =>{
        getAllCategories().then((data) =>{
            console.log(data);
            setCategories(data);
        }).catch(error =>{
            console.log(error);
        })
    },[]);

    return(
        <>
        <CustomNavbar></CustomNavbar>
        <div className="wrapper">
            <Card className="shadow-sm">
                <CardBody>
                    <h3>What's goin on in your mind ?</h3>
                    <Form>
                        
                        <div className="my-3">
                            <Label for="title" >Post title </Label>
                            <Input 
                            type="text" 
                            id="title" 
                            placeholder="Enter here ..."
                            className="rounded-0" />
                        </div>
                        <div className="my-3">
                            <Label for="content" >Post content </Label>
                            {/* <Input 
                            type="textarea" 
                            id="content" 
                            placeholder="Enter here ..."
                            className="rounded-0" /> */}

                            <JoditEditor 
                            ref={editor}
                            value={content}
                            config={config}
                            onChange={newContent => setContent(newContent)}
                            />


                        </div>


                        <div className="my-3">
                            <Label for="category" >Select category </Label>
                            <Input 
                            type="select" 
                            id="category" 
                            placeholder="Enter here ..."
                            className="rounded-0">
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
                            <Button color="primary">Create post</Button>
                            <Button color="danger" className="ms-2">Reset post</Button>
                        </Container>
                    </Form>

{content}
                </CardBody>
            </Card>
        </div>
        </>
    )
}

export default AddPost;