import { createStore, applyMiddleware, compose} from 'redux'
//import { composeWithDevTools } from 'remote-redux-devtools';
import { authReducer } from './reducer/authReducer'
import thunk from 'redux-thunk';


let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(authReducer, 
    composeEnhancers(applyMiddleware(thunk)));

export {store}