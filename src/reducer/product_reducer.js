import { productType } from '../action/type';



const initialState = {
    loading: false,
    product: []
}
const updateProduct = (newproduct, productlist,categoryname) => {
      productlist.push({
        _id: newproduct.product._id,
        name: newproduct.product.name,
        price: newproduct.product.price,
        quantity: newproduct.product.quantity,
        description: newproduct.product.description,
        productPictures: newproduct.product.productPictures,
          category: { name:categoryname }
    })
    return productlist;

}

export default (state = initialState, action) => { 
    switch (action.type) { 
        case productType.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                product: action.payload.product
            }
            break;
        case productType.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
      
            break;
        case productType.ADD_NEW_PRODUCT_SUCCESS:
            const updateproductlist = updateProduct(action.payload.product,state.product,action.payload.categoryname)
            state = {
                ...state,
                product: updateproductlist
                
            }
            break;
    }
    return state;
}