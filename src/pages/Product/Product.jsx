import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import AddUpdate from './pages/AddUpdate'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={Home} exact></Route>
                <Route path='/product/detail' component={Detail}></Route>
                <Route path='/product/addupdate' component={AddUpdate}></Route>
                <Redirect to='/product' />
            </Switch>
        )
    }
}
