import React, {Component} from "react";
import {Form, Row} from "react-bootstrap";
import NavStudent from './NavStudent';
import axios from "axios";
import NavCompany from "./NavCompany";
import {textSpanIsEmpty} from "typescript";


class StudentProfile extends Component {
    // refer to https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    constructor(props) {
        super(props);
        this.state = {isEditable: false, formSubmitted: false, isEditing: false, resumeUploaded: false, student: {}, user: {}}
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.studentId = parseInt(this.props.match.params.student_id);
    }

    componentDidMount() {
        axios.get("https://campusworks.pythonanywhere.com/profile/student", {
            params: {
                "student_id": String(parseInt(this.studentId,10)*parseInt(this.studentId,10)+340629),
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        }).then((res) => {
            if (res.data.success === true) {
                this.setState({student: res.data.student.fields});
                this.setState({user: res.data.user.fields});
            }
        });

        axios.get("https://campusworks.pythonanywhere.com/student", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        }).then(res => {
            this.setState({isEditable: res.data.data.pk === this.studentId});
        })
    }

    handleFile(event) {
        event.preventDefault();
        this.setState({resumeUploaded: true});
        this.setState({resume: event.target.files[0]});
    }

    handleChange(event) {
        event.preventDefault();
        const newState = Object.assign({}, this.state);
        newState[event.target.dataset.fieldof][event.target.id] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({formSubmitted: true, isEditing: false});

        let formData = {...this.state, student_id: this.studentId};
        delete formData["formSubmitted"];
        delete formData["isEditing"];

        console.log(formData)
        var form_data = new FormData();

        var keys = Object.keys(formData['student']);
        for (var i in keys) {
            form_data.append(keys[i], formData['student'][keys[i]]);
        }
        form_data.set("student_id", this.studentId);

        keys = Object.keys(formData['user']);
        for (var i in keys) {
            form_data.append(keys[i], formData['user'][keys[i]]);
        }

        if (this.state.resumeUploaded) {
            form_data.append('resume', this.state.resume);
        } else {
            form_data.delete('resume');
        }
        axios.put("https://campusworks.pythonanywhere.com/profile/student",
            form_data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Token " + localStorage.getItem("token"),
                }
            }
        ).then((res) => {
            if(res.data.success)
            {
                alert(res.data.message);
                this.setState({formSubmitted: false});
            }
            else
            {
                alert("Invalid details provided")
                this.setState({formSubmitted: false});
            }
        }).catch(err => {
            alert("An error occured: " + err);
            this.setState({formSubmitted: false});
        });
    }

    render() {
        if (this.state.student) {
            return (
                <div>
                    {localStorage.getItem('type') === "1" && <NavStudent></NavStudent>}
                    {localStorage.getItem('type') === "2" && <NavCompany></NavCompany>}
                    <div className="container-flex justify-content-center align-items-center">
                        <div className="my-auto">
                            <Form onSubmit={this.handleSubmit} className="container p-5" encType="multipart/form-data">
                                <div className="row">
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" id="first_name" disabled={!this.state.isEditing} onChange={this.handleChange} placeholder="Name" value={this.state.user.first_name} data-fieldof="user" />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" id="email" disabled placeholder="Email" value={this.state.user.email} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="number" id="phone_number" disabled={!this.state.isEditing} onChange={this.handleChange} placeholder="Phone Number" value={this.state.student.phone_number} data-fieldof="student" />
                                    </Form.Group>
                                </div>
                                <Row>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Roll Number</Form.Label>
                                        <Form.Control type="number" id="student_id" disabled placeholder="Roll Number" value={this.state.student.student_id} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control as="select" id="year_of_study" disabled={!this.state.isEditing} onChange={this.handleChange} value={this.state.student.year_of_study} data-fieldof="student">
                                            <option value="1">First Year Undergrad</option>
                                            <option value="2">Second Year Undergrad</option>
                                            <option value="3">Third Year Undergrad</option>
                                            <option value="4">Fourth Year Undergrad</option>
                                            <option value="5">Postgrads (5th year DD, PG+)</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" id="gender" disabled={!this.state.isEditing} onChange={this.handleChange} value={this.state.student.gender} data-fieldof="student">
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                            <option value="N">Prefer not to say</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                                <a href={"https://campusworks.pythonanywhere.com/resume?id=" + String(parseInt(this.props.match.params.student_id,10)* parseInt(this.props.match.params.student_id,10) + 148017)} target="_blank">Resume Link</a>
                                {this.state.isEditing && (
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Upload new resume</Form.Label>
                                        <Form.Control type="file" accept=".pdf" required id="resume" onChange={this.handleFile} />
                                    </Form.Group>
                                )}
                                {this.state.isEditable && !this.state.isEditing && <button className="btn btn-dark w-100" onClick={() => this.setState({isEditing: true})}>Edit</button>}

                                {!this.state.formSubmitted && this.state.isEditing && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
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
