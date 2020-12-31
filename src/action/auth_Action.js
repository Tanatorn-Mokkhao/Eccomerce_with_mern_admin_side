import {authType} from './type';
import axios from 'axios';

export const signin = (user) => { 
    return async dispatch => { 
        dispatch({ type: authType.LOGIN_REQUEST })
        console.log(user);
        const res = await axios.post('http://localhost:2000/api/admin/signin', user)
        if (res.status === 200) { 
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authType.LOGIN_SUCCESS,
                payload: { token, user }
            });
        } 



    }
}

export const isLogin = () => { 
    return async dispatch => { 
        const token = localStorage.getItem('token');
        if (token) { 
            const user = localStorage.getItem(JSON.stringify('user'));
            dispatch({
                type: authType.LOGIN_SUCCESS,
                payload: { token, user }
            });
        }
    }
}

export const userLoggout = () => { 
    return async dispatch => { 
        const token = localStorage.getItem('token');
        dispatch({ type: authType.LOGOUT_REQUEST });
        const res = await axios.post('http://localhost:2000/api/admin/signout', {}, {
            headers: {
                'Authorization':token ? `Bearer ${token}`: ''
            }
        });
        if (res.status == 200) { 
            localStorage.clear();
            dispatch({ type: authType.LOGOUT_SUCCESS });
        }
    }
}