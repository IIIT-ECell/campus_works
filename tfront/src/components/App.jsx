import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyRegister from './CompanyRegister.jsx';

function App() {
	return (
		<div>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Campus Works</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" >Sign in</Nav.Link>
                        <Nav.Link href="/register/company">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path="/register/company" component={CompanyRegister} />
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
