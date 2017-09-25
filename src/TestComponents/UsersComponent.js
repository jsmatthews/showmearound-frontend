import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../api-config';

const User = (props) => {
	return (
		<div>{props.first_name}, {props.family_name}, {props.email}, {props.password} </div>
	)
}

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = { users: [] };
	}

	async componentDidMount() {
		const users = await axios.get(`${API_ROOT}/users`);
		this.setState({ users: users.data });
	}

	render() {
		return (
			<div>
				{this.state.users.map(user => <User key={user._id} first_name={user.first_name} family_name={user.family_name} email={user.email} password={user.password} />)}
			</div>
		)
	}
}