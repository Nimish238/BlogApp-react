import { useEffect, useState } from "react";
import CustomNavbar from "./CustomNavbar";
import { getUserById } from "../services/user-service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Input,
  FormGroup,
} from "reactstrap";
import Cookies from "js-cookie";
import { deleteUserById, updateUser } from "../services/user-service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserDetails } from "../redux/slices/UserSlice";

const ProfileInfo = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });

  const id = Cookies.get("id");
  const role = Cookies.get("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const toggleOpen = () => {
    setModal(true);
  };

  const toggleClose = () => {
    setModal(false);
  };

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getUserById(userId)
      .then((data) => {
        setUser({
          name: data.name,
          email: data.email,
        });
        setUserDetails({
          name: data.name,
          email: data.email,
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [userId]);

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const confirm = window.confirm("Are you sure you want to update?");

    if (confirm) {
      updateUser(userDetails)
        .then((data) => {
          toast.success("Profile updated successfully");

          setTimeout(() => {
            logOut();
          }, 3000);

        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      toast.error("User not updated");
    }
  };

  const logOut = () => {
    dispatch(removeUserDetails(id));
    Cookies.remove("isLoggedIn");
    Cookies.remove("id");
    Cookies.remove("name");
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };

  const deleteUser = () => {
    const confirm = window.confirm(
      "are you sure you want to delete this post?"
    );
    if (confirm) {
      deleteUserById(id)
        .then((data) => {
          console.log(data);
          toast.success(data.message);

          setTimeout(() => {
            logOut();
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      toast.error("Failed to delete the post");
    }
  };

  return (
    <>
      <CustomNavbar></CustomNavbar>

      {user && (
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
                    <tr>
                      <th>Role</th>
                      <th>{role}</th>
                    </tr>
                  </tbody>
                </Table>
                {id === userId && (
                  <CardFooter className="text-center">
                    <Button className="btn btn-warning" onClick={toggleOpen}>
                      Update user
                    </Button>
                    <Button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser()}
                    >
                      Delete user
                    </Button>
                  </CardFooter>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <Modal isOpen={modal} toggle={toggleClose} className="shadow">
        <Form onSubmit={handleUpdateUser}>
          <ModalHeader toggle={toggleClose}>Update User!</ModalHeader>
          <ModalBody>
            

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

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={userDetails.name}
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
                        defaultValue={userDetails.email}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>

          </ModalBody>
          
          <ModalFooter >
            <Button className="btn btn-warning" type="submit">
              Update
            </Button>
          </ModalFooter>
          </Form>

      </Modal>
    </>
  );
};
export default ProfileInfo;
