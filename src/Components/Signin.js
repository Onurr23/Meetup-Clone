import React, {Component} from 'react';
import {connect} from "react-redux";
import * as AuthActions from "../Store/Actions/AuthActions";
import {bindActionCreators} from "redux";
import { Redirect } from "react-router-dom";

class Signin extends Component {

    state = {

        email : null,
        password : null

    }

    changeHandler=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })

    }

    submitHandler=()=>{

        this.props.signin(this.state);

    }

    render() {

        if(this.props.uid) return <Redirect to='/' />

        return (
            <div>
                <input type="email" name='email' placeholder="Email Adresinizi Giriniz" onChange={this.changeHandler}/>
                <input type="password" name='password' placeholder="Şifrenizi Giriniz" onChange={this.changeHandler}/>
                <button onClick={this.submitHandler}>Giriş Yap</button>
                {this.props.authReducer !== "" ? <div>{this.props.auth}</div> : null}
            </div>
        );
    }
}

function mapStateToProps(state) {

    return{
        auth : state.authReducer,
        uid : state.firebaseReducer.auth.uid
    }
}
function mapDispatchToProps(dispatch) {

    return{
        signin : bindActionCreators(AuthActions.signin,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signin);