import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import NavCompany from './NavCompany';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class CompanyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {jobs: [], company: {}};
    }

    componentWillMount() {
        if (localStorage.getItem('token') === null) {
            window.location.replace('https://ecell.iiit.ac.in/cworks/login')
        }

        axios({
            method: "POST",
            url: "https://campusworks.pythonanywhere.com/jobs",
            headers: {
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        })
            .then((res) => {
                this.setState({"jobs": res.data});
            });
    }


    render() {
        return (
            <div>
                <NavCompany props={this.state.company} />

                <Table responsive bordered hover striped style={{minHeight: "75vh"}}>
                    <thead>
                        <tr>
                            <th colSpan="5">Jobs posted</th>
                            <th colSpan="2"><Link to="/jobs/new"><Button><FontAwesomeIcon icon="plus" /> Add Job</Button></Link></th>
                        </tr>
                        <tr>
                            <th>Job Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>Skill</th>
                            <th>Stipend</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.jobs && this.state.jobs.map((item, key) => {
                            return (<tr>
                                <td>{item.fields.job_name}</td>
                                <td>{item.fields.description}</td>
                                <td>{item.fields.start_date}</td>
                                <td>{item.fields.skill}</td>
                                <td>{item.fields.stipend}</td>
                                <td><Link to={"/jobs/edit/" + item.pk}><FontAwesomeIcon icon="edit" /> Edit</Link></td>
                                <td><Link to={"/view-applications/" + item.pk}>View Applications</Link></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default CompanyHome;
