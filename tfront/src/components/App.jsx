import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyRegister from './CompanyRegister';

function App() {
	return (
		<div>
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path="/register/company" component={CompanyRegister} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
