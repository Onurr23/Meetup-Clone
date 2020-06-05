import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteEvent, updateEvent} from "../Store/Actions/EventActions";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

class EditEvent extends Component {

    state = {

        name : this.props.location.state.event.name,
        pic : this.props.location.state.event.pic,
        desc : this.props.location.state.event.desc,
        date : this.props.location.state.event.date,
        location : this.props.location.state.event.location,
        owner : this.props.location.state.event.owner.id

    }

    changeHandler=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })

    }

   update=()=>{

       this.props.updateEvent(this.props.location.state.event.id,this.state);

       this.props.history.push('/');
    }
    delete=()=>{

        let allEvents = JSON.parse(JSON.stringify(this.props.location.state.event.owner.events));

        let newEvents = allEvents.filter(all=>{

          return all.name !== this.props.location.state.event.name

        })

        this.props.delete(this.props.location.state.event.id,newEvents);
        this.props.history.push('/');

    }


    render() {


        if(this.state.owner !== this.props.userId){

            return <Redirect to='/'/>

        }else if(!this.props.userId){

            return  <Redirect to='/signin'/>

        }

        return (
            <div>
                <input type="text" name='name' value={this.state.name} onChange={this.changeHandler} />
                <input type="text" name='pic' value={this.state.pic} onChange={this.changeHandler} />
                <input type="text" name='desc' value={this.state.desc} onChange={this.changeHandler} />
                <input type="date" name='date' value={this.state.date} onChange={this.changeHandler}/>
                <input type="text" name='location' value={this.state.location} onChange={this.changeHandler}/>
                <button className='join' onClick={this.update}>Güncelle</button>
                <button className='join' onClick={this.delete}>Etkinliği Sil</button>
            </div>
        );
    }
}
function mapStateToProps(state) {

    return{
        userId : state.firebaseReducer.auth.uid
    }
}
function mapDispatchToProps(dispatch) {
    return{
        updateEvent : (bindActionCreators(updateEvent,dispatch)),
        delete : bindActionCreators(deleteEvent,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditEvent);