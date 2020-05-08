import React, { Component } from "react";
import {Table, Button} from 'react-bootstrap';
import axios from "axios";
import NavCompany from "./NavCompany";
import { Link } from "react-router-dom";

class ViewApplications extends Component{
    constructor(props){
        super(props);
        this.state={"applicants":[]};
    }

    componentDidMount(){
        axios({
            'method':'GET',
            'url':"http://localhost:8000/apply-for-job",
            "params":{
                "token": localStorage.getItem("token"),
                "job_id": this.props.match.params.job_id,
            }
        })
        .then((response)=>{
            console.log(response);
            this.setState({'applicants':response.data});
            console.log(this.state);
        })
    }
    render(){
        return (
            <div>
                <NavCompany></NavCompany>
                <Table>
                    <thead>
                        <tr>
                            <th colspan="2">Applicants</th>

                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applicants && this.state.applicants.map((item,key)=>{
                            return (<tr>
                                <td>{item.fields.date_of_application}</td>
                                <td>{item.fields.select_status}</td>
                                <td><a href={"http://localhost:8000/resume?id="+item.fields.student} target="_blank">View</a></td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default ViewApplications;