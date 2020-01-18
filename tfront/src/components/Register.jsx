import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class RegisterForm extends Component{
    render(){
        return(
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="row my-auto">
                    <div className="col-12 text-center">
                        <Link to="/register/company">
                        <Button>Register Company</Button>
                        </Link>
                    </div>
                    <div className="col-12 text-center">
                        <Link to="/register/student">
                        <Button>Register Student</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default RegisterForm;