import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyRegister from './CompanyRegister.jsx';
import Login from './Login.jsx';
import CompanyHome from './CompanyHome';
import CreateJob from './CreateJob';
import EditJob from './EditJob';
import StudentRegister from './StudentRegister';
import RegisterForm from './Register';

function App(props) {
    return (
        <div>
            <Router basename={props.baseUrl}>
                <div>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home {...props} />} />
                        <Route exact path="/register" component={RegisterForm}/>
                        <Route exact path="/register/company" render={(props) => <CompanyRegister {...props} />} />
                        <Route exact path="/register/student" component={StudentRegister}  />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/company/home" component={CompanyHome} />
                        <Route exact path="/jobs/new" component={CreateJob} />
                        <Route exact path="/jobs/edit/:id" component={EditJob} />
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
