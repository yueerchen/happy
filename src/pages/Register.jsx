import React, {useState} from "react";
import jwt from "jsonwebtoken";
import {useHistory} from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';

const token = localStorage.getItem("token");
const API_URL = "http://131.181.190.87:3000";

export default function RegisterForm(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function register(username, password) {
    const url = `${API_URL}/user/register`;
    let token = localStorage.getItem("token");
    // const headers = {
    //   accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authoriazation: `Bearer ${token}`
    // }

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: username, password: password })
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token)
        console.log(JSON.stringify(res))
      
      });
      
  }

  return(
    
    <div className="loginForm">
      <h1>This is the Register page.</h1>
      <Form > 
        <FormGroup row>
          <Label for="email" sm={1}>Username</Label>
          <Col sm={10}>
            <Input type="email" name="email" id="email" placeholder="Email address" 
            onChange={(e) => {setUsername(e.target.value)}} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={1}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="password" placeholder="password"
            onChange={(e) => {setPassword(e.target.value)}} />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{size: 10, offset: 1}}>
            <Button 
            color="primary"
            type="submit"
            onClick={(e) => {e.preventDefault();
            register(username, password);
            history.push("/login")}}>Register</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
}