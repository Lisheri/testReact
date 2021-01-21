import React, { Component } from 'react'

// * 没有使用上下文的写法, 每一层都要把最上层传入的组件属性全量传下去

// * 先创建一个数据源, 供等一下使用
const store = {
    name: 'Dingding',
    form: 'Mo'
}

function Info(props) {
    return (
        <div>
            <p>姓名: {props.name}</p>
            <p>来自于: {props.form}</p>
        </div>
    )
}

function ToolBar(props) {
    return (
        <Info {...props}></Info>
    )
}

export default class Context1 extends Component {
    render() {
        return (
            <div>
                <ToolBar name={store.name} form={store.form}></ToolBar>
            </div>
        )
    }
}
