import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./AdPage.css";
import { useNavigate } from "react-router-dom";

const AdPage = () => {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const PORT = process.env.PORT || 3005;
    const url = `http://localhost:${PORT}/api/database/getAdById/${adId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAd(data))
      .catch((err) => console.error("Failed to fetch ad:", err));
  }, [adId]);

  if (!ad) {
    return <div>Loading...</div>;
  }

  const handleContactSeller = () => {
    navigate("/chat", { state: { sellerEmail: ad.email } });
  };

  return (
    <Container className="ad-page-container my-5">
      <Row className="justify-content-md-center">
        <Col lg={6}>
          <Card>
            <Card.Img
              variant="top"
              src={ad.image}
              alt={ad.title}
            />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>
                <span className="text-muted">{ad.location}</span>
              </Card.Text>
              <Card.Text className="ad-description">{ad.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <ListGroup
            variant="flush"
            className="ad-details-list"
          >
            <ListGroup.Item>
              <h4>Price: ${ad.price}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Category: {ad.category.join(", ") || "Not specified"}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Posted on: {new Date(ad.postDate).toLocaleDateString()}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="primary"
                onClick={handleContactSeller}
              >
                Contact Seller
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default AdPage;
