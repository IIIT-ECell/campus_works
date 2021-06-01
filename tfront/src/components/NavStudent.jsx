import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Nav1.css';

class NavStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {student: {}};
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: "https://campusworks.pythonanywhere.com/student",
            headers: {
                "Authorization": "Token " + localStorage.getItem("token")
            }
        })
            .then((res) => {
                this.setState({"student": res.data.data});
            })
    }
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
                <Navbar.Brand className="nav-logo">
                    <Link to={"/"}>
                        <img
                            src={process.env.PUBLIC_URL + "/logo.png"}
                            width="60"
                            className="d-inline-block align-top"
                            alt="Campus Works logo" />{' '}
                    </Link>
                    <div className="nav-text">Campus <b><span className="nav-logo-gradient">Works</span></b></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link><Link to={"/student/home"} className="text-white"><FontAwesomeIcon icon="home" /> Home</Link></Nav.Link>
                        <Nav.Link><Link to={"/login"} className="text-white"><FontAwesomeIcon icon="sign-out-alt" /> Logout</Link></Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown" className="mr-auto" alignRight variant="dark" bg="dark">
                            <NavDropdown.Item><Link to={"/student/profile/" + this.state.student.pk}><FontAwesomeIcon icon="user" /> View Profile</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to={"/change-password/"}><FontAwesomeIcon icon="user-edit" /> Change Password</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavStudent;
