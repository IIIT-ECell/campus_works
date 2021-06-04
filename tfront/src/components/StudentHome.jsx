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
        this.darkbg={"background-color":"black","color":"white"};
        this.darkbgonly={"background-color":"black"};
        this.stringify_status = this.stringify_status.bind(this);
        this.get_card_colour = this.get_card_colour.bind(this);
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://campusworks.pythonanywhere.com/jobs",
        }).then((res) => {
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
                let apps = res.data;
                if (apps.length === 0) {
                    return;
                }
                for (let job in this.state.jobs) {
                    let flag = true;
                    for (let application in apps) {
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
            });
        });
    }

    get_card_colour(key){
        let colours = {
            "RCVD":{"background-color":"#fafafa"},
            "SCRN":{"background-color":"#95a3ab"},
            "INTD":{"background-color":"#452981","color":"#fafafa"},
            "ACPT":{"background-color":"#206b00","color":"#fafafa"},
            "FLAG":{"background-color":"#f9c440"},
            "RJCT":{"background-color":"#a10705","color":"#fafafa"}
        };
        return colours[key];
    }

    stringify_status(key){
        let mapping={
            'RCVD':"Application received",
            'SCRN':"Passed screening",
            'INTD':"Interviewed",
            'ACPT':"Accepted",
            'RJCT':"Rejected",
            'FLAG':"Flagged"
        }
        return mapping[key];
    }

    render() {
        return (
            <div>
                <NavStudent></NavStudent>
                <Accordion>
                    <Card className="pink-purple-gradient-text text-white">
                        <Card.Header>
                            <h5>Applications Submitted</h5>
                        </Card.Header>
                    </Card>
                    <Card style={this.darkbg}>
                        <Card.Header>
                            <Row xs={2} md={4}>
                                <Col className="font-weight-bold">Job Name</Col>
                                <Col className="font-weight-bold">Job Description</Col>
                                <Col className="font-weight-bold">Date of Application</Col>
                                <Col className="font-weight-bold">Status of Application</Col>
                            </Row>
                        </Card.Header>
                    </Card>
                    {this.state.applications && this.state.applications.map((item, key) => {
                        return (
                            <Card style={this.get_card_colour(item.select_status)}>
                                <Accordion.Toggle as={Card.Header} eventKey={"s" + key} colSpan="7">
                                    <Row xs={2} md={4}>
                                        <Col>{item.job.job_name}</Col>
                                        <Col className="text-truncate">{item.job.description}</Col>
                                        <Col className="text-truncate">{item.date_of_application.substring(0,10)}</Col>
                                        <Col> {this.stringify_status(item.select_status)}</Col>
                                    </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={"s" + key}>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem><strong>Description: </strong>{item.job.description}</ListGroupItem>
                                            <ListGroupItem><strong>Skills Required: </strong>{item.job.skill}</ListGroupItem>
                                            <ListGroupItem><strong>Languages Used: </strong>{item.job.language}</ListGroupItem>
                                            <ListGroupItem><strong>Duration: </strong>{item.job.duration}</ListGroupItem>
                                            <ListGroupItem><strong>Flexibility: </strong>{item.job.is_flexi && "Yes"}{!item.is_flexi && "No"}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                    {this.state.applications.length === 0 && <Card><Card.Header><Row><Col xs={12} className="text-center">No applications</Col></Row></Card.Header></Card>}
                </Accordion>

                <Accordion className="pt-5">
                    <Card className="pink-purple-gradient-text text-white">
                        <Card.Header>
                            <h5>List of Jobs</h5>
                        </Card.Header>
                    </Card>
                    <Card style={this.darkbg}>
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
                                        <Col><Link to={"/company/profile/" + String(parseInt(item.company.id,10)*parseInt(item.company.id,10)+458069)}>{item.company.user.first_name}</Link></Col>
                                        <Col>{item.job_name}</Col>
                                        <Col>{item.start_date}</Col>
                                        <Col>{item.stipend}</Col>
                                        <Col><Button variant="info"><FontAwesomeIcon icon="eye" /> View</Button></Col>
                                        <Col><Link to={'/apply/' + item.id}><Button variant="primary"><FontAwesomeIcon icon="file-signature" /> Apply</Button></Link></Col>
                                    </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={key} style={this.darkbgonly}>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem><strong>Description: </strong>{item.description}</ListGroupItem>
                                            <ListGroupItem><strong>Skills Required: </strong>{item.skill}</ListGroupItem>
                                            <ListGroupItem><strong>Languages Used: </strong>{item.language}</ListGroupItem>
                                            <ListGroupItem><strong>Duration: </strong>{item.duration}</ListGroupItem>
                                            <ListGroupItem><strong>Flexibility: </strong>{item.is_flexi && "Yes"}{!item.is_flexi && "No"}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )
                    })}
                    {this.state.jobs.length === 0 && <Card><Card.Header><Row><Col xs={12} className="text-center">No new jobs to show</Col></Row></Card.Header></Card>}
                </Accordion>

            </div>
        )
    }
}
export default StudentHome;
