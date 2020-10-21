import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Configuration, Layout, useLayoutNavigation } from '@react-md/layout'
import CustomLayout from './Layout';

ReactDOM.render(
  <BrowserRouter>
    <Configuration>
      <CustomLayout />
    </Configuration>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
