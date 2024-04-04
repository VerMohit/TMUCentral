import React, { useRef, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const NavPostAd = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const navbarStyle = {
    backgroundColor: '#004c9b',
    paddingInline: '2rem' // Adding inline padding
  };

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: '#fff' }}>TMUCENTRAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">


          <Nav className="ms-auto">
            <Nav.Link href="/myads" style={{ color: '#fff', marginRight: '5px' }}>{currentUser.email.split('@torontomu.ca')[0]}</Nav.Link>
            <Button variant="danger" onClick={handleLogout}> Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavPostAd;