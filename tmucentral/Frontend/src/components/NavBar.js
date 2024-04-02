import React, { useRef, useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button, Dropdown, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const NavBar = ({onFormSubmit}) => {
  const titleRef = useRef();
  const [priceDropdown, setPriceDropdown] = useState(false);
  const categoryRef = useRef();
  const fromPriceRef = useRef();
  const toPriceRef = useRef();
  const [category, setCategory] = useState('');
  const togglePriceDropdown = () => setPriceDropdown(!priceDropdown);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("")
  const navigate = useNavigate() // Use useNavigate here

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {title: titleRef.current.value};
      const msg = "Results found!";
      await onFormSubmit('/searchAd', data, msg);
    } catch {
      alert("No Results");
    }
  }

  const navbarStyle = {
    backgroundColor: '#004c9b',
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
  };

  async function handleLogout() {
    setError("")
  
    try {
      await logout()
      navigate("/login") // Use navigate method instead of history.push
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: '#fff'}}>TMUCENTRAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={handleSubmit} className="d-flex flex-grow-1 justify-content-center">
            <FormControl
              type="search"
              placeholder="What are you looking for?"
              ref={titleRef}
              className="me-2"
              aria-label="Search"
              style={{ maxWidth: '60%' }} 
            />

            <Button variant="success" className="ms-2" style={{ marginRight: '10px' }}>Search</Button>

            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic" title={category ? category.replace(/([A-Z])/g, ' $1').trim() : "Select a category"} ref={categoryRef}>
              {category ? category.replace(/([A-Z])/g, ' $1').trim() : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategorySelect('Academic Services')}>Academic Services</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items for Sale')}>Items for Sale</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items Wanted')}>Items Wanted</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Button variant="outline-light" className="ms-2" onClick={togglePriceDropdown} style={{ marginRight: '20px' }}>
              Price
            </Button>
          </Form>
          {priceDropdown && (
            <div className="position-relative bg-white p-3" style={{ zIndex: 1000 }}>
              <h6>Price</h6>
              <InputGroup>
                <FormControl placeholder="from" ref={fromPriceRef}/>
                <FormControl placeholder="to" ref={toPriceRef}/>
              </InputGroup>
              <Button variant="outline-secondary" className="w-100 mt-2" onClick={togglePriceDropdown}>
                Apply
              </Button>
            </div>
          )}
          <Nav className="ms-auto">
            <Nav.Link href="/register" style={{ color: '#fff', marginRight: '5px' }}>{currentUser.email}</Nav.Link>
            {/* <Nav.Link href="/login" style={{ color: '#fff', marginRight: '20px' }}>Log out</Nav.Link> */}
            <Button variant="danger" onClick={handleLogout}> Log Out</Button>
            <Link to="/postad" className="ms-2">
              <Button variant="warning" style={{ color: 'white' }}>Post ad</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
