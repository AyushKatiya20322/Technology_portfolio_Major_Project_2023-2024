import React from 'react';
import  ReactDOM  from 'react-dom/client';
import App from './app.js';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import {AnimatePresence} from "framer-motion";


import {createStore} from 'redux'
import {Provider} from "react-redux";
import myReducers from './context/reducers/index.js';
const myStore= createStore(myReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



 export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        
        <Router>
            <AnimatePresence>
                <Provider store={myStore}>
                <App />
                </Provider>
            </AnimatePresence>
        </Router>
        
    
    </React.StrictMode>
); 