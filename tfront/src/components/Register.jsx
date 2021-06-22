import React, {Component} from 'react';
import Landing from './Landing';
import Nav1 from './Nav1';

class RegisterForm extends Component {
    render() {
        return (
            <div>
                <Nav1></Nav1>
                <Landing />
            </div>
        )
    }
}
export default RegisterForm;
