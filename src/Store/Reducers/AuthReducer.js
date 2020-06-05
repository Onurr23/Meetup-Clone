import CentralStore from "./CentralStore";

export function authReducer(state=CentralStore.message,action) {

    if(action.type === 'SIGNED_IN' || action.type === 'SIGNED_UP' || action.type === 'ERROR' || action.type === 'SIGNED_OUT'){

        return action.payload;

    }else{

        return state

    }
}

export default authReducer;