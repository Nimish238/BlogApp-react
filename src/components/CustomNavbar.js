import React, { useContext, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
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
import AuthContext from '../Context/Auth';
import { useDispatch } from 'react-redux';
import { clearState} from '../redux/slices/UserSlice';
import secureLocalStorage from 'react-secure-storage';

function CustomNavbar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const {status,setStatus} = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () =>{

    dispatch(clearState());
    secureLocalStorage.removeItem('reduxState');
    setStatus(false);
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
            
            
          </Nav>

          <Nav navbar>

            { status && 
              <>
                <NavItem style={{cursor: "pointer"}}>
                    <NavLink onClick={logOut}>
                      Logout
                    </NavLink>
                </NavItem>
              </>
            }
          {!status &&
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
          </NavItem>
          }
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                User-name
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Profile-info</DropdownItem>
                <DropdownItem>Reset password</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;