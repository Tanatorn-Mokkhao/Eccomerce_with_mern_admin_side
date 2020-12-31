import axios from 'axios';
import { productType } from '../action/type';



export const addProduct = (form,categoryname) => { 
    return async dispatch => { 
        dispatch({ type: productType.ADD_NEW_PRODUCT_REQUEST });
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:2000/api/product/create', form, {
            headers: {
                'Authorization' : token ? `Bearer ${token}` : ''
            }

        })
        if (res.status == 201) { 
            console.log(res.data)
            dispatch({
                type: productType.ADD_NEW_PRODUCT_SUCCESS,
                payload: { product :res.data,categoryname:categoryname}
            })
        }
    }
}