import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDiS9VaSjh4AKYPyFumvtlj8rrNSNFXluw",
    authDomain: "meetup23-f0836.firebaseapp.com",
    databaseURL: "https://meetup23-f0836.firebaseio.com",
    projectId: "meetup23-f0836",
    storageBucket: "meetup23-f0836.appspot.com",
    messagingSenderId: "708297385554",
    appId: "1:708297385554:web:aa68d226ef1158a655a18b"
};

firebase.initializeApp(firebaseConfig);


export default firebase;