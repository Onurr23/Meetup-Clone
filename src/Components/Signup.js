import React, {Component} from 'react';
import {connect} from "react-redux";
import * as AuthActions from "../Store/Actions/AuthActions";
import {bindActionCreators} from "redux";
import { Redirect } from "react-router-dom";

class Signin extends Component {

    state = {

        email : null,
        password : null,
        name : null,
        birthday : null,
        bio : null

    }

    changeHandler=(e)=>{

        this.setState({
            [e.target.name] : e.target.value
        })

    }

    submitHandler=()=>{

        this.props.signup(this.state);

    }

    render() {

        if(this.props.uid) return <Redirect to='/' />

        return (
            <div>

                <input type="email" name='email' placeholder="Email Adresinizi Giriniz" onChange={this.changeHandler}/>
                <input type="password" name='password' placeholder="Şifrenizi Giriniz" onChange={this.changeHandler}/>
                <input type="text" name='name' placeholder="Adınızı Giriniz" onChange={this.changeHandler}/>
                <input type="date" name='birthday' placeholder="Doğum Tarihinizi Giriniz" onChange={this.changeHandler}/>
                <textarea name='bio' placeholder='Hakınızda bir şeyler yazabilirsiniz' onChange={this.changeHandler} />

                <button onClick={this.submitHandler}>Kayıt Ol</button>
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

        signup : bindActionCreators(AuthActions.signup,dispatch)

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signin);