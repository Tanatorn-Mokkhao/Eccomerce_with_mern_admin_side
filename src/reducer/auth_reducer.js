import {authType} from '../action/type';

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture:''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: ''

}

export default (state = initState, action) => { 
    console.log(action)
    switch (action.type) { 
        case authType.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authType.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authType.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authType.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
    }
    return state;
}
