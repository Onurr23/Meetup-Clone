import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {leaveEvent} from "../Store/Actions/EventActions";
import {bindActionCreators} from "redux";
import {joinEvent} from "../Store/Actions/EventActions";
import moment from "moment";
import 'moment/locale/tr'
import {Link} from "react-router-dom";

class EventDetail extends Component {

    renderUser=()=>{

        let members = this.props.location.state.event.members;

        let newMembers =  members.filter(member=>{

            return member.id === this.props.id

        })
        return newMembers;
    }
    quitEvent=()=>{

        let members = this.props.location.state.event.members;

        let newMembers =  members.filter(member=>{

            return member.id !== this.props.id

        })

        let oldEvents = this.props.joined.filter(join=>{

            return join.id !== this.props.location.state.event.id

        })

        this.props.leave(this.props.id,this.props.location.state.event.id,newMembers,oldEvents);
        this.props.history.push('/');

    }

    join=()=>{

        let newMembers = JSON.parse(JSON.stringify(this.props.location.state.event.members));
        let user = JSON.parse(JSON.stringify(this.props.kullanici));

        let joined = this.props.joined;
        let event = this.props.location.state.event;

        joined.push(event);
        newMembers.push(user);

       this.props.join(this.props.location.state.event.id,newMembers,joined);
       this.props.history.push('/');

    }

    render() {

        if(this.props.user) return <Redirect to='/signin'/>
        let currentEvent = this.props.location.state.event;
        return (
            <div>
                <img src="" alt=""/>
                <p>{currentEvent.name}</p>
                <p> {moment(currentEvent.date).format('LLL') } </p>
                <p>{currentEvent.owner.name}</p>
                <p>Members</p>
                <p>Etkinlik Hakkında Merak Ettiklerinizi Etkinlik Sahibine Sorabilirsiniz</p> <Link to={{pathname : '/chat', state :{to :currentEvent.owner.id, from : this.props.id , name : currentEvent.kullanici }}} className='join'>Soru Sor</Link>
                {this.renderUser().length === 0 ?  <button className='join' onClick={this.join}>Katıl</button> : <button className='join' onClick={this.quitEvent}>Ayrıl</button>  }
            </div>
        );
    }
}
function mapStateToProps(state) {


    return{
        joined : state.firebaseReducer.profile.joined,
        user : state.firebaseReducer.profile.isEmpty,
        id : state.firebaseReducer.profile.id,
        kullanici : state.firebaseReducer.profile.name
    }
}

function mapDispatchToProps(dispatch) {

    return{
        leave : bindActionCreators(leaveEvent,dispatch),
        join : bindActionCreators(joinEvent,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventDetail);