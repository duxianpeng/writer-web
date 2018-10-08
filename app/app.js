import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import './styles/main.css'
import {DatePicker} from 'antd'

const store = createStore(commentsReducer)

ReactDOM.render(
  //<Provider store={store}>
  //  <CommentApp/>
  //</Provider>,
  <DatePicker/>,
  document.getElementById('app')
)