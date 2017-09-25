import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './CreateTour.css';

import { TextInput, SubmitButton } from '../Forms/Forms';
import { SectionHeader } from '../Sections/Sections';

const CreateTourForm = (props) => {
    return (
        <form className="Create-tour-form" onSubmit={props.handleSubmit}>
            <TextInput elementId='TourTitle' placeholder="Tour Title" onChange={props.titleChange} value={props.title} onBlur={props.handleOnBlur} />
            <TextInput elementId='TourDescription' placeholder="Tour Description" onChange={props.descriptionChange} value={props.description} onBlur={props.handleOnBlur} />
            <TextInput elementId='TourStartTime' placeholder="Start Time" onChange={props.startTimeChange} value={props.start_date_time} onBlur={props.handleOnBlur} />
            <TextInput elementId='TourEndTime' placeholder="End Time" onChange={props.endTimeChange} value={props.end_date_time} onBlur={props.handleOnBlur} />
            <SubmitButton elementId='CreateTourSubmit' placeholder="Post"  />
        </form>
    )
}

export default class CreateTour extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleDescriptionUpdate = this.handleDescriptionUpdate.bind(this);
        this.handleStartTimeUpdate = this.handleStartTimeUpdate.bind(this);
        this.handleEndTimeUpdate = this.handleEndTimeUpdate.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);

        this.state = {
            wasCreated: false,
            errorMessage: false,
            new_tour: {
                guide: '59c8f67a79b4760acce908cc',
                title: '',
                description: '',
                start_date_time: '2018-01-02T00:00:00.000Z',
                end_date_time: '2018-01-02T00:00:00.000Z'
            }
        }
    }

    validateNewTour(new_tour) {
        const titleIsNotEmpty = new_tour.title !== '';
        const descriptionIsNotEmpty = new_tour.description !== '';
        const userIsNotEmpty = new_tour.guide !== '';
        const start_date_timeIsNotEmpty = new_tour.start_date_time !== '';
        const end_date_timeIsNotEmpty = new_tour.end_date_time !== '';

        return (titleIsNotEmpty && descriptionIsNotEmpty && userIsNotEmpty && start_date_timeIsNotEmpty && end_date_timeIsNotEmpty);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const newTourIsValid = this.validateNewTour(this.state.new_tour);
        console.log('newTourIsValid', newTourIsValid);
        if (!newTourIsValid) return;

        try {
            var CreatedTour = await axios.post(`${API_ROOT}/tours/`, this.state.new_tour);
            console.log(CreatedTour);
            this.setState({ wasCreated: true });
        } catch (e) {
            console.error('Error retrieving tours: ', e);
        }

    }

    handleTitleUpdate(event) {
        const title = event.target.value;
        var new_tour = this.state.new_tour;
        Object.assign(new_tour, { title: title });
        this.setState({ new_tour: new_tour });
    }

    handleDescriptionUpdate(event) {
        const description = event.target.value;
        var new_tour = this.state.new_tour;
        Object.assign(new_tour, { description: description });
        this.setState({ new_tour: new_tour });
    }

    handleStartTimeUpdate(event) {
        const start_date_time = event.target.value;
        var new_tour = this.state.new_tour;
        Object.assign(new_tour, { start_date_time: start_date_time });
        this.setState({ new_tour: new_tour });
    }

    handleEndTimeUpdate(event) {
        const end_date_time = event.target.value;
        var new_tour = this.state.new_tour;
        Object.assign(new_tour, { end_date_time: end_date_time });
        this.setState({ new_tour: new_tour });
    }

    handleOnBlur(event) {
        var el = document.getElementById(event.target.id);
        var submitEl = document.getElementById('CreateTourSubmit');
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
            <div className="Create-tour-page">
                <SectionHeader label="Create a tour..." />
                <CreateTourForm
                    error={this.state.errorMessage}
                    handleSubmit={this.handleSubmit}
                    handleOnBlur={this.handleOnBlur}

                    titleChange={this.handleTitleUpdate}
                    descriptionChange={this.handleDescriptionUpdate}
                    startTimeChange={this.handleStartTimeUpdate}
                    endTimeChange={this.handleEndTimeUpdate}

                    title={this.state.new_tour.title}
                    description={this.state.new_tour.description}
                    start_date_time={this.state.new_tour.start_date_time}
                    end_date_time={this.state.new_tour.end_date_time}
                />
            </div>
        )
    }
}