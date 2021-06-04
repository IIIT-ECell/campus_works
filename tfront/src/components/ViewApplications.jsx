import React, {Component} from "react";
import {Table, Button} from 'react-bootstrap';
import axios from "axios";
import NavCompany from "./NavCompany";

class ViewApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {"applicants": [], formSubmitted: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: "https://campusworks.pythonanywhere.com/apply-for-job",
            params: {
                job_id: this.props.match.params.job_id,
            },
            headers: {
                'Authorization': "Token " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                this.setState({'applicants': response.data});
                
            })
    }

    handleChange(event) {
        event.preventDefault();
        let applicants = this.state["applicants"];
        console.log(applicants)
        let key = event.target.attributes['pk'].value
        applicants[key].fields['select_status'] = event.target.value;
        this.setState({"applicants": applicants});
    }

    handleSubmit(event, pk, status) {
        event.preventDefault();
        this.setState({formSubmitted: true});
        axios({
            method: 'PUT',
            url: 'https://campusworks.pythonanywhere.com/apply-for-job',
            data: {
                application_id: pk,
                select_status: status
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        })
            .then((response) => {
                alert(response.data['message']);
                this.setState({formSubmitted: false});
            })
    }

    render() {
        return (
            <div>
                <NavCompany></NavCompany>
                <Table>
                    <thead>
                        <tr>
                            <th colspan="2">Applicants</th>

                        </tr>
                        <tr>
                            <th>Applicant ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                            <th>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applicants && this.state.applicants.map((item, key) => {
                            return (<tr>
                                <td>{item.fields.student}</td>
                                <td>{new Date(item.fields.date_of_application).toDateString()}</td>
                                <td>
                                    <select id="select_status" value={item.fields.select_status} pk={key} onChange={this.handleChange}>
                                        <option value='RCVD'>Application received</option>
                                        <option value='SCRN'>Passed screening</option>
                                        <option value='INTD'>Interviewed</option>
                                        <option value='ACPT'>Accepted</option>
                                        <option value='RJCT'>Rejected</option>
                                        <option value='FLAG'>Flagged</option>
                                    </select>
                                </td>
                                <td>{this.state.formSubmitted === false && <Button variant="btn btn-success" onClick={(e) => {this.handleSubmit(e, item.pk, item.fields.select_status)}}>Save</Button>}</td>
                                <td><a href={"https://campusworks.pythonanywhere.com/resume?id=" + String(parseInt(item.fields.student,10)* parseInt(item.fields.student,10) + 148017)} target="_blank">View</a></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default ViewApplications;
