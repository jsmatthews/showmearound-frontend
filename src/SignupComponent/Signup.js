import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './Signup.css';

import { TextInput, SubmitButton } from '../Forms/Forms';
import { SectionHeader } from '../Sections/Sections';

const SignupForm = (props) => {
	return (
		<form className="Create-tour-form" onSubmit={props.signupSubmit}>
			<TextInput elementId='FirstName' placeholder="First name..." onChange={props.firstNameChange} value={props.first_name} onBlur={props.handleOnBlur} />
			<TextInput elementId='FamilyName' placeholder="Surname..." onChange={props.familyNameChange} value={props.family_name} onBlur={props.handleOnBlur} />
			<TextInput elementId='Email' placeholder="Email..." onChange={props.emailChange} value={props.email} onBlur={props.handleOnBlur} />
			<TextInput elementId='Password' placeholder="Password..." onChange={props.passwordChange} value={props.password} onBlur={props.handleOnBlur} />
			<SubmitButton elementId='SignupSubmit' placeholder="Post" />
		</form>
	)
}

const LoginForm = (props) => {
	return (
		<form className="Create-tour-form" onSubmit={props.loginSubmit}>
			<TextInput elementId='Email' placeholder="Email..." onChange={props.emailChange} value={props.email} onBlur={props.handleOnBlur} />
			<TextInput elementId='Password' placeholder="Password..." onChange={props.passwordChange} value={props.password} onBlur={props.handleOnBlur} />
			<SubmitButton elementId='SignupSubmit' placeholder="Post" />
		</form>
	)
}

const Modal = (props) => {
	return (
		<div>
			<div className="Modal-background" onClick={props.closeModal}></div>
			<div className="Modal">
				<SectionHeader label="Sign up..." />
				{
					(props.modalType === '') ? null :
					(props.modalType === 'signup') ? <SignupForm {...props} /> : <LoginForm {...props} />
				}
			</div>
		</div>
	)
}

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.signupSubmit = this.signupSubmit.bind(this);
		this.loginSubmit = this.loginSubmit.bind(this);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.firstNameChange = this.firstNameChange.bind(this);
		this.familyNameChange = this.familyNameChange.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);

		this.state = {
			error: false,
			signup_info: {
				first_name: '',
				family_name: '',
				email: '',
				password: ''
			}
		}
	}

	async signupSubmit(event) {
		event.preventDefault();
		//const signupIsValid = this.validateSignup(this.state.signup_info);
		//if (!signupIsValid) return;

		try {
			console.log(this.state.signup_info);
			var SignedInUser = await axios.post(`${API_ROOT}/passport/signup/`, this.state.signup_info);
			console.log(SignedInUser);
		} catch (e) {
			console.error('Error signing in user: ', e);
		}
	}

	async loginSubmit(event) {
		event.preventDefault();
		//const signupIsValid = this.validateSignup(this.state.signup_info);
		//if (!signupIsValid) return;

		try {
			console.log(this.state.signup_info);
			var SignedInUser = await axios.post(`${API_ROOT}/passport/login/`, this.state.signup_info);
			console.log(SignedInUser);
		} catch (e) {
			console.error('Error signing in user: ', e);
		}
	}

	firstNameChange(event) {
		var new_signup_info = this.state.signup_info;
		Object.assign(new_signup_info, { first_name: event.target.value });
		this.setState({ signup_info: new_signup_info });
	}

	familyNameChange(event) {
		var new_signup_info = this.state.signup_info;
		Object.assign(new_signup_info, { family_name: event.target.value });
		this.setState({ signup_info: new_signup_info });
	}

	emailChange(event) {
		var new_signup_info = this.state.signup_info;
		Object.assign(new_signup_info, { email: event.target.value });
		this.setState({ signup_info: new_signup_info });
	}

	passwordChange(event) {
		var new_signup_info = this.state.signup_info;
		Object.assign(new_signup_info, { password: event.target.value });
		this.setState({ signup_info: new_signup_info });
	}

	handleOnBlur(event) {
		console.log('blur');
		var el = document.getElementById(event.target.id);
		var submitEl = document.getElementById('SignupSubmit');
		if (event.target.value === '') {
			this.setState({ error: true });
			el.style.borderColor = '#922f2f';
			el.style.background = '#ffcfcf';
			submitEl.disabled = true;
			submitEl.classList.add('Submit-button-disabled');
		} else {
			this.setState({ error: false });
			el.style.borderColor = '';
			el.style.background = '';
			submitEl.disabled = false;
			submitEl.classList.remove('Submit-button-disabled');
		}
	}

	render() {
		return (
			<Modal
				modalType={this.props.modalType}
				closeModal={this.props.closeModal}

				signupSubmit={this.signupSubmit}
				loginSubmit={this.loginSubmit}
				handleOnBlur={this.handleOnBlur}

				firstNameChange={this.firstNameChange}
				familyNameChange={this.familyNameChange}
				emailChange={this.emailChange}
				passwordChange={this.passwordChange}

				title={this.state.signup_info.first_name}
				description={this.state.signup_info.family_name}
				start_date_time={this.state.signup_info.email}
				end_date_time={this.state.signup_info.password}
			/>
		)
	}
}