import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './Home.css';

const TourSummary = (props) => {
	return (
		<Link to={`/tour/${props.id}`}>
			<div className="Tour-summary">
				<div className="Tour-summary-content">
					<div className="Tour-summary-image">

					</div>
				</div>

				<div className="Tour-summary-header">
					<div className="title-wrapper">
						<div className="title">{props.title}</div>
						<div className="info-item datetime">datetime</div>
					</div>
					<div className="Tour-summary-description">
						description
				</div>
				</div>
			</div>
		</Link>
	)
}

TourSummary.propTypes = {
	title: PropTypes.string
}

class Tours extends Component {
	constructor(props) {
		super(props);
		this.state = { tours: [] };
	}

	async componentDidMount() {
		try {
			const tours = await axios.get(`${API_ROOT}/tours`);
			this.setState({ tours: tours.data })
			console.log(this.state.tours);
		} catch (e) {
			console.error('Error retrieving tours: ', e);
		}
	}

	render() {
		return (
			<div className="Tours">
				{this.state.tours.map(tour => <TourSummary key={tour._id} id={tour._id} title={tour.title} />)}
			</div>
		)
	}
}

Tours.propTypes = {
	tours: PropTypes.array
}

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center' }}>Home</h1>
				<Tours />
			</div>
		)
	}
}