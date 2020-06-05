import {getFirebase} from "react-redux-firebase";

export function createEvent(event,events) {

    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore = getFirestore();
        let uid = getState().firebaseReducer.auth.uid;
        let user = getState().firebaseReducer.profile;

        firestore.collection('events').add({

            name : event.name,
            pic : event.pic,
            desc : event.desc,
            date : event.date,
            location : event.location,
            owner : user,
            members : []

        }).then((response)=>{

            return firestore.collection('users').doc(uid).update({

                events : events

            })

        }).then(response=>{

            dispatch({type : 'CREATED', payload : 'SUCCESSFULL'})

        })

    }
}

export function joinEvent(id,members,joined) {

    return(dispatch,getState,{getFirestore})=>{

        const firestore = getFirestore();
        const user = getState().firebaseReducer.auth.uid;

        firestore.collection('events').doc(id).update({

            members : members

        }).then(response=>{

            console.log(joined);

           return firestore.collection('users').doc(user).update({

                joined
            })

        }).then((response)=>{

            dispatch({type : 'JOINED', payload: members})

        })
    }

}

export function deleteEvent(id,events) {

   return(dispatch,getState,{getFirestore})=>{

        const firestore = getFirestore();
        const user = getState().firebaseReducer.auth.uid;

        firestore.collection('events').doc(id).delete().then(()=>{

            return firestore.collection('users').doc(user).update({

                events : events

            })

        }).then(()=>{

            dispatch({type : 'DELETED',payload : 'EVENT_DELETED'})

        })

    }



}

export function updateEvent(id,event) {

    return(dispatch,getState,{getFirestore})=>{

        const firestore = getFirestore();

        firestore.collection('events').doc(id).update({

            name : event.name,
            date : event.date,
            location : event.location,
            desc : event.desc

        }).then(response=>{

            dispatch({type : 'UPDATED',payload : 'EVENT_UPDATED'})

        })

    }

}

export function leaveEvent(user,id,members,joined) {

    return(dispatch,getState,{getFirestore,getFirebase})=>{

        const firestore = getFirestore();
        const firebase = getFirebase();

        firestore.collection('users').doc(user).update({

            joined : joined

        }).then(()=>{

            return firestore.collection('events').doc(id).update({

                members : members

            })

        }).then(()=>{

            dispatch({type :'LEAVED',payload : 'EVENT_LEAVED'})

        })

    }

}

export default {createEvent,joinEvent,deleteEvent,updateEvent,leaveEvent};