import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RegisterForm extends Component{
    render(){
        return(
            <div className="vh-100 d-flex">
                <div className="row">
                    <Link to="/register/company">
                    <Button>Register Company</Button>
                    </Link>
                </div>
            </div>
        )
    }
}