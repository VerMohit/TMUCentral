import React, { useRef, useState } from 'react';
import { Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown, Col, Row, Alert } from 'react-bootstrap';

import { useAuth } from "../contexts/AuthContext"


const PostAd = ({ onFormSubmit }) => {
  const { currentUser, logout } = useAuth()
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const locationRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const [category, setCategory] = useState('');
  const [error, setError] = useState("");
  const email = currentUser.email;

  const handleCategorySelect = (cat) => {
    // This function updates the category state and prevents form submission
    setCategory(cat);
  };

  // Manage form submission
  async function handleAdSubmit(e) {
    e.preventDefault();
    try {
      const newAd = {
        //user: ObjectId, 
        postDate: Date.now(),
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        location: locationRef.current.value,
        sold: false,
        image: imageRef.current.value,
        category: category, // Use the state for category
        email: email,
      };
      // Send the post to the server API
      const msg = "Advertisement submitted successfully!";
      await onFormSubmit('/postAds', newAd, msg);
    } catch {
      setError("Failed to post advertisement");
    }
  }

  return (
    <Card className="my-4 mx-auto" style={{ maxWidth: '800px' }}>
      <Card.Body>
        <h2 className="text-center mb-4">Post New Advertisement</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleAdSubmit}>
          {/* Other form groups remain unchanged */}

               <Form.Group as={Row} controlId="formGridTitle" className="mb-3">
            <Form.Label column sm="2" className="fw-bold">Title</Form.Label>
            <Col sm="10">
               <Form.Control 
                type="text" 
                ref={titleRef}
                placeholder="Enter title"
                required
              />
            </Col>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} sm="6" controlId="formGridPrice">
              <Form.Label className="fw-bold">Price</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <FormControl 
                  aria-label="Amount (to the nearest dollar)" 
                  ref={priceRef} 
                  required
                />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} sm="6" controlId="formGridLocation">
              <Form.Label className="fw-bold">Location</Form.Label>
              <Form.Control 
                type="text"
                ref={locationRef}
                placeholder="City, Province/Territory" 
                required
              />
            </Form.Group>
          </Row>

          <Form.Group controlId="formGridDescription" className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              ref={descriptionRef}
            />
          </Form.Group>

          <Form.Group controlId="formGridImages" className="mb-3">
            <Form.Label className="fw-bold">Upload Images</Form.Label>
            <Form.Control 
              type="file" 
              ref={imageRef} 
            />
          </Form.Group>


        




         
          <Row className="mb-3">
            <Col sm="6">
              <DropdownButton 
                id="dropdown-item-button" 
                title={category ? category.replace(/([A-Z])/g, ' $1').trim() : "Select a category"} // Show selected category or default text
                variant="light"
                className="text-secondary w-100"
                ref={categoryRef}>
                <Dropdown.Item onClick={() => handleCategorySelect('Academic Services')}>Academic Services</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items for Sale')}>Items for Sale</Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Items Wanted')}>Items Wanted</Dropdown.Item>
              </DropdownButton>
            </Col>
            {/* Submit button remains unchanged */}
            <Col sm="6">
              <Button variant="primary" type="submit" className="w-100">
                 Submit Ad
             </Button>
            </Col>

          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PostAd;
