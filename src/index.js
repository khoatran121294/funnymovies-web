import 'babel-polyfill';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ReduxToastr from 'react-redux-toastr';
import Router from './views/Router';
import Root from './Root';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.scss';

ReactDOM.render(
  <Root>
    <Fragment>
      <Router />
      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Fragment>
  </Root>,
  document.getElementById('root')
);
