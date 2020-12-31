import axios from 'axios';
import { authType, categoryType } from './type';



export const addCategory = (form) => { 
    return async dispatch => {
        const token = localStorage.getItem('token');
        dispatch({ type: categoryType.ADD_NEW_CATEGORY_REQUEST })
        const res = await axios.post('http://localhost:2000/api/create/category', form, {
            headers: {
                'Authorization':token  ? `Bearer ${token}` : ''
            }
        })  
        const { category } = res.data;
        if (res.status == 201) { 
            dispatch({
                type: categoryType.ADD_NEW_CATEGORY_SUCCESS,
                 payload: {category}
            })
        }
    }
}