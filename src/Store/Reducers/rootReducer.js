import {combineReducers} from "redux";
import eventReducer from "./EventReducer";
import authReducer from "./AuthReducer";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {EventMessageReducer} from "./EventMessageReducer";

const rootReducer = combineReducers({

    eventReducer,
    authReducer,
    firebaseReducer,
    firestoreReducer,
    EventMessageReducer


});

export default rootReducer;
