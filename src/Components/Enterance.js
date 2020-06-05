import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/tr'
class Enterance extends Component {

    render() {

        moment.locale('tr');

        if(!this.props.uid) return <Redirect to='/signin' />;

        let events = this.props.events;

        return (
            <div>
                <div className="banner">

                    <h1 className='banner-text'>Discover</h1>

                </div>

                <div className="container">

                    <div className="events">

                        <div className="event-text">

                            <p>Yakındaki Etkinlikler</p>
                            <p>Yerinizden kalkın ve sosyalleşin.</p>

                        </div>

                        <div className="events-full">
                            {
                              events.map(event=>(
                                  <Link key={event.name} to={{pathname :'/details',search : event.id,state:{event : event} }} className="event">
                                      <p className="event-date">{moment(event.date,"YYYYMMDD").fromNow()}</p>
                                      <p className='event-name'>{event.name}</p>
                                      <p className='event-owner'>{event.owner.name}</p>
                                      <p className='event-location'>{event.location}</p>
                                      {this.props.uid === event.owner.id ? <Link to={{pathname :'/edit',search : event.id,state:{event : event} }}><a className='join'>Düzenle</a>  </Link> :  null }
                                  </Link>
                              ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {


    return{
        events : state.firestoreReducer.ordered.events || state.eventReducer,
        uid : state.firebaseReducer.auth.uid
    }
}
export default compose(connect(mapStateToProps),
    firestoreConnect([
        {collection : 'events'}
    ]))(Enterance)