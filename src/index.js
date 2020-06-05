import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider,useSelector} from "react-redux"
import {createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./Store/Reducers/rootReducer";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import {reduxFirestore,getFirestore} from "redux-firestore";
import {reactReduxFirebase,getFirebase} from "react-redux-firebase";
import fbConfig from "./Firebase/fbConfig"
import { ReactReduxFirebaseProvider,isLoaded} from 'react-redux-firebase'
import { createFirestoreInstance} from 'redux-firestore'
import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebaseReducer.auth)
    if (!isLoaded(auth)) return <div>splash screen...</div>;
    return children
}


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore,getFirebase})),
    reduxFirestore(fbConfig)
))

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render( <BrowserRouter>  <Provider store={store}>  <ReactReduxFirebaseProvider {...rrfProps}> <AuthIsLoaded> <App /> </AuthIsLoaded>   </ReactReduxFirebaseProvider>  </Provider>   </BrowserRouter>  , document.getElementById('root'));