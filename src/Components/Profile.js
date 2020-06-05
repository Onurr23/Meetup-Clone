import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as AuthActions from "../Store/Actions/AuthActions";
import {Redirect} from "react-router-dom";

class Profile extends Component {


    render() {

        if(!this.props.userId) return <Redirect to='/signin'/>

        let profile = this.props.profile;

        return (
            <div>
                Name : {profile.name}
                Events :
                Bio : {profile.bio}
                Birthday :
                Joined :
                <button onClick={this.props.cikis} className='join'> Çıkış Yap </button>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return{
        profile : state.firebaseReducer.profile,
        userId : state.firebaseReducer.auth.uid
    }
}
function mapDispatchToProps(dispatch) {

    return{

        cikis : bindActionCreators(AuthActions.signout,dispatch)

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);