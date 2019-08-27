import {
    AUTHENTICATE,
    DEAUTHENTICATE
} from '../types';
import {
    AnyAction
} from 'redux';

const initialState: any = {
    token: null
};

export default (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.payload
            };
        case DEAUTHENTICATE:
            return {
                token: null
            };
        default:
            return state;
    }
};