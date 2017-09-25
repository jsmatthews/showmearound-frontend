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
				<NavbarLink label="Login" linkClick={this.props.openLoginModal} />
				<NavbarLink label="Sign Up" linkClick={this.props.openSignupModal} />
				<Link to="/createTour" >Create Tour</Link>
			</div>
		);
	}
}

export default class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { displayModal: false, modalType: '' };
		this.openSignupModal = this.openSignupModal.bind(this);
		this.openLoginModal = this.openLoginModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openSignupModal() {
		this.setState({ displayModal: true, modalType: 'signup' });
	}

	openLoginModal() {
		this.setState({ displayModal: true, modalType: 'login' });
	}

	closeModal() {
		console.log('close');
		this.setState({ displayModal: false, modalType: '' });
	}

	render() {
		return (
			<div className="Navbar">
				<div className="Navbar-inner">
					<Link to="/" className="Navbar-logo">SMA</Link>
					<NavbarLinks openSignupModal={this.openSignupModal} openLoginModal={this.openLoginModal} />
					{(this.state.displayModal) ? <Signup closeModal={this.closeModal} modalType={this.state.modalType} /> : null}
				</div>
			</div>
		)
	}
}