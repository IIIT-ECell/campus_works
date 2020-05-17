import React,{ Component } from "react";
import NavCompany from './NavCompany';
import NavStudent from './NavStudent';
import { Form } from "react-bootstrap";
import './App.css';
import axios from "axios";

class CompanyProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {formSubmitted:false,company:{},user:{}}
        this.formData = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.state);
        axios.get("https://campusworks.pythonanywhere.com/profile/company",{
            params: {
                "token":localStorage.getItem("token"),
                "company_id":this.props.match.params.company_id,
            },
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            console.log(this.state);
            if(res.data.success==true){
                this.setState({company:res.data.company.fields});
                this.setState({user:res.data.user.fields});
                console.log(this.state);
            }
        });
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({formSubmitted:true});
        var form_data = new FormData();
        var keys = Object.keys(this.formData);
        console.log(keys);
        for (var i in keys){
            form_data.append(keys[i],this.formData[keys[i]]);
        }
        // form_data.append()
        axios.put("https://campusworks.pythonanywhere.com/company",
            form_data,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }  
            }
        ).then((res)=>{
            alert(res.data);
            this.setState({formSubmitted:false});
        })
    }


    render(){
        if(this.state.company){
        return(
            <div>
                {localStorage.getItem('type')==1 && <NavStudent></NavStudent>}
                {localStorage.getItem('type')==2 && <NavCompany></NavCompany>}
                <div className="container my-5">
                    <Form onSubmit={this.handleSubmit} className="container p-5">
                        <div className="row">
                            <Form.Group className="col-md-4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" id="name" placeholder="ABC Inc." onChange={this.handleChange} disabled value={this.state.user.first_name}/>
                            </Form.Group>
                            <Form.Group className="col-md-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" id="email" placeholder="joe@email.com" onChange={this.handleChange} disabled value={this.state.user.email}/>
                            </Form.Group>
                            <Form.Group className="col-md-4">
                                <Form.Label>Contact Name</Form.Label>
                                <Form.Control  name="contact_name" id="poc" onChange={this.handleChange} disabled value={this.state.company.poc}/>
                            </Form.Group>
                            <Form.Group className="col-md-8 offset-md-2">
                                <Form.Label>About</Form.Label>
                                <Form.Control type="textarea" id="about" name="about" onChange={this.handleChange} disabled value={this.state.company.about}/>
                            </Form.Group>
                        </div>
                        
                        {this.state.formSubmitted===false && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
                    </Form>
                </div>
            </div>
        )
    }
    else {
        return <p>Company Doesn't Exist.</p>
    }
}
}
export default CompanyProfile;