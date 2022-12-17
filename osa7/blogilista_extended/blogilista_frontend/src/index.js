import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

console.log('Store: ', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <App />
  </Provider>
)
