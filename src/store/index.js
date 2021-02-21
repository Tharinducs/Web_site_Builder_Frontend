import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

// register middlewares
const middleware = applyMiddleware(reduxThunk);
// create enhancer
//const enhancer = compose(middleware, (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// create store
//const store = createStore(reducers, enhancer);
const store = createStore(reducers, middleware);

export default store;