
import axios from 'axios';
// import Category from '../container/category/category';

import { categoryType } from './type';
import { productType } from './type';


export const initialData = () => { 
    return async dispatch => { 

        const res = await axios.post('http://localhost:2000/api/initialdata');
        const{ category, product } = res.data;
       
        if (res.status === 200) {
            dispatch({
                type: categoryType.GET_ALL_CATEGORY_SUCCESS,
                payload:{category}
            })
            dispatch({
                type: productType.GET_ALL_PRODUCT_SUCCESS,
                payload: {product}
            })


        }
    }
    
}



