import React from "react";
import NavCompany from './NavCompany';
import NavStudent from './NavStudent';
import {Form} from "react-bootstrap";
import './App.css';
import axios from "axios";

class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isEditable: false, formSubmitted: false, isEditing: false, company: {}, user: {}}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.companyId = parseInt(this.props.match.params.company_id);
    }

    componentDidMount() {
        axios.get("https://campusworks.pythonanywhere.com/profile/company", {
            params: {
                "company_id": this.companyId,
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        }).then((res) => {
            if (res.data.success === true) {
                this.setState({company: res.data.company.fields});
                this.setState({user: res.data.user.fields});
            }
        });

        axios.get("https://campusworks.pythonanywhere.com/company", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        }).then(res => {
            this.setState({isEditable: res.data.data.pk === this.companyId});
        })
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

        let formData = {...this.state, company_id: this.companyId};
        delete formData["formSubmitted"];
        delete formData["isEditing"];

        axios.put("https://campusworks.pythonanywhere.com/profile/company",
            formData,
            {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": "Token " + localStorage.getItem("token"),
                }
            }
        ).then((res) => {
            alert(res.data);
            this.setState({formSubmitted: false});
            window.location.reload(false);
        }).catch(err => {
            alert("An error occured: " + err);
            this.setState({formSubmitted: false});
        });
    }


    render() {
        if (this.state.company) {
            return (
                <div>
                    {localStorage.getItem('type') === "1" && <NavStudent></NavStudent>}
                    {localStorage.getItem('type') === "2" && <NavCompany></NavCompany>}
                    <div className="container my-5">
                        <Form onSubmit={this.handleSubmit} className="container p-5">
                            <div className="row">
                                <Form.Group className="col-md-4">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="name" id="first_name" onChange={this.handleChange} disabled={!this.state.isEditing} value={this.state.user.first_name} data-fieldof="user" />
                                </Form.Group>
                                <Form.Group className="col-md-4">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" id="email" onChange={this.handleChange} disabled value={this.state.user.email} data-fieldof="user" />
                                </Form.Group>
                                <Form.Group className="col-md-4">
                                    <Form.Label>Contact Name</Form.Label>
                                    <Form.Control name="contact_name" id="poc" onChange={this.handleChange} disabled={!this.state.isEditing} value={this.state.company.poc} data-fieldof="company" />
                                </Form.Group>
                                <Form.Group className="col-md-8 offset-md-2">
                                    <Form.Label>About</Form.Label>
                                    <Form.Control type="textarea" id="about" name="about" onChange={this.handleChange} disabled={!this.state.isEditing} value={this.state.company.about} data-fieldof="company" />
                                </Form.Group>
                            </div>

                            {this.state.isEditable && !this.state.isEditing && <button className="btn btn-dark w-100" onClick={() => this.setState({isEditing: true})}>Edit</button>}

                            {!this.state.formSubmitted && this.state.isEditing && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
                        </Form>
                    </div>
                </div>
            )
        }
        else {
            return <p>Company Doesn't Exist.</p>
        }
    }
}
export default CompanyProfile;
