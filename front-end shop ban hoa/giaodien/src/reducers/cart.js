import * as types from './../constants/ActionType';
// var data = JSON.parse(localStorage.getItem('CART'));
var data = JSON.parse(window.sessionStorage.getItem('CART'));

var inittialState = data ? data : [];
const cart = (state = inittialState, action) => {
    var { product, quantity } = action;
    var index = -1;
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].quantity += quantity
            }
            else {
                state.push({
                    product,
                    quantity
                })
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            window.sessionStorage.setItem('CART', JSON.stringify(state));
            
            return [...state];
        case types.DELETE_FROM_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state.splice(index, 1);
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            window.sessionStorage.setItem('CART', JSON.stringify(state));
            return [...state];
        case types.UPDATE_FROM_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].quantity = quantity
            }
            // localStorage.setItem('CART', JSON.stringify(state));
            window.sessionStorage.setItem('CART', JSON.stringify(state));
            return [...state];
        case types.CLEAR_CART:
            // localStorage.setItem('CART',null);
            window.sessionStorage.setItem('CART',null);
            state = [];
            return[...state]
        default: return [...state];
    }
}

var findProductInCart = (cart, product) => {
    var index = -1;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product._id === product._id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
export default cart;