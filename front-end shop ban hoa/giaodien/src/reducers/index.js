import {combineReducers} from 'redux';
import products from './product';
import cart from './cart';

const appReducers = combineReducers({
    products,
    cart
    
})

export default appReducers;