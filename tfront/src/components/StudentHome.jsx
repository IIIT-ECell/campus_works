import React, {Component} from 'react';
import NavStudent from './NavStudent';
import {Button, Accordion, Card, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class StudentHome extends Component {

    constructor(props) {
        super(props);
        this.state = {jobs: [], applications: []};
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://campusworks.pythonanywhere.com/jobs",
        }).then((res) => {
            console.log(res);
            this.setState({"jobs": res.data});
            axios({
                method: "GET",
                url: "https://campusworks.pythonanywhere.com/applications",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + localStorage.getItem("token")
                }
            }).then((res) => {
                let jobs = [];
                console.log(res.data);
                console.log(this.state.jobs);
                let apps = res.data;
                if (apps.length === 0) {
                    return;
                }
                for (let job in this.state.jobs) {
                    let flag = true;
                    for (let application in apps) {
                        console.log(this.state.jobs[job].id);
                        if (this.state.jobs[job].id === apps[application].job_id) {
                            apps[application].job = this.state.jobs[job];
                            flag = false;
                        }
                    }
                    if (flag === true) {
                        jobs.push(this.state.jobs[job]);
                    }

                }
                this.setState({"jobs": jobs, "applications": apps});
                console.log(this.state);
            });
        });
    }

    render() {
        return (
            <div>
                <NavStudent></NavStudent>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Row xs={2} md={4}>
                                <Col>Job Name</Col>
                                <Col>Job Description</Col>
                                <Col>Date of Application</Col>
                                <Col>Status of Application</Col>
                            </Row>
                        </Card.Header>
                    </Card>
                    {this.state.applications && this.state.applications.map((item, key) => {
                        return (
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={"s" + key} colSpan="7">
                                    <Row xs={2} md={4}>
                                        <Col>{item.job.job_name}</Col>
                                        <Col className="text-truncate">{item.job.description}</Col>
                                        <Col className="text-truncate">{item.date_of_application}</Col>
                                        <Col>{item.select_status}</Col>
                                    </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={"s" + key}>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem><strong>Description: </strong>{item.job.description}</ListGroupItem>
                                            <ListGroupItem><strong>Skills Reqd: </strong>{item.job.skill}</ListGroupItem>
                                            <ListGroupItem><strong>Languages Used: </strong>{item.job.language}</ListGroupItem>
                                            <ListGroupItem><strong>Duration: </strong>{item.job.duration}</ListGroupItem>
                                            <ListGroupItem><strong>Flexible?: </strong>{item.job.is_flexi && "Yes"}{!item.is_flexi && "No"}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                    {this.state.applications.length === 0 && <tr><td colSpan="4">No applications</td></tr>}
                </Accordion>

                {/* <Table responsive striped bordered hover className="p-5">
                    <thead>
                        <tr>
                            <th colSpan="6">Applications Submitted</th>
                        </tr>
                        <tr>
                            <th>Job Name</th>
                            <th>Job Description</th>
                            <th>Date of Application</th>
                            <th>Status of Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applications && this.state.applications.map((item, key)=>{
                            return (<tr>
                                <td>{item.job.job_name}</td>
                                <td>{item.job.description}</td>
                                <td>{item.date_of_application}</td>
                                <td>{item.select_status}</td>
                            </tr>
                            )
                        })}
                        {this.state.applications.length==0 && <tr><td colSpan="4">No applications</td></tr>}
                    </tbody>
                </Table> */}

                <Accordion className="pt-5">
                    <Card>
                        <Card.Header>
                            <h5>List of Jobs</h5>
                        </Card.Header>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Row xs={3} md={6}>
                                <Col className="font-weight-bold">Company</Col>
                                <Col className="font-weight-bold">Job Name</Col>
                                <Col className="font-weight-bold">Start Date</Col>
                                <Col className="font-weight-bold">Stipend</Col>
                                <Col className="font-weight-bold"></Col>
                                <Col className="font-weight-bold"></Col>
                            </Row>
                        </Card.Header>
                    </Card>
                    {this.state.jobs && this.state.jobs.map((item, key) => {
                        return (
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={key} colSpan="7">
                                    <Row xs={3} md={6}>
                                        <Col><Link to={"/company/profile/" + item.company.id}>{item.company.user.first_name}</Link></Col>
                                        <Col>{item.job_name}</Col>
                                        <Col>{item.start_date}</Col>
                                        <Col>{item.stipend}</Col>
                                        <Col><Button variant="info"><FontAwesomeIcon icon="eye" /> View</Button></Col>
                                        <Col><Link to={'/apply/' + item.id}><Button variant="primary"><FontAwesomeIcon icon="file-signature" /> Apply</Button></Link></Col>
                                    </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={key}>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem><strong>Description: </strong>{item.description}</ListGroupItem>
                                            <ListGroupItem><strong>Skills Reqd: </strong>{item.skill}</ListGroupItem>
                                            <ListGroupItem><strong>Languages Used: </strong>{item.language}</ListGroupItem>
                                            <ListGroupItem><strong>Duration: </strong>{item.duration}</ListGroupItem>
                                            <ListGroupItem><strong>Flexible?: </strong>{item.is_flexi && "Yes"}{!item.is_flexi && "No"}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                    {this.state.jobs.length === 0 && <Card><Card.Header>No new jobs to show</Card.Header></Card>}
                </Accordion>

            </div>
        )
    }
}
export default StudentHome;
