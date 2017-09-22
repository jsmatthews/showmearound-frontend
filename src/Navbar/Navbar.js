import React, { Component } from 'react';
import './Navbar.css';

const NavbarLink = (props) => {
	return (
		<div className="Navbar-link" onClick={props.linkClick}>{props.label}</div>
	);
};

class NavbarLinks extends Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleSubmitClick = this.handleSubmitClick.bind(this);
	}

	handleLoginClick() {
		console.log('Login clicked!');
	}

	handleSubmitClick() {
		console.log('Submit clicked!');
	}

	render() {
		return (
			<div className="Navbar-links" >
				<NavbarLink label="Login" linkClick={this.handleLoginClick} />
				<NavbarLink label="Sign Up" linkClick={this.handleSubmitClick} />
			</div>
		);
	}
}

export default class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				<div className="Navbar-inner">
					<div className="Navbar-logo">SMA</div>
					<NavbarLinks />
				</div>
			</div>
		)
	}
}