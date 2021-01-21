import React from 'react'
import Context1 from './context1'
import Context2 from './context2'
// * 高阶组件-HOC
// * 高阶组件是为了提高组件的复用率而出现的, 抽离出具有相同逻辑或相同展示的组件
// * 高阶组件其实是一个函数, 接收一个组件, 然后返回一个新的组件, 返回的这个新的组件可以对属性进行包装, 也可以重写部分生命周期

// ! 编写第一个高阶组件, 传递一个组件进去, 返回一个新的组件
const withLearnReact = (Component) => {
    const newComponent = (props) => {
        return (<Component {...props} name="欢迎大家来学习React, React真好玩">{props.title}</Component>)
    }
    return newComponent
}

function HOC(props) {
    return (
        <div>
            <h1>感受一下高阶组件</h1>
            {props.me}
            <p>描述: {props.name}</p>
            <div>
                <p style={{fontWeight: '900', fontSize: '24px'}}>演示上下文的使用</p>
                <h3>不使用上下文</h3>
                <Context1/>
                <h3>使用上下文context</h3>
                <Context2/>
            </div>
        </div>
    )
}
// * 编写第二个高阶组件, 重写生命周期, 注意, 重写生命周期需要class组件(返回的是class组件)

const widthLifeCycle = Comp => {
    class NewComponent extends React.Component {
        constructor(props) {
            super(props)
        }
        // * 重写组件的生命周期
        componentDidMount() {
            console.info("重写componentDidMount生命周期")
        }
        render() {
            return (<Comp {...this.props}></Comp>)
        }
    }
    return NewComponent;
}
export default widthLifeCycle(withLearnReact(HOC));
