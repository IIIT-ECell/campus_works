import React, {Component} from 'react';
import {Table, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavCompany from './NavCompany';

class CompanyHome extends Component {

    constructor(props) {
        super(props);
        this.state = {jobs: []};
    }

    componentDidMount() {
        axios({
            method: "POST",
            url: "http://localhost:8000/jobs",
            data: {
                "token": localStorage.getItem("token"),
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({"jobs": res.data});
                console.log(this.state);
            });
    }


    render() {
        return (
            <div>
            <NavCompany></NavCompany>
            <Container className="p-4">
                <Row>
                    <Col md={{ span:4, offset:8}}>
                        <Link to="/jobs/new"><Button>+ Add Job</Button></Link>
                    </Col>
                </Row>
            </Container>
            <Table responsive bordered hover striped>
                <thead>
                    <tr>
                        <th colSpan="6">Jobs posted</th>
                    </tr>
                    <tr>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Skill</th>
                        <th>Stipend</th>
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
                            <td><Link to={"/jobs/edit/" + item.pk}>Edit</Link></td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            </div>
        )
    }
}
export default CompanyHome;
