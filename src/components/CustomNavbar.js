import React, {  useState } from 'react';
import {  NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { removeUserDetails } from '../redux/slices/UserSlice';
import Cookies from 'js-cookie';

function CustomNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = Cookies.get('isLoggedIn') === 'true';

  const id = Cookies.get('id');

  const name = Cookies.get('name');

  const role = Cookies.get('role')==='ROLE_ADMIN';

  const logOut = () =>{

    dispatch(removeUserDetails(id));
    Cookies.remove('isLoggedIn');
    Cookies.remove('id');
    Cookies.remove('name');
    Cookies.remove('token');
    Cookies.remove("role");
    navigate("/login");
  }


  return (
    <div>
      <Navbar 
        color='dark'
        dark
        expand='md'
        fixed=''
        className='px-5'>

        <NavbarBrand tag={ReactLink} to="/">MyBlog</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>

          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem>
            {isLoggedIn &&
            <NavItem>
              <NavLink tag={ReactLink} to="/addPost">Add Post</NavLink>
            </NavItem>
            }

            
            
          </Nav>

          <Nav navbar>

            {isLoggedIn && 
              <>
                <NavItem style={{cursor: "pointer"}}>
                    <NavLink onClick={logOut}>
                      Logout
                    </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {name}
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem tag={ReactLink} to={'/profileInfo/'+id}>Profile-info</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={ReactLink} to={"/userPosts/"+ id} >My Posts</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={ReactLink} to="/updatePassword" >Update Password</DropdownItem>

                    
                    {role &&
                    <>
                      <DropdownItem divider />
                      <DropdownItem tag={ReactLink} to="/allUsers">All users</DropdownItem>
                    </>
                    }
                    
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            }
          {!isLoggedIn &&
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
          </NavItem>
          }
          
          </Nav>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;