import React, { Component } from 'react';
import './Navbar.css';

const NavbarLink = (props) => {
	return (
		<div className="Navbar-link">{props.label}</div>
	);
};

const NavbarLinks = (props) => {
	return (
		<div className="Navbar-links">
			<NavbarLink label="Login" />
			<NavbarLink label="Sign Up" />
		</div>
	);
}

export default class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				<span>I am the navbar</span>
				<NavbarLinks />
			</div>
		)
	}
}