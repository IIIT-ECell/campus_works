import React, {Component} from 'react';
import NavStudent from './NavStudent';
import {Table, Button, Accordion, Card, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class StudentHome extends Component{
    
    constructor(props){
        super(props);
        this.state={jobs:[],applications:[]};
    }

    componentDidMount(){
        axios({
            method: "GET",
            url: "https://campusworks.pythonanywhere.com/jobs",
        }).then((res) => {
            console.log(res);
            this.setState({"jobs": res.data});
            axios({
                method: "GET",
                url: "https://campusworks.pythonanywhere.com/applications",
                params: {
                    "token": localStorage.getItem("token"),
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res)=>{
                let jobs = [];
                console.log(res.data);
                console.log(this.state.jobs);
                let apps = res.data;
                if (apps.length == 0){
                    return;
                }
                for(let job in this.state.jobs){
                    let flag = true;
                    for(let application in apps){
                        console.log(this.state.jobs[job].id);
                        if(this.state.jobs[job].id==apps[application].job_id){
                            apps[application].job = this.state.jobs[job];
                            flag = false;
                        }
                    }
                    if(flag===true){
                        jobs.push(this.state.jobs[job]);
                    }

                }
                this.setState({"jobs":jobs,"applications":apps});
                console.log(this.state);
            });
        });
    }

    render(){
        return(
            <div>
                <NavStudent></NavStudent>
                <Table responsive striped bordered hover>
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
                    </tbody>
                </Table>
                <Accordion>
                    {this.state.jobs && this.state.jobs.map((item, key) => {
                        return (
                            <Table responsive>
                                <tr>
                                    <th colSpan="7"></th>
                                </tr>
                            <Card>
                                <tbody>
                                    <tr>
                                    <Accordion.Toggle as={Card.Header} eventKey={key} colSpan="7">
                                    <td><Link to={"/company/profile/"+item.company.id}>{item.company.user.first_name}</Link></td>
                                    <td>{item.job_name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.skill}</td>
                                    <td>{item.stipend}</td>
                                    <td><Link to={'/apply/'+item.id}><Button variant="primary"><FontAwesomeIcon icon="file-signature"/> Apply</Button></Link></td>    
                                    <td><Button variant="info"><FontAwesomeIcon icon="eye"/> View</Button></td>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={key}>
                                        <Card.Body>
                                            <ListGroup>
                                                <ListGroupItem>Description:{item.description}</ListGroupItem>
                                                <ListGroupItem>Languages Used:{item.language}</ListGroupItem>
                                                <ListGroupItem>Duration:{item.duration}</ListGroupItem>
                                                <ListGroupItem>Flexible?:{item.is_flexi}</ListGroupItem>
                                            </ListGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </tr>
                                </tbody>
                            </Card>
                            </Table>
                        )
                    })}
                    {this.state.jobs.length==0 && <td colSpan="6" className="text-center">No new jobs to show</td>}
                </Accordion>
                
            </div>
        )
    }
}
export default StudentHome;