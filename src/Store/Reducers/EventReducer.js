import CentralStore from "./CentralStore";

export function eventReducer(state = CentralStore.events, action) {

    if(action.type === 'CREATED'){

        return action.payload

    }else if(action.type === 'JOINED'){

        return action.payload;

    }else{

        return state;

    }

}

export default eventReducer;