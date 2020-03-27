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
    }

    componentDidMount(){
        // axios({
        //     mehtod: "GET",
        //     url: "",
        //     data: {
        //         id: this.props.match.params.job_id
        //     },
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // })
        // .then((response)=>{
        //     this.setState(response.data.data.fields);
        //     console.log(this.state);
        // })
        console.log(this.state);
    }
    handleChange(event){
        event.preventDefault();
        var key = event.target.id;
        var value = event.target.value;
        console.log(value);
        this.setState({key:value});
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
                            <button type="submit" className="btn btn-primary col-6" onClick={this.handleSubmit}>Submit</button>
                            <button type="reset" className="btn btn-primary col-6" onClick={this.handleSubmit}>Submit</button>
                        </Form>
                </div>
            </div>
        )
    }
}
export default ApplyforJobs;
