import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import categoryReducer from './category_reducer';
import productReducer from './product_reducer';
 const rootReduer = combineReducers({

    auth: authReducer,
    category: categoryReducer,
    product:productReducer

 });

 
export default rootReduer;