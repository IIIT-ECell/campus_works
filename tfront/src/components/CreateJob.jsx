import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import NavCompany from './NavCompany';

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
        this.state = {formSubmitted: false}
        this.formData = {"is_flexi": "false"};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.token = localStorage.getItem("token");
        this.id = localStorage.getItem("id");
        this.type = localStorage.getItem("type");
    }

    handleChange(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({formSubmitted: true});
        axios({
            method: "POST",
            url: "https://campusworks.pythonanywhere.com/post-job",
            data: {
                id: this.id,
                job_name: this.formData.job_name,
                description: this.formData.description,
                skill: this.formData.skill,
                start_date: this.formData.start_date,
                duration: this.formData.duration,
                is_flexi: this.formData.is_flexi,
                stipend: this.formData.stipend,
                language: this.formData.language,
                num_pos: this.formData.num_pos,
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + this.token,
            }
        }).then((response) => {
            alert(response.data.message);
            if (response.data.message == "Job added successfully")
                window.location.replace("https://ecell.iiit.ac.in/cworks/company/home");
            else
                this.setState({formSubmitted: false});
        });
    }

    render() {
        if (!(localStorage.getItem("token") && localStorage.getItem("type") === "2")) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <NavCompany />
                    <div className="container py-5">
                        <form className="my-auto text-white rounded p-5" style={{"background-color": "black"}} onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-sm-2 col-form-label font-weight-bold">Job Name</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="job_name" id="job_name" placeholder="Enter Job Title" onChange={this.handleChange} required />
                                    <small className="form-text text-light">This is the Job Title</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-2 col-form-label font-weight-bold">Description</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="description" id="description" placeholder="Enter Job Description" onChange={this.handleChange} required />
                                    <small className="form-text text-light">Please describe the job</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="skill" className="col-sm-2 col-form-label font-weight-bold">Skill</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="skill" id="skill" placeholder="Enter Preferred Candidate Skills" onChange={this.handleChange} required />
                                    <small className="form-text text-light">Please list the skills required for this job. These could include the languages that the employee is expected to know.</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="positions" className="col-sm-2 col-form-label font-weight-bold">Positions Open</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="num_pos" id="num_pos" placeholder="Enter Number of Open Positions" type="number" onChange={this.handleChange} required />
                                    <small className="form-text text-light">This number is not binding.</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="start_date" className="col-sm-2 col-form-label font-weight-bold">Job start date</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="start_date" id="start_date" type="date" onChange={this.handleChange} required />
                                    <small className="form-text text-light">Approximate date from which the job starts. This is not binding and may be altered after interns are accepted.</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="duration" className="col-sm-2 col-form-label font-weight-bold">Job duration</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="duration" id="duration" placeholder="Enter Job Duration" type="number" onChange={this.handleChange} required />
                                    <small className="form-text text-light">How long will the job last? (in months)</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="is_flexi" className="col-sm-2 col-form-label font-weight-bold">Flexibility</label>
                                <div className="col-sm-10 text-align-left">
                                    <select className="form-control" name="is_flexi" id="is_flexi" onChange={this.handleChange} required>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                    <small className="form-text text-light">Are the dates flexible?</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="stipend" className="col-sm-2 col-form-label font-weight-bold">Approximate Stipend</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="stipend" id="stipend" placeholder="Enter Job Stipend" type="number" onChange={this.handleChange} required />
                                    <small className="form-text text-light">Job stipend (per month). This needn't be a final number.</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="language" className="col-sm-2 col-form-label font-weight-bold">Languages</label>
                                <div className="col-sm-10">
                                    <input className="form-control" name="language" id="language" placeholder="Enter Preferred Languages Required" onChange={this.handleChange} required />
                                    <small className="form-text text-light">Programming languages required</small>
                                </div>
                            </div>
                            {this.state.formSubmitted === false && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
                        </form>

                    </div>
                </div>
            );
        }
    }
};

export default CreateJob;
