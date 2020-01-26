import React, {Component} from 'react';
import axios from 'axios';
import Nav1 from './Nav1';
import { Redirect } from 'react-router-dom';

/*
 * From Job model:
 *  job_name: str, max 255
 *  company: backend, get from token
 *  description: str
 *  skill: str, max 50
 *  start_date: date,
 *  TODO: duration unit? M/D/Y?
 *  duration: int
 *  is_flexi: bool
 *  stipend: int
 *  TODO: max 50.. too small?
 *  language: str, max 50
 *  is_active: bool
 */

class CreateJob extends Component {
    constructor(props) {
        super(props);
        this.formData = {"is_flexi": "false"};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.token = localStorage.getItem("token");
        this.id = localStorage.getItem("id");
        this.type = localStorage.getItem("type");
    }

    handleChange(event){
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
        console.log(this.formData);
    }

    handleSubmit(event){
        event.preventDefault();

        axios({
            method: "POST",
            url: "http://localhost:8000/post-job",
            data: {
                token: this.token,
                id: this.id,
                job_name: this.formData.job_name,
                description: this.formData.description,
                skill: this.formData.skill,
                start_date: this.formData.start_date,
                duration: this.formData.duration,
                is_flexi: this.formData.is_flexi,
                stipend: this.formData.stipend,
                language: this.formData.language,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            console.log(response.data);
            alert(response.data.message);
            window.location.replace("http://localhost:3000/company/home");
        });
    }

    render() {
        if(!(localStorage.getItem("token") && localStorage.getItem("type") == 2)) {
            return <Redirect to="/" />;
        } else {
            return(
                <div>
                    <Nav1 />
                    <div className="container py-5">
                        <form className="my-auto bg-dark text-white rounded p-5" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Job Name</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="job_name" id="job_name" placeholder="Example Co" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">This is the Job Title</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-form-label font-weight-bold">Description</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="description" id="description" placeholder="A cool job" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">Please describe the job</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="skill" className="col-sm-2 col-form-label font-weight-bold">Skill</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="skill" id="skill" placeholder="AI/ML, Big Data, Team Management" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">Please list the skills required for this job</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="start_date" className="col-sm-2 col-form-label font-weight-bold">Job start date</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="start_date" id="start_date" type="date" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">Date from which the job starts</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="duration" className="col-sm-2 col-form-label font-weight-bold">Job duration</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="duration" id="duration" placeholder="3" type="number" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">How long will the job last? (in months)</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="is_flexi" className="col-sm-2 col-form-label font-weight-bold">Flexibility</label>
                                <div className="col-sm-10 text-align-left">
                                    <select className="form-control" name="is_flexi" id="is_flexi" onChange={this.handleChange} required>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                    <small className="form-text text-muted">Are the dates flexible?</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="stipend" className="col-sm-2 col-form-label font-weight-bold">Stipend</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="stipend" id="stipend" placeholder="20000" type="number" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">Job stipend (per month)</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="language" className="col-sm-2 col-form-label font-weight-bold">Languages</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="language" id="language" placeholder="c/cpp/python" onChange={this.handleChange} required />
                                    <small className="form-text text-muted">Programming languages required</small>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
};

export default CreateJob;
