import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";


class Navi extends Component {

    renderUser=()=>{

        return(
            <div className='nav-container'>
                <NavLink className='nav-menu-item' to='/signin'><a href=""> Giriş Yap </a> </NavLink>
                <NavLink className='nav-menu-item' to='/signup'><a href="">Kayıt Ol</a> </NavLink>

            </div>
        )

    }
    renderEmpty=()=>{

        return(
            <div className='nav-container'>
                <NavLink className='nav-menu-item' to='/create'>Yeni Etkinlik </NavLink>
                <NavLink className='nav-menu-item' to='/profile'>Profil </NavLink>
            </div>
        )
    }

    render() {
        return (
            <div>

                <div className='nav'>

                    <div className="logo">
                        <NavLink to='/'>GetOffYourSeat</NavLink>
                    </div>
                    <div className="menu">
                        <ul className='nav-menu'>
                            {!this.props.uid ? this.renderUser():this.renderEmpty()}
                        </ul>
                    </div>


                </div>

            </div>
        );
    }
}
function mapStateToProps(state) {

    return{

        uid : state.firebaseReducer.auth.uid

    }

}
export default connect(mapStateToProps)(Navi);