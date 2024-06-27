import React from "react";
import { Form, FormGroup, Button, Container, Input, Label } from "reactstrap";
import CustomNavbar from "./CustomNavbar";
import Cookies from "js-cookie";

const UpdatePassword = () => {

    const userId = Cookies.get('id');

  return (
    <>
      <CustomNavbar></CustomNavbar>
      <Container className="mt-5 text-center border shadow p-5">
        <Form>
            <h2>UPDATE PASSWORD</h2>
            <br/>

          <FormGroup>
            <Label for="exampleEmail" hidden>
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="examplePassword" hidden>
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
          </FormGroup>{" "}
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </>
  );
};
export default UpdatePassword;
