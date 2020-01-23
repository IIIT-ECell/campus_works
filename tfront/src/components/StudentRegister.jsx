import React,{ Component } from "react";
import { Form } from "react-bootstrap";
import Nav1 from "./Nav1";
import axios from "axios";


class StudentRegister extends Component{
    // refer to https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    constructor(props){
        super(props);
        this.formData = {'gender':'M','year_of_study':'1'};
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
            form_data.append(keys[i],this.formData[keys[i]]);
        }
        // form_data.append()
        axios.post("https://campusworks.pythonanywhere.com/student",
            form_data,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }  
            }
        ).then((res)=>{
            alert(res.data);
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
                        <Form.Control type="email" id="email" onChange={this.handleChange} placeholder="Enter Email"/>
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
                    <Form.Group controlId="formStudy">
                        <Form.Label>Year of Study</Form.Label>
                        <Form.Control as="select" id="year_of_study" onChange={this.handleChange} placeholder="Enter Gender">
                        <option value="1">First Year Undergrad</option>
                        <option value="2">Second Year Undergrad</option>
                        <option value="3">Third Year Undergrad</option>
                        <option value="4">Fourth Year Undergrad</option>
                        <option value="5">Postgrads (5th year DD, PG+)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" id="gender" onChange={this.handleChange} >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                            <option value="N">Prefer not to say</option>
                        </Form.Control>
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