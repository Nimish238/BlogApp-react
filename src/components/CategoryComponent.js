import React from "react";
import { useState,useEffect } from "react";
import { ListGroup,ListGroupItem } from "reactstrap";
import { getAllCategories } from '../services/category-service';
import { Link } from "react-router-dom";


const CategoryComponent= () => {

    const [categories,setCategories] = useState([]);

    useEffect(() =>{

        getAllCategories().then((data) =>{
          console.log(data);
          setCategories([...data]);
        }).catch(error =>{
          console.log(error);
        })
    
    },[]);

  return (
    <div>
        <ListGroup numbered>

        <ListGroupItem tag={Link} to="/" action={true}>
            All Blogs
        </ListGroupItem>

        { categories && 

        categories.map ((category) =>(
            <ListGroupItem key={category.categoryId} action={true} tag={Link} to={"/categories/"+category.categoryId}  >
            {category.categoryTitle}
            </ListGroupItem> 
        ))

        }

        </ListGroup>
    </div>
  )
}

export default CategoryComponent