import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            formData:{}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }
    
    handleSubmit(event){
        event.preventDefault();
        axios({
            method:"POST",
            url:"http://localhost:8000/authenticate",
            data:{

            },
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            }
        }).then((response)=>{
            console.log(response.data.key);
            localStorage['key']=response.data.key;
            localStorage["isLoggedIn"] = true;
            localStorage["id"] = response.data.user_id;
            localStorage["type"]=response.data.user_type;
        });
    }

    render(){
        return(
            <div className="container vh-100 d-flex">
                <div className="row">
                    <Form className="my-auto">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}
export default Login;