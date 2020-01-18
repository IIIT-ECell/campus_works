import React,{ Component } from "react";
import { Form } from "react-bootstrap";
import Nav1 from "./Nav1";
import axios from "axios";


class StudentRegister extends Component{
    // refer to https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    constructor(props){
        super(props);
        this.formData = {};
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleFile(event){
        event.preventDefault();
        this.formData["resume"] = event.target.files[0];
    }
    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }
    handleSubmit(event){
        event.preventDefault();
        axios({
            method:"POST",
            url:"http://localhost:8000/student",
            data:this.formData,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    }

    render(){
        return(
            <div className="">
            <Nav1></Nav1>
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="my-auto">
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" placeholder="Enter Name"/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" id="name" placeholder="Enter Email"/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" placeholder="Enter Password"/>
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" id="phone_number" placeholder="Enter Phone Number"/>
                    </Form.Group>
                    <Form.Group controlId="formRollNumber">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control type="number" id="student_id" placeholder="Enter Roll Number"/>
                    </Form.Group>
                    <Form.Group controlId="formResume">
                        <Form.Label>Resume</Form.Label>
                        <Form.Control type="file" accept=".pdf" onChange={this.handleFile}/>
                    </Form.Group>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}

export default StudentRegister;