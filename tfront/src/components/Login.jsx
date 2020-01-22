import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import Nav1 from './Nav1';
class Login extends Component{
    
    constructor(props){
        super(props);
        this.formData = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("type");
        localStorage.removeItem("isLoggedIn");
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }
    
    handleSubmit(event){
        event.preventDefault();
        axios({
            crossDomain: true,
            method:"POST",
            url:"https://campusworks.pythonanywhere.com/authenticate",
            data:{
                username:this.formData.email,
                password:this.formData.password
            },
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((response)=>{
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("id",response.data.id);
            localStorage.setItem("type",response.data.type);

            window.location.replace("https://ecell.iiit.ac.in/cworks/company/home");
        });
    }

    render(){
        return(
            <div>
            <Nav1></Nav1>
            <div className="container vh-100 d-flex text-center align-self-center justify-content-center">
                <div className="row">
                    <Form className="my-auto bg-dark text-white rounded p-5">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" id="email" placeholder="Enter email" onChange={this.handleChange} />
                           
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                    </Form>
                </div>
            </div>
            </div>
        );
    }
}
export default Login;
