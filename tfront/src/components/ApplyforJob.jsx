import React,{Component} from 'react';
import NavStudent from './NavStudent';
import { Form } from 'react-bootstrap';
import axios from 'axios';

class ApplyforJobs extends Component{
    constructor(props){
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(today);
        this.state={date_of_application: date};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setDefaultResume = this.setDefaultResume.bind(this);
    }

    componentDidMount(){
        axios({
            mehtod: "GET",
            url: "http://localhost:8000/student",
            params: {
                token: localStorage.getItem('token')
            },
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response)=>{
            console.log(response.data);
            this.setState({"student":response.data.data.fields});
            console.log(this.state);
        })
        console.log(this.state);
    }
    
    handleChange(event){
        event.preventDefault();
        var key = event.target.id;
        var value = event.target.value;
        console.log(value);
        this.setState({key:value});
    }

    setDefaultResume(event){
        event.preventDefault();
        this.setState({"resume":this.state.student.resume});

    }

    handleSubmit(event){
        event.preventDefault();
        var key = event.target.id;
        var value = event.target.value;
        console.log(value);
    }

    render(){
        return(
            <div>
            <NavStudent></NavStudent>
                <div className="container p-5 rounded">
                        <Form className="bg-dark text-white p-5 row" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="date_of_application" className="col-4">
                                <Form.Label>Date of Application</Form.Label>
                                <Form.Control type="text" id="date_of_application" name="date_of_application" value={this.state.date_of_application} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="resume" className="col-8">
                                <Form.Label>Resume</Form.Label>
                                <Form.Control type="file" id="resume" name="resume" value={this.state.resume}></Form.Control>
                            </Form.Group>
                            <button type="submit" className="btn btn-success col-6" onSubmit={this.handleSubmit}>Submit</button>
                            <button className="btn btn-warning col-6" onClick={this.setDefaultResume}>Default Resume</button>
                        </Form>
                </div>
            </div>
        )
    }
}
export default ApplyforJobs;
