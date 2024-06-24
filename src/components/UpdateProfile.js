import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import Cookies from "js-cookie";
import { getUserById } from "../services/user-service";

const UpdateProfile = () => {

  const id = Cookies.get('id');
  const [user,setUser] = useState(null);

  useEffect(() =>{

    getUserById(id).then((data) =>{
      setUser(data);
    }).catch(error =>{
      console.error(error);
    })

  },[id])
  

  return (
    <>
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

              <Table hover bordered className="mt-5 text-center" responsive>
                <tbody>
                  <tr>
                    <th> User Name </th>
                    <th>{user.name}</th>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <th>{user.email}</th>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="text-center">
                <Button className="btn btn-warning">
                  Update
                  </Button>
              </CardFooter>
              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
