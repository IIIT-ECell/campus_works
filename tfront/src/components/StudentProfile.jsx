import React,{ Component } from "react";
import { Form, Row } from "react-bootstrap";
import NavStudent from './NavStudent';
import axios from "axios";
import NavCompany from "./NavCompany";


class StudentProfile extends Component{
    // refer to https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    constructor(props){
        super(props);
        this.state = {formSubmitted:false,student:{},user:{}}
        this.formData = {'gender':'M','year_of_study':'1'};
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.state);
        axios.get("https://campusworks.pythonanywhere.com/profile/student",{
            params: {
                "token":localStorage.getItem("token"),
                "student_id":this.props.match.params.student_id,
            },
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(this.state);
            if(res.data.success==true){
                this.setState({student:res.data.student.fields});
                this.setState({user:res.data.user.fields});
                console.log(this.state);
            }
        });
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
        this.setState({formSubmitted:true});
        var form_data = new FormData();
        var keys = Object.keys(this.formData);
        console.log(keys);
        for (var i in keys){
            form_data.append(keys[i],this.formData[keys[i]]);
        }
        // form_data.append()
        axios.put("https://campusworks.pythonanywhere.com/student",
            form_data,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }  
            }
        ).then((res)=>{
            alert(res.data);
            this.setState({formSubmitted:false});
        })
    }

    render(){
        if(this.state.student){
            return(
                <div>
                {localStorage.getItem('type')==1 && <NavStudent></NavStudent>}
                {localStorage.getItem('type')==2 && <NavCompany></NavCompany>}
                <div className="container-flex justify-content-center align-items-center">
                    <div className="my-auto">
                    <Form onSubmit={this.handleSubmit} className="container p-5">
                        <div className="row">
                            <Form.Group controlId="formName" className="col-md-4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" id="name" disabled onChange={this.handleChange} placeholder="Name" value={this.state.user.first_name}/>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="col-md-4">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" id="email" disabled onChange={this.handleChange} placeholder="Email" value={this.state.user.email}/>
                            </Form.Group>
                            <Form.Group controlId="formPhoneNumber" className="col-md-4">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="number" id="phone_number" disabled onChange={this.handleChange} placeholder="Phone Number" value={this.state.student.phone_number}/>
                            </Form.Group>
                        </div>
                        <Row>
                            <Form.Group controlId="formRollNumber" className="col-md-4">
                                <Form.Label>Roll Number</Form.Label>
                                <Form.Control type="number" id="student_id" disabled onChange={this.handleChange} placeholder="Roll Number" value={this.state.student.student_id}/>
                            </Form.Group>
                            <Form.Group controlId="formStudy" className="col-md-4">
                                <Form.Label>Year of Study</Form.Label>
                                <Form.Control as="select" id="year_of_study" disabled onChange={this.handleChange} placeholder="Gender" value={this.state.student.year_of_study}>
                                <option value="1">First Year Undergrad</option>
                                <option value="2">Second Year Undergrad</option>
                                <option value="3">Third Year Undergrad</option>
                                <option value="4">Fourth Year Undergrad</option>
                                <option value="5">Postgrads (5th year DD, PG+)</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGender" className="col-md-4">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" id="gender" disabled onChange={this.handleChange} value={this.state.student.gender}>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                    <option value="N">Prefer not to say</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="formResume" className="col-md-4">
                            <a href={"https://campusworks.pythonanywhere.com/resume?id="+this.props.match.params.student_id} target="_blank">Resume Link</a>
                        </Form.Group>
                        {this.state.formSubmitted===false && <p className="col-md-4 offset-md-4"><button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button></p>}
                     </Form>
                    </div>
                </div>
                </div>
            )
        }
        else {
            return <p>Student Doesn't Exist.</p>
        }
    }
}

export default StudentProfile;