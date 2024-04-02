import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import AdCard from './AdCard';
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState(''); 
  const [ads, setAds] = useState([]);

  useEffect(() => {
      const PORT = process.env.PORT || 3005;
      const url = `http://localhost:${PORT}/api/database/getAds`;
      fetch(url)
          .then((resp) => {
              if (!resp.ok) {
                  throw new Error("Network response was not okay");
              }
              return resp.json();
          })
          .then(ads => setAds(ads.Ads))
          .catch(err => console.error(err));
  }, []); 

  useEffect(() => {
    const PORT = process.env.PORT || 3005;
    const url = `http://localhost:${PORT}/api/database/getUsers`;

    if (activeMenu === 'manage-users') { 
      fetch(url)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Network response was not okay");
          }
          return resp.json();
        })
        .then(data => setUsers(data.Review))
        .catch(err => console.error(err));
    }
  }, [activeMenu]);

  const handleMenuSelect = (menuKey) => {
    setActiveMenu(menuKey);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="mb-3">
          <h3>Admin Menu</h3>
          <ListGroup>
            <ListGroup.Item action href="#manage-ads" onClick={() => handleMenuSelect('manage-ads')}>Manage Ads</ListGroup.Item>
            <ListGroup.Item action href="#manage-users" onClick={() => handleMenuSelect('manage-users')}>Manage Users</ListGroup.Item>
            <ListGroup.Item action href="#site-content" onClick={() => handleMenuSelect('site-content')}>Site Content</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {activeMenu === 'manage-ads' && (
            <Card>
              <Card.Body>
                <Card.Title>Manage Ads</Card.Title>
                <ListGroup>
                  {ads.map((ad,index) => (
                    <AdCard
                    price={ad.price}
                    title={ad.title}
                    description={ad.description}
                    image={ad.image}
                    postDate={ad.postDate}
                    location={ad.location}
                />
                  ))}
                </ListGroup>

              </Card.Body>
            </Card>
          )}

{activeMenu === 'manage-users' && (
            <Card>
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <ListGroup>
                  {users.map((user, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Name:</strong> {user.name} <br />
                      <strong>Email:</strong> {user.email}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
