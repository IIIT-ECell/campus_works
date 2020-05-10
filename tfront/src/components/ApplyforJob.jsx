import React,{Component} from 'react';
import NavStudent from './NavStudent';
import { Form, FormGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ApplyforJobs extends Component{
    constructor(props){
        super(props);
        this.state = {formSubmitted:false};
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(today);
        this.state={date_of_application: date,student:{student_id:""}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios({
            mehtod: "GET",
            url: "https://campusworks.pythonanywhere.com/student",
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
            this.setState({"pk":response.data.data.pk});
            console.log(this.state);
        })  
    }
    
    handleChange(event){
        event.preventDefault();
        var key = event.target.id;
        var value = event.target.value;
        console.log(value);
        this.setState({key:value});
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({formSubmitted:true});
        console.log(this.props.match.params.job_id);
        axios({
            method:'POST',
            url: "https://campusworks.pythonanywhere.com/apply-for-job",
            data:{
                job_id:parseInt(this.props.match.params.job_id),
                date_of_application: this.state.date_of_application,
                token: localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log(response);
            alert(response.data.message);
            this.setState({formSubmitted:false});
        })
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
                            <FormGroup controlId="student_id" className="col-4">
                                <Form.Label>Student Id</Form.Label>
                                <Form.Control type="text" id="student_id" name="student_id" value={this.state.student.student_id} disabled></Form.Control>
                            </FormGroup>
                            <FormGroup controlId="phone_number" className="col-4">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" id="phone_number" name="phone_number" value={this.state.student.phone_number} disabled></Form.Control>
                            </FormGroup>
                             {this.state.formSubmitted===false && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
                             <Link to={"/student/home"} className="col-6"><Button variant="btn btn-primary col-6">Back</Button></Link>
                        </Form>
                </div>
            </div>
        )
    }
}
export default ApplyforJobs;
