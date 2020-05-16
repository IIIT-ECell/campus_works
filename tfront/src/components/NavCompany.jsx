import React,{Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavCompany extends Component{
    constructor(props){
        super(props);
        this.state = {company:{}};
    }
    componentWillMount(){
        axios.get("https://campusworks.pythonanywhere.com/company",{
            params:{
                "token":localStorage.getItem("token")
            },
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            console.log(res.data.data);
            this.setState({"company":res.data.data});
        });
    }
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand className="nav-logo">
                <Link to={"/"}>
                <img
                    src={ process.env.PUBLIC_URL + "/logo.png" }
                    width="60"
                    className="d-inline-block align-top"
                    alt="Campus Works logo" />{' '}
                </Link>
                    <div class="nav-text">Campus <b><span className="nav-logo-gradient">Works</span></b></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-white">
                        <Nav.Link><Link to={"/company/home"} className="text-white"><FontAwesomeIcon icon="home"/> Home</Link></Nav.Link>
                        <Nav.Link><Link to={"/login"} className="text-white"><FontAwesomeIcon icon="sign-out-alt"/> Logout</Link></Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown" className="mr-auto" alignRight variant="dark" bg="dark">
                            <NavDropdown.Item><Link to={"/company/profile/"+this.state.company.pk}><FontAwesomeIcon icon="user"/> View Profile</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to={"/change-password/"}><FontAwesomeIcon icon="user-edit"/> Change Password</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavCompany;