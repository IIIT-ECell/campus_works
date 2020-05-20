import React, {Component} from 'react';
import NavStudent from './NavStudent';
import {Form, FormGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ApplyforJobs extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {formSubmitted: false, student: {}, pk: {}, date_of_application: date, student: {student_id: ""}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            mehtod: "GET",
            url: "https://campusworks.pythonanywhere.com/student",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({"student": response.data.data.fields});
                this.setState({"pk": response.data.data.pk});
                console.log(this.state);
            })
    }

    handleChange(event) {
        event.preventDefault();
        var key = event.target.id;
        var value = event.target.value;
        console.log(value);
        this.setState({key: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({formSubmitted: true});
        console.log(this.props.match.params.job_id);
        axios({
            method: 'POST',
            url: "https://campusworks.pythonanywhere.com/apply-for-job",
            data: {
                job_id: parseInt(this.props.match.params.job_id),
                date_of_application: this.state.date_of_application,
            },
            headers: {
                "Authorization": "Token " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                console.log(response);
                alert(response.data.message);
                this.setState({formSubmitted: true});
            })
    }

    render() {
        return (
            <div>
                <NavStudent></NavStudent>
                <div className="container p-5 rounded">
                    <Form className="bg-dark text-white p-5" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <Form.Group controlId="date_of_application" className="col-md-4">
                                <Form.Label>Date of Application</Form.Label>
                                <Form.Control type="text" id="date_of_application" name="date_of_application" value={this.state.date_of_application} disabled></Form.Control>
                            </Form.Group>
                            <FormGroup controlId="student_id" className="col-md-4">
                                <Form.Label>Student Id</Form.Label>
                                <Form.Control type="text" id="student_id" name="student_id" value={this.state.student.student_id} disabled></Form.Control>
                            </FormGroup>
                            <FormGroup controlId="phone_number" className="col-md-4">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" id="phone_number" name="phone_number" value={this.state.student.phone_number} disabled></Form.Control>
                            </FormGroup>
                        </div>
                        <div className="row">
                            {this.state.formSubmitted === false && <p className="col-md-6 p-1"><Button variant="btn btn-success" className="w-100" onClick={this.handleSubmit}>Submit</Button></p>}
                            <Link to={"/student/home"} className="col-md-6 p-1"><Button variant="btn btn-primary" className="w-100"><FontAwesomeIcon icon="long-arrow-alt-left" /> Back</Button></Link>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default ApplyforJobs;
