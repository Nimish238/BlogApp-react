import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
// import Cookies from "js-cookie";
import { getUserById } from "../services/user-service";
import { useParams } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";

const UpdateProfile = () => {

  const {userId} = useParams();
  const [user,setUser] = useState({
    name:'',
    email:''
  });

  useEffect(() =>{

    getUserById(userId).then((data) =>{
      setUser({
        name:data.name,
        email:data.email,
      });

    }).catch(error =>{
      console.error(error);
    })

  },[userId])

  const handleChange = (event)=>{
    setUser({...user,[event.target.name]:event.target.value})
    console.log({...user,[event.target.name]:event.target.value})
  }

  const handleSubmit = () =>{
  

  }
  

  return (
    <>
    <CustomNavbar/>
      <Row className="mt-5">
        <Col md={{ size: 8, offset: 2 }}>
          <Card className="shadow">
            <CardBody>
              <h3 className="text-uppercase bold">User Information</h3>

              <Container className="text-center">
                <img 
                  src="/profile.png"
                  alt="user-profile"
                  className="img-fluid rounded-circle"
                />
              </Container>



              <Form onSubmit={handleSubmit}>
                
              
              <Table hover bordered className="mt-5 text-center" responsive>
                <tbody>
                  <tr>
                    <th> User Name </th>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name="name"
                          defaultValue={user.name}
                          onChange={handleChange}
                          required
                        />                        
                      </FormGroup> 
                     </td>
                  </tr>
                  <tr>  
                    <th>Email</th>
                    
                    <td>
                      <FormGroup>
                        <Input
                          type="email"
                          name="email"
                          defaultValue={user.email}
                          onChange={handleChange}
                          required
                        />                        
                      </FormGroup> 
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="text-center">
                <Button className="btn btn-warning" type="submit">
                  Update
                  </Button>
              </CardFooter>

            </Form>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
