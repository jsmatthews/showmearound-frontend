import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './NavbarComponent/Navbar';
import Home from './HomeComponent/Home';
import Tour from './TourComponent/Tour';
import Guide from './GuideComponent/Guide';
import CreateTour from './CreateTourComponent/CreateTour';
import Users from './TestComponents/UsersComponent';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<Route exact path='/' component={Home} />
				<Route path='/tour/:tourId' component={Tour} />
				<Route path='/guide/:guideId' component={Guide} />
				<Route path='/createTour' component={CreateTour} />
				<Route path='/users' component={Users} />
			</div>
		);
	}
}

export default App;
