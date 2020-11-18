import {combineReducers} from 'redux';

import reserve from "./reserve/reducer";

//Reducer aggregator. Any other reducer I create I must add here. It will be passed to the store to be inserted.
export default combineReducers({
    reserve
});