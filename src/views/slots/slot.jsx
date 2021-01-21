// * 复合写法
// * 任何一个能用组件继承实现的用组件复合都可以实现, 所以可以放心的使用
// * 组件复合类似于Vue里面的插槽
// * 具体方式如下
import React from 'react';
import { Button } from 'antd'

function XdDialog(props) {
    return (
        <div style={{ border: `4px solid ${props.color || "blue"}` }}>
            {/* 等同于Vue的匿名插槽, 默认就是children */}
            {props.children}
            {/* 等同于Vue的具名插槽, props中的方法名字叫fotter, 返回一段jsx*/}
            <div className="abc">{props.fotter}</div>
        </div>
    )
}

function Slot() {
    const confirBtn = (props) => {
        const handleClickBtn = (props) => {
            console.info(props.go || "123123")
        }

        return (
            <Button onClick={handleClickBtn.bind(this, props)}>好玩吗</Button>
        )
    }

    const obj = {
        go: "冲起来"
    }

    return (
        <XdDialog color="#ccc" fotter={confirBtn(obj)}>
            <h1>欢迎您</h1>
            <p>欢迎您过来学习React入门视频</p>
        </XdDialog>
    )
}
export default Slot;