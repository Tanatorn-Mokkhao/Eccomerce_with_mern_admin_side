import { Navbar,Nav} from 'react-bootstrap';
import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import './header.css';
import { userLoggout } from '../../action/auth_Action';
function Header() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(false);

  const userLogout = () => { 
   
    dispatch(userLoggout());
    setLogout(true);

  }



  const renderLogged = () =>
  {
    return (
      <Nav className="signout">
        <span onClick={userLogout}>Signout</span>
      </Nav>
    )
   
  }
  
  const renderNonLogged = () =>
  {
  return    ( <Nav >
    <NavLink to="/signin" className="signin">Signin</NavLink>
    <NavLink to="/Signup" className="signin">Signup</NavLink>
    {logout ? <Redirect to="/signin" />: null}
    </Nav>)
  }



  
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
          <NavLink to="/" className="header-admin">Admin Dashboard</NavLink>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
   
    </Nav>
            {auth.authenticate ? renderLogged():renderNonLogged()}
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default Header;
