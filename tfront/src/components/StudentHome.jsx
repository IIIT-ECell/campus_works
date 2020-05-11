import React, {Component} from 'react';
import NavStudent from './NavStudent';
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                    console.log(job);
                    let flag = true;
                    for(let application in apps){
                        console.log(application);
                        if(this.state.jobs[job].pk==apps[application].job_id){
                            apps[application].job = this.state.jobs[job].fields;
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
                <Table>
                <thead>
                    <tr>
                        <th colSpan="6">Jobs Available</th>
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
                            <td><Link to={'/apply/'+item.pk}><Button variant="primary">Apply</Button></Link></td>
                        </tr>)
                    })}
                    {this.state.jobs.length==0 && <td colSpan="6" className="text-center">No new jobs to show</td>}
                </tbody>
                </Table>
                <Table>
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
            </div>
        )
    }
}
export default StudentHome;