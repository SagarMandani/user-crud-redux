import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './src/Reducer'

const middleWare = [
    thunk
];
const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware)

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middleWare)
)

export default store;