import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './Landing';

function App() {
	return (
		<div>
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={Landing} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
