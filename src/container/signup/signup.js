import React, { useState} from 'react'
import Layout from '../../component/layout/layout';
import { Form, Button, Container } from 'react-bootstrap';
function Signup() {
        
    return (
        <div>
            <Layout />
            <Container >
                <Form >
                <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
    <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
              <Form.Control type="tect" placeholder="Last Namel" />
  </Form.Group>
                    
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
  </Form.Group>
            <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
          </Container>

        </div>
    )
}

export default Signup
