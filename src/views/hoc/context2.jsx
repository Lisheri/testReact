import React, { Component } from 'react'

// * 使用上下文context的组件

const store = {
    name: 'Dingding',
    form: 'Mo'
}

// * 创建上下文
const XdContext = React.createContext();

const { Provider, Consumer } = XdContext;
function Info(props) {
    return (
        <div>
            <Consumer>
                {
                    storeInner => <div className="wodet">
                        <p>姓名: {storeInner.name}</p>
                        <p>来自于: {storeInner.form}</p>
                    </div>
                }
            </Consumer>
        </div>
    )
}

function ToolBar(props) {
    return (
        <Info></Info>
    )
}

export default class context2 extends Component {
    render() {
        return (
            <div>
                <Provider value={store}>
                    <ToolBar></ToolBar>
                </Provider>
            </div>
        )
    }
}
