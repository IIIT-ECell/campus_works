import React, {Component} from 'react';
import NavStudent from './NavStudent'
import NavCompany from './NavCompany'
import {Form} from 'react-bootstrap';
import axios from 'axios';

class PasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {formSubmitted: false};
        this.formData = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.formData['password'] !== this.formData['confirm-password'] || this.formData['password'] === "") {
            alert('Passwords donot confirm');
            return;
        }
        this.setState({formSubmitted: true});
        axios({
            method: "PUT",
            url: "https://campusworks.pythonanywhere.com/user",
            data: {
                password: this.formData['password']
            },
            headers: {
                "Authorization": "Token " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                alert(res.data.message);
                if (res.data.success === true) {
                    window.location.replace("https://ecell.iiit.ac.in/cworks/login");
                }
            })
    }

    render() {
        return (
            <div>
                {localStorage.getItem('type') === "1" && <NavStudent></NavStudent>}
                {localStorage.getItem('type') === "2" && <NavCompany></NavCompany>}
                <Form onSubmit={this.handleSubmit} className="container p-5">
                    <div className="row">
                        <Form.Group controlId="formPassword" className="col-md-4 offset-md-2">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" id="password" required onChange={this.handleChange} placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="col-md-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" id="confirm-password" required onChange={this.handleChange} placeholder="Enter Password" />
                        </Form.Group>
                    </div>
                    {this.state.formSubmitted === false && <button type="submit" className="btn btn-dark col-md-4 offset-md-4" onClick={this.handleSubmit}>Submit</button>}
                </Form>
            </div>
        )
    }
}
export default PasswordChange;
