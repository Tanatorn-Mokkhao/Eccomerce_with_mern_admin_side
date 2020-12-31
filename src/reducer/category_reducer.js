import { categoryType } from '../action/type';



const initialState = {
    category: [],
    loading: false,
    error:''
}
const buildNewCategories = (parentId,categories, category) => { 
    let myCategories = [];
    if (parentId==undefined) { 
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children:[]
            }

        ];
    }
    for (let cat of categories) { 
        if (cat._id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children  ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug:category.slug,
                    parentId: category.parentId,
                    children:category.children
                }], category) : []
            });
        } else { 
            myCategories.push({
                ...cat,
                children: cat.children  ? buildNewCategories(parentId,cat.children, category) : []
            });
        }
   
    }
    return myCategories;
}



export default (state = initialState, action) => { 
    switch (action.type) { 
        case categoryType.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                category: action.payload.category,
                loading: false
            }
            break;
        case categoryType.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryType.ADD_NEW_CATEGORY_SUCCESS:
             const updateCategory = buildNewCategories(action.payload.category.parentId,state.category, action.payload.category)
            state = {
                ...state,
                loading: false,
                category:updateCategory
            }
            break;
    }
    return state;
}