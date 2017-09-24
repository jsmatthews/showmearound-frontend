import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './NavbarComponent/Navbar';
import Home from './HomeComponent/Home';
import Tour from './TourComponent/Tour';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<Route path='/home' component={Home} />
				<Route path='/tour/:tourId' component={Tour} />
			</div>
		);
	}
}

export default App;
