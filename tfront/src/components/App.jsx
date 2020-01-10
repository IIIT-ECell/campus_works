import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyRegister from './CompanyRegister.jsx';
import Login from './Login.jsx';
import CompanyHome from './CompanyHome';

function App(props) {
	console.log(props);
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href={props.baseUrl + "/"} className="nav-logo">
				<img
        			src={ props.baseUrl + "/logo.png" }
        			width="60"
        			className="d-inline-block align-top"
        			alt="Campus Works logo" />{' '}
					<div class="nav-text">Campus <b><span className="nav-logo-gradient">Works</span></b></div>
				</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-white">
                        <Nav.Link href={ props.baseUrl + "/register/company" } className="text-white">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                <Router basename={props.baseUrl}>
				<div>
					<Switch>
                        <Route exact path="/" render={(props) => <Home {...props} />} />
						<Route exact path="/register/company" render={(props) => <CompanyRegister {...props} />} />
						<Route exact path="/login" component={Login}/>
						<Route exact path="/company/home" component={CompanyHome}/>
					</Switch>
				</div>
			</Router>
			<div className="container-fluid pink-purple-gradient-text">
				<div className="row">
					<div className="col text-right px-5">
						<h2 className="py-4 font-weight-light font-italic text-white">Connecting IIIT's finest with you</h2>
					</div>
				</div>
			</div>

			<div className="container-fluid bg-dark">
				<div className="row">
					<div className="col text-center px-5">
						<h5 className="py-5 font-weight-bold text-white">An E-Cell IIIT-H Initiative</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
