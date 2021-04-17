import react from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store';
import {storeUser} from './redux/action/user_action';
import storageUtils from './utils/storageUtils';

const user = storageUtils.getStore('user') || {}
store.dispatch(storeUser(user))

ReactDOM.render( < App / > , document.getElementById("root"))

// eslint-disable-next-line no-lone-blocks
{/* 检测redux中状态的变化，只要变化，就调动render */}
store.subscribe(() => {
    ReactDOM.render( < App / > , document.getElementById('root'))
})