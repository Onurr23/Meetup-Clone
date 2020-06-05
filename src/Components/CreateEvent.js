import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators,compose} from "redux";
import {createEvent} from "../Store/Actions/EventActions";
import {firestoreConnect} from "react-redux-firebase";
import {Redirect} from "react-router-dom";

class CreateEvent extends Component {

    state = {

        name : null,
        pic : null,
        desc : null,
        date : null,
        location : null

    }

    changeHandler=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })

    }
    submitHandler=()=>{

        let allEvents = this.props.events;

        allEvents.push(this.state);

        this.props.create(this.state,allEvents);

        this.setState({
            name : null
        })

        this.setState({
            pic : null
        })

        this.setState({
            desc : null
        })

        this.setState({
            date : null
        })

        this.setState({
            location : null
        })

        this.props.history.push('/');


    }

    render() {

        if(!this.props.auth) return <Redirect to='/signin'/>

        return (
            <div>
                <input type="text" name='name' placeholder="Etkinlik Adını Giriniz" onChange={this.changeHandler} />
                <input type="text" name='pic' placeholder="Etkinlik Resminin URL'si" onChange={this.changeHandler} />
                <input type="text" name='desc' placeholder="Etkinlik Açıklaması" onChange={this.changeHandler} />
                <input type="date" name='date' placeholder="Etkinlik Tarihi" onChange={this.changeHandler}/>
                <input type="text" name='location' placeholder="Etkinlik Lokasyonu" onChange={this.changeHandler}/>

                <button onClick={this.submitHandler}>Etkinlik Oluştur</button>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return{
        auth : state.firebaseReducer.auth.uid,
        events : state.firebaseReducer.profile.events

    }
}
function mapDispatchToProps(dispatch) {

    return{

        create : bindActionCreators(createEvent,dispatch)

    }

}

export default compose(

    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection : 'users'}
    ]))(CreateEvent)


