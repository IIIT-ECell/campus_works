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
        var form_data = new FormData();
        var keys = Object.keys(this.formData);
        console.log(keys);
        for (var i in keys){
            form_data.append(keys[i],this.formData(keys[i]));
        }
        // form_data.append()
        axios({
            method:"POST",
            url:"http://localhost:8000/student",
            form_data,
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
                        <Form.Control type="text" id="name" onChange={this.handleChange} placeholder="Enter Name"/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" id="name" onChange={this.handleChange} placeholder="Enter Email"/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" onChange={this.handleChange} placeholder="Enter Password"/>
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" id="phone_number" onChange={this.handleChange} placeholder="Enter Phone Number"/>
                    </Form.Group>
                    <Form.Group controlId="formRollNumber">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control type="number" id="student_id" onChange={this.handleChange} placeholder="Enter Roll Number"/>
                    </Form.Group>
                    <Form.Group controlId="formResume">
                        <Form.Label>Resume</Form.Label>
                        <Form.Control type="file" accept=".pdf" onChange={this.handleFile}/>
                    </Form.Group>
                    <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}

export default StudentRegister;