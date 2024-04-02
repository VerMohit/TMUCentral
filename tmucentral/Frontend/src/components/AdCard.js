import React from 'react';
import { Card } from 'react-bootstrap';

function AdCard({ price, title, description, image, postDate, location }) {
  price = `\$${price}.00`;

  const date = postDate.substring(0, 10);
  const time = postDate.substring(11, 20);
  postDate = date + " " + time;

  return (
    <Card className="text-center">
      <Card.Img
        variant="top"
        src={image}
        style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', marginTop: '10px', margin: '0 auto' }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Price: {price}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Post Date: {postDate}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
