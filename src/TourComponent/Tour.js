import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../api-config';
import './Tour.css';

import { DateTimeFilter } from '../Helpers/Filters';
import { SectionHeader } from '../Sections/Sections';

const LeftColumn = (props) => {
    return (
        <div className="Tour-left-column">
            <div className="Tour-image">

            </div>
            <div className="Tour-title">{props.title}</div>
            <div className="Tour-guide">
                <span>with </span>
                <span className="stand-out-text"><Link to={`/guide/${props.guideId}`}>{props.guideName}</Link></span>
                <span> on </span>
                <span className="stand-out-text">{DateTimeFilter(props.startDateTime, true)}</span>
            </div>
            <div className="Tour-request">
                <div className="Tour-request-btn">Request to join!</div>
            </div>
        </div>
    )
}

const TourDescription = (props) => {
    return (
        <div className="Section">
            <SectionHeader label="Description" />
            <div className="Section-content">
                {props.tourDescription}
            </div>
        </div>
    )
}

const TourActivity = (props) => {
    return (
        <div className="Tour-activity">
            <div className="Tour-activity-index">{props.order}</div>
            <div className="Tour-activity-content">{props.activity}</div>
        </div>
    )
}

const TourItinerary = (props) => {
    return (
        <div className="Section">
            <SectionHeader label="Itinerary" />
            <div className="Section-content">
                {props.tourItinerary.map(activity => <TourActivity key={activity.id} id={activity.id} order={activity.order} activity={activity.content} />)}
            </div>
        </div>
    )
}

const TourMessageOwner = (props) => {
    return (
        <div className="Message">
            <div className="Message-owner-left">
                <div className="Message-content">
                    <span>{props.content}</span>
                </div>
                <div className="Message-datetime">
                    {props.dateTime}
                </div>
            </div>
            <div className="Message-owner-right">
                <div className="Message-user">
                    <div className="Message-user-image">

                    </div>
                    <div className="Message-user-name">
                        <Link to={`/guide/${props.userId}`}>{props.user}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TourMessageOther = (props) => {
    return (
        <div className="Message">
            <div className="Message-other-left">
                <div className="Message-user">
                    <div className="Message-user-image">

                    </div>
                    <div className="Message-user-name">
                        <Link to={`/guide/${props.userId}`}>{props.user}</Link>
                    </div>
                </div>
            </div>
            <div className="Message-other-right">
                <div className="Message-content">
                    <span>{props.content}</span>
                </div>
                <div className="Message-datetime">
                    {props.dateTime}
                </div>
            </div>
        </div>
    )
}

const NewMessage = (props) => {
    return (
        <div className="Message-new">
            <textarea className="Message-textarea" rows="4" cols="50" placeholder="Send a message..."></textarea>
            <div className="Message-controls">
                <div className="control">
                    <span className="fa fa-picture-o"></span>
                </div>
                <div className="submit">
                    Submit
                </div>
            </div>
        </div>
    )
}

const TourMessages = (props) => {
    const currentUser = 'Inigo';
    return (
        <div className="Section">
            <SectionHeader label="Lets discuss..." />
            <div className="Section-content">
                <NewMessage />
                {
                    props.messages.map((message) => {
                        return (
                            (message.user === currentUser) ?
                                <TourMessageOwner key={message.id} id={message.id} message={message.content} user={message.user} userId={message.userId} content={message.content} dateTime={message.dateTime} />
                                :
                                <TourMessageOther key={message.id} id={message.id} message={message.content} user={message.user} userId={message.userId} content={message.content} dateTime={message.dateTime} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const RightColumn = (props) => {
    return (
        <div className="Tour-right-column">
            <TourDescription tourDescription={props.tourDescription} />
            <TourItinerary tourItinerary={props.tourItinerary} />
            <TourMessages messages={props.tourMessages} />
        </div>
    )
}

export default class Tour extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, tour: {}, guide: {}, tourItinerary: [], tourMessages: [] };
    }

    async componentDidMount() {
        try {
            const tour = await axios.get(`${API_ROOT}/tours/${this.props.match.params.tourId}`);
            const guide = await axios.get(`${API_ROOT}/users/${tour.data.tour.guide}`);
            const itinerary = [
                { id: 1, order: 1, content: 'Activity 1' },
                { id: 2, order: 2, content: 'Activity 2' }
            ];
            const messages = [
                { id: 1, user: guide.data.user.first_name, userId: guide.data.user._id, dateTime: '01-01-2018', content: 'Hey! Lets have fun! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' },
                { id: 2, user: 'Inigo', userId: guide.data.user._id, dateTime: '01-01-2018', content: 'Hey! Lets have fun! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' }
            ];

            this.setState({ isLoading: false, tour: tour.data.tour, guide: guide.data.user, tourItinerary: itinerary, tourMessages: messages });
            console.log(this.state.tourMessages);
        } catch (e) {
            console.error('Error retrieving tours: ', e);
        }
    }

    render() {
        return (
            this.state.isLoading ? <div></div> :
                <div className="page-wrapper">
                    <LeftColumn title={this.state.tour.title} guideId={this.state.guide._id} guideName={this.state.guide.first_name} startDateTime={this.state.tour.start_date_time} />
                    <RightColumn tourDescription={this.state.tour.description} tourItinerary={this.state.tourItinerary} tourMessages={this.state.tourMessages} />
                </div>
        )
    }
}