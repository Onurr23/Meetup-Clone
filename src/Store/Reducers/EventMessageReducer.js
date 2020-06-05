import CentralStore from "./CentralStore";

export function EventMessageReducer(state = CentralStore.eventMessage,action) {

    if (action.payload === 'UPDATED') {

        return action.payload;

    } else if (action.payload === 'DELETED') {

        return action.payload;

    } else if (action.payload === 'EVENT_LEAVED') {

        return action.payload;

    } else if (action.type === 'SUCCESSFULL') {

        return action.payload;

    } else {
        return state


    }
}
export default EventMessageReducer;