import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './Guide.css';

import { SectionHeader } from '../Sections/Sections';

const PastTours = (props) => {
	return (
		<div className="Section">
			<SectionHeader label="Past Tours" />
		</div>
	)
}

const FutureTours = (props) => {
	return (
		<div className="Section">
			<SectionHeader label="Future Tours" />
		</div>
	)
}

const Review = (props) => {
	return (
		<div className="Guide-review">
			<div className="Guide-review-column-left">
				<div className="Review-user">
					<div className="Review-user-image">

					</div>
					<div className="Review-user-name">
						<Link to={`/guide/${props.userId}`}>{props.user}</Link>
					</div>
				</div>
			</div>
			<div className="Guide-review-column-right">
				<div className="Review-content">
					<div className="Review-content-message">
						<span>{props.content}</span>
					</div>
					<div className="Review-content-createdAt">
						<span>From {props.location}</span>
						<span>on {props.createdAt}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

const GuideReviews = (props) => {
	return (
		<div className="Section">
			<SectionHeader label="Reviews" />
			<div className="Section-content">
				{
					(props.reviews.length > 0) ?
						props.reviews.map(review => <Review key={review.id} id={review.id} user={review.user} content={review.content} rating={review.rating} location={review.location} createdAt={review.createdAt} />)
						: "No Reviews"
				}
			</div>
		</div>
	)
}

const LeftColumn = (props) => {
	return (
		<div className="Guide-left-column">
			<FutureTours />
			<PastTours />
			<GuideReviews reviews={props.reviews} />
		</div>
	)
}

const GuideInfo = (props) => {
	return (
		<div className={`Guide-info-item ${props.class}`}>
			{props.data}
		</div>
	)
}

const RightColumn = (props) => {
	return (
		<div className="Guide-right-column">
			<div className="Guide-info">
				<div className="Guide-image">

				</div>
				<div className="Guide-name">
					{props.guide.first_name}
				</div>
				<GuideInfo class='Guide-age' data={props.guide.age} />
				<GuideInfo class='Guide-location' data={props.guide.location} />
				
				<SectionHeader label="About Me" />
				<div className="Section-content">
					{props.guide.about_me}
				</div>
			</div>
		</div>
	)
}

export default class Guide extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true, guide: {}, reviews: [] };
	}

	async componentDidMount() {
		try {
			var guide = await axios.get(`${API_ROOT}/users/${this.props.match.params.guideId}`);
			const reviews = [{ id: 1, user: 'James', location: 'France', content: 'This is a crappy review', rating: 3, createdAt: '01-01-2018' }]
			guide.data.user.age = 29;
			guide.data.user.location = 'Tokyo';
			this.setState({ isLoading: false, guide: guide.data.user, reviews: reviews });
		} catch (e) {
			console.error('Error retrieving tours: ', e);
		}
	}

	render() {
		return (
			this.state.isLoading ? <div></div> :
				<div className="page-wrapper">
					<LeftColumn reviews={this.state.reviews} />
					<RightColumn guide={this.state.guide} />
				</div>
		)
	}
}