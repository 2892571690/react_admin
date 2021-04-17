import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './NavLeft.less'
import logo from '../../assets/images/logo.png'
export default class NavLeft extends Component {
    render() {
        return (
            <div className="NavLeft_wrap">
                <Link to="/" className="NavLeft_header">
                    <div className="header_img">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className='header_title'>泽辰管理后台</div>
                </Link>
            </div>
        )
    }
}
