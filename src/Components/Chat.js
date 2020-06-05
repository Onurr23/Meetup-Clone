import React, {Component} from 'react';
import {connect} from "react-redux";
import {sendMessage} from "../Store/Actions/ChatActions";
import {bindActionCreators} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";


class Chat extends Component {

    state = {

        message : null

    }
    componentDidMount() {
        console.log(this.props)
    }
    changeHandler=(event)=>{

        this.setState({
            [event.target.name] : event.target.value
        })

    }

    send=()=>{

        let oldies = this.props.userMessages;


        let newMessage = {

            to : this.props.location.state.to,
            from : this.props.location.state.from,
            message : this.state.message,
            date : new Date(),
            name :  this.props.location.state.name

        }

        oldies.push(newMessage);

        this.props.message(oldies,this.props.location.state.to)

        this.setState({
            message : null
        })

    }

    render() {

        let messages = this.props.userMessages

        return (
            <div>
                <div className='message-container'>

                    {

                        messages.map(mes=>(
                            <p>{mes.name} - {mes.message}</p>
                        ))

                    }



                </div>

                <input type="text" name='message' onChange={this.changeHandler} placeholder='Mesajınızı Giriniz'/>
                <button className='join' onClick={this.send}>Gönder</button>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return{

        id : state.firestoreReducer.ordered.users || state.eventReducer,
        userMessages : state.firebaseReducer.profile.messages || state.eventReducer

    }
}

function mapDispatchToProps(dispatch) {

    return{

        message : bindActionCreators(sendMessage,dispatch)

    }

}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect((props)=>
    [{collection : 'users',where : ['id','==',props.location.state.from]}]))(Chat)