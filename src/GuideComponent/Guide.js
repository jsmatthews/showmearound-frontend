import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './Guide.css';

export default class Guide extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true, guide: {} };
	}

	async componentDidMount() {
		try {
			const guide = await axios.get(`${API_ROOT}/users/${this.props.match.params.guideId}`);

			this.setState({ isLoading: false, guide: guide.data.user });
		} catch (e) {
			console.error('Error retrieving tours: ', e);
		}
	}

	render() {
		return (
			this.state.isLoading ? <div></div> :
				<div className="page-wrapper">
					
				</div>
		)
	}
}