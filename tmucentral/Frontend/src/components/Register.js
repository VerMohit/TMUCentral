import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom" 
export default function Register({onFormSubmit}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef();
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {

      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      const user = {
        name: nameRef.current.value,
        email: emailRef.current.value
      };
      const msg = "Advertisement submitted successfully!";
      await onFormSubmit('/postUser', user, msg);
      console.log("test");
      navigate("/") 
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card style={{ width: '50%', margin: '0 auto', marginTop: '20px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="name" className="mb-3"> 
             <Form.Label style={{ fontWeight: 'bold' }}>Full Name</Form.Label>
             <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}