import React, { Component } from 'react';
//import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../api-config';


export default class Tour extends Component {
    constructor(props) {
        super(props);
        this.state = { tour: {}, guide: {} };
    }

    async componentDidMount() {
        try {
            const tour = await axios.get(`${API_ROOT}/tours/${this.props.match.params.tourId}`);
            const guide = await axios.get(`${API_ROOT}/users/${tour.data.tour.guide}`);
            console.log('Tour', tour.data.tour);
            console.log('Guide', guide.data.user);

            this.setState({ tour: tour.data.tour, guide: guide.data.user });
        } catch (e) {
            console.error('Error retrieving tours: ', e);
        }
    }

    render() {
        return (
            <div>
                <h2>Tour</h2>
                <div>{this.state.tour._id}</div>
                <div>{this.state.tour.title}</div>
                <div>{this.state.tour.description}</div>
                <h2>Guide</h2>
                <div>{this.state.guide.username}</div>
            </div>
        )
    }
}