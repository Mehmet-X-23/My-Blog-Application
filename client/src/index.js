import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk  from "redux-thunk";
import App from './App';
import { rootReducer } from "./reducers/rootReducer";
import {fetchPosts} from  "./actions/post";

import './index.css';



const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}

export const store = createStore(rootReducer, persistedState , applyMiddleware(thunk))

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps,{fetchPosts})(App);


