import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';

class CompanyHome extends Component{

    constructor(props){
        super(props);
        this.state = {jobs:[]};
    }

    componentDidMount(){
        axios({
            method:"POST",
            url:"http://localhost:8000/jobs",
            data:{
                "token":localStorage.getItem("token"),
            },
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then((res)=>{
            console.log(res);
            this.setState({"jobs":res.data});
            console.log(this.state);
        });
    }


    render(){
        return (
            <Table>
                <thead>
                    <tr>
                        <th colSpan="6">Jobs posted</th>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>Skill</th>
                        <th>Stipend</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.jobs && this.state.jobs.map((item,key)=>{
                        return (<tr>
                            <td>{item.fields.job_name}</td>
                            <td>{item.fields.description}</td>
                            <td>{item.fields.start_date}</td>
                            <td>{item.fields.skill}</td>
                            <td>{item.fields.stipend}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        )
    }
}
export default CompanyHome;