import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export default function Header(props) {

  const navbarStyle = {
    backgroundColor: '#004c9b',
    marginBottom: '5rem', // Adding bottom margin
    paddingInline: '2rem' // Adding inline padding
  };

  return (
    <>
      <Navbar style={navbarStyle} variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: '#fff' }}>TMUCENTRAL</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        {props.childComp}
      </Container>

    </>
  );
};

