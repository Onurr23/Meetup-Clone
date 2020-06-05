export function signin(user) {

  return(dispatch,getState,{getFirebase})=>{

      const firebase = getFirebase();

      firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(response=>{

          dispatch({type : 'SIGNED_IN',payload : 'GİRİŞ_BAŞARILI'})

      }).catch(err=>{

          dispatch({type : 'ERROR',payload : err.message})

      })
  }
}

export function signup(kimlik) {

    return(dispatch,getState,{getFirebase,getFirestore})=>{

        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(kimlik.email,kimlik.password).then((response)=>{

            return firestore.collection('users').doc(response.user.uid).set({

                name : kimlik.name,
                bio : kimlik.bio,
                email : kimlik.email,
                id : response.user.uid,
                birthday : response.user.birthday,
                events : [],
                joined : [],
                messages : []


            })

        }).then(()=>{

            dispatch({type : 'SIGN_UP_SUCCESS',message : 'KAYIT BAŞARILI'})

        }).catch(err=>{

            console.log(err);

            dispatch({type : 'ERROR',payload : err.message})

        })

    }
}

export function signout() {

    return(dispatch,getState,{getFirebase})=>{

        const firebase = getFirebase();

        firebase.auth().signOut().then(()=>{

            dispatch({type :'SIGN_OUT'})

        })

    }

}

export default {signin,signup,signout};