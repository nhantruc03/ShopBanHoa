import * as types from './../constants/ActionType';

export const actAddToCart = (product, quantity) => {
    return {
        type: types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actDeleteFromCart = (product) => {
    return {
        type: types.DELETE_FROM_CART,
        product
    }
}

export const actUpdateFromCart = (product, quantity) => {
    return {
        type: types.UPDATE_FROM_CART,
        product,
        quantity
    }
}

export const actClearCart = () => {
    return {
        type: types.CLEAR_CART
    }
}