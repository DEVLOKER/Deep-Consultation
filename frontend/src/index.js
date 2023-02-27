
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'App'
// import * as serviceWorker from './serviceWorker'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import GlobalStyle from 'styles/GlobalStyle'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();
