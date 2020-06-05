export function sendMessage(message,id) {

    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firestore = getFirestore();
        const user = getState().firebaseReducer.profile.id

        firestore.collection('users').doc(user).update({

            messages : message

        }).then(()=>{

            return firestore.collection('users').doc(id).update({

                messages : message

            })

        }).then(()=>{

            dispatch({type : 'MESSAGE_SENT',payload : 'SUCCESSFULL'})

        })

    }

}

export default sendMessage;