import React,{Component} from 'react';
import Landing from './Landing';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Nav1 from './Nav1';

class RegisterForm extends Component{
    render(){
        return(
            <div>
                <Nav1></Nav1>
                <Landing/>
            </div>
        )
    }
}
export default RegisterForm;