import {SET_JOB_DATA} from '../actionTypes'

const initialState = null;

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOB_DATA: {
            return action.payload
        }
        default: {
            return state;
        }
    }
};

export default jobReducer;