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
            method:"GET",
            url:"https://localhost:8000/jobs/",
            data:{
                "token":localStorage["key"],
            },
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
            }.then((response)=>{
                this.setState({jobs:response.data.jobs});
            })
        })
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
                    {this.state.jobs.map((item,key)=>{
                        <tr>
                            <td>{item.job_name}</td>
                            <td>{item.description}</td>
                            <td>{item.start_date}</td>
                            <td>{item.skill}</td>
                            <td>{item.stipend}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        )
    }
}