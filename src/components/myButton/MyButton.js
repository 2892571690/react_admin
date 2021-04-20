import React, { Component } from 'react'
import { Button } from 'antd';
export default class MyButton extends Component {
    render() {
        return (
            <Button style={{padding:'0'}} type='link' {...this.props}></Button>
        )
    }
}
