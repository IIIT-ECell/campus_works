import React, { Component} from 'react';
import './Landing.css'
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Landing extends Component {
    componentDidMount(){
        if(localStorage.getItem('token') && localStorage.getItem('isLoggedIn') && localStorage.getItem('id')){
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('id');
        }
    }

    render() {
        return(
            <div id="intro" className="vh-100">
                <div className="mask d-flex justify-content-center align-items-center">
                    <div className="container d-flex text-center">
                        <div className="row bg-white p-5 rounded">
                            <div className="col-md-6 my-auto">
                                <h2 className="display-4 font-weight-bold">Campus Works</h2>
                                <h5>Connecting Students with Startups. Internships have never been easier</h5>
                                <div className="row">
                                    <Link to={"/register/company"} className="w-100 p-1"><Button variant="btn" style={{"background-color":"black", "color":"#fafafa"}} size="lg">Register as Company <FontAwesomeIcon icon="user-cog"/></Button></Link>
                                    <br/>
                                    <Link to={"/register/student"} className="w-100 p-1"><Button variant="btn" style={{"background-color":"black", "color":"#fafafa"}} size="lg">Register as Student <FontAwesomeIcon icon="user-graduate"/></Button></Link>
                                </div>
                                <br className="my-4"/>
                            </div>
                            <div className="order-lg-first w-50 mx-auto">
                                <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/hero.png'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing;
