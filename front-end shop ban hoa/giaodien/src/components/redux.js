import Product from './../reducers/reducer_product';
var redux = require('redux');

const allReducer = redux.combineReducers({
    Product: Product
})

var store1 = redux.createStore(allReducer);

store1.dispatch({
    type:"LIST"
})

export default store1;