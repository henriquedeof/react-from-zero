import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';


/*
* The store must have at least one reducer function.
* In this case, the rootReducer (aggregator of reducers) has all the 'functions' and it is passed through the createStore() below.
*
*
* */

//Configuring Saga Middleware into the application
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

//Creating the Redux Store with all the reducers set on the rootReducer, which is the aggregator of reduces.
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;

//Redux configuration