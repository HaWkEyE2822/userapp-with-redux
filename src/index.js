import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Routing from './routes/routes';
import { createLogger } from 'redux-logger';

const logger = createLogger();


const createStoreWithMiddleware = applyMiddleware(ReduxThunk, logger)(createStore)(rootReducer);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware}>
        <Routing />
    </Provider>,
    document.getElementById('root')
)