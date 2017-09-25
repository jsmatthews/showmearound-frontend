import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Signup from '../SignupComponent/Signup';

const NavbarLink = (props) => {
	return (
		<div className="Navbar-link" onClick={props.linkClick}>{props.label}</div>
	);
};

class NavbarLinks extends Component {
	render() {
		return (
			<div className="Navbar-links" >
				<NavbarLink label="Login" linkClick={this.props.openModal} />
				<NavbarLink label="Sign Up" linkClick={this.props.openModal} />
				<Link to="/createTour" >Create Tour</Link>
			</div>
		);
	}
}

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { displayModal: false };
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ displayModal: true });
	}

	closeModal() {
		console.log('close');
		this.setState({ displayModal: false });
	}

	render() {
		return (
			<div className="Navbar">
				<div className="Navbar-inner">
					<Link to="/" className="Navbar-logo">SMA</Link>
					<NavbarLinks openModal={this.openModal} />
					{(this.state.displayModal) ? <Signup closeModal={this.closeModal} /> : null}
				</div>
			</div>
		)
	}
}