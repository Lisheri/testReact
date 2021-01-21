<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
# 冲冲冲

## eventBus
```
class EventBus {
    constructor() {
        this.events = this.events || new Object();
    }
    $emit(type, ...args) {
        let e;
        e = this.events[type];
        // 查看这个type的event有多少个回调函数，如果有多个需要依次调用。
        if (Array.isArray(e)) {
            for (let i = 0; i < e.length; i++) {
                e[i].apply(this, args);
            }
        } else {
            e[0].apply(this, args);
        }
    }
    $on(type, fun) {
        const e = this.events[type];

        if (!e) {   //如果从未注册过监听函数，则将函数放入数组存入对应的键名下
            this.events[type] = [fun];
        } else {  //如果注册过，则直接放入
            e.push(fun);
        }
    }
}
const eventBus = new EventBus();
export default eventBus;
```

### 生命周期
+ componentWillMount 组件将要挂载
    - 可以进行api调用，可以获取数据，但是dom没有挂载，获取不到dom
+ componentDidMount 组件已经挂载
    - 组件已经挂载，可以对状态更新操作，可以操作dom
+ componentWillReceiveProps 父组件传递的属性有变化，做相应响应
    - 父组件传递的props发生变化时调用
+ shouldComponentUpdate 组件是否需要更新, 传递boolean值, 优化点
    - 组件是否需要更新，需要返回一个boolean，返回false则不更新
+ componentWillUpdate 组件将要更新
+ componentDidUpdate 组件已经更新
+ componentWillUnmount 组件已经销毁

### react.memo

### 组建复合
+ 复合写法
    - 任何一个能用组件继承实现的用组件复合都可以实现, 所以可以放心的使用
    - 组件复合类似于Vue里面的插槽
+ props为父组件传给儿子的数据
    - 其中props.children就是类似于vue匿名插槽的预留位置
    - 带有名字的函数并且返回一个jsx标签的就类似于vue的具名插槽
### 高阶组件
+ 高阶组件-HOC
+ 高阶组件是为了提高组件的复用率而出现的, 抽离出具有相同逻辑或相同展示的组件
+ 高阶组件其实是一个函数, 接收一个组件, 然后返回一个新的组件, 返回的这个新的组件可以对属性进行包装, 也可以重写部分生命周期
+ 高阶组件一般都是with开头, 传递一个组件进去, 返回一个新的组件

#### 高阶组件的链式调用
+ 使用情况如下
    - 编写一个高阶组件进行属性的添加
    - 编写一个高阶组件编写生命周期
    - 然后将以上两个高阶组件进行链式调用
+ 组建通信的上下文(context)
    - 上下文context有两个角色(类似于Vue的组件交流方式之一的Provide/Inject)
        + Provider 数据提供
        + Consumer 数据读取
    - 使用context可以避免通过中间元素传递props, context的设计目的就是为了共享对于一个组件树而言是"全局"的数据

##### 不使用上下文的情况
```
import React, { Component } from 'react'

// * 没有使用上下文的写法, 每一层都要把最上层传入的组件属性全量传下去

// * 先创建一个数据源, 供等一下使用
let store = {
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

```

##### 使用上下文的情况
```
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

```

## React Hooks

### Hooks可以我们在不编写class的情况下使用state以及其他的React特性
### Hook 不会影响我们对React概念的理解, 恰恰相反, Hook 为已知的React概念提供了更直接的API: props, state, context, refs 以及生命周期。同时Hooks还以更强大的方式来组合他们。

### React Hooks解决了什么问题?
+ 函数式组件不能使用state, 一般只能用于一些简单无交互的组件, 用作信息展示, 即我们上面说的傻瓜组件使用. 如果需要交互更改状态等复杂逻辑时就需要使用class组件了。 但是React Hooks 让我们更好的拥抱函数式编程, 让函数式组件也可以使用state功能, 因为函数式组件比class组件更简洁好用, 因为 React Hooks的出现, 相信未来我们会更多的使用函数式组件
+ 副作用问题
    - 一般称数据获取、 订阅、 定时执行任务、 手动修改ReactDOM 这些行为都可以称为副作用
    - 由于React Hooks的出现, 我们可以使用useEffect来处理副作用问题, 所以我们的函数式组件也能进行副作用逻辑的处理了
+ 有状态的逻辑重用组件
+ 复杂的状态管理
    - 之前使用Redux, dva, mobx第三方状态管理器来进行复杂的状态管理
    - 现在我们可以使用useReducer、 useContext配合使用实现复杂的状态管理, 不用再依赖第三方状态管理器
+ 开发效率和质量问题
    - 函数式组件比class组件简洁, 开发体验更好, 效率更高同时应用的性能也更好

### 新特性useState
+ useState -- 组件状态管理钩子
    - useState能使函数组件能够使用state
+ 基本使用如下所示
    ```
    const [state, setState] = useState(initState)
    ```
    - state 是要设置的状态
    -  setState 是更新state的方法, 只是一个方法名, 可以随意更改
    - initState 是初始状态的state, 可以是随意的数据类型, 也可以是回调函数, 但是函数必须是有返回值
#### 完整使用 useState 如下所示
```
import React, {useState} from 'react'
import {Button} from 'antd'

const UseStateComp = () => {
    const [count, setCount] = useState(0)
    const [name] = useState('罗云大帝')

    const handleClick = (brand = '+') => {
        brand === '+' ? setCount(count + 1) : setCount(count - 1)
        // React.Component.prototype.forceUpdate();
    }
    return (
        <div>
            <p>{name}</p>
            <div>你点击了{count}次</div>
            <Button onClick={handleClick.bind(this, "+")}>我点+1</Button>
            <Button onClick={handleClick.bind(this, '-')}>我点-1</Button>
        </div>
    )
}
export default function index() {
    return (
        <div>
            <p>Hooks</p>
            <UseStateComp/>
        </div>
    )
}

```

### 新特性useEffect
+ useEffect --副作用处理钩子
    - 数据获取、 订阅、定时执行任务、 手动修改ReactDOM这些行为都可以称为副作用。而useEffect就是为了处理这些副作用而生的。
    - useEffect也是componentDidMount、componentDidUpdate和componentWillUnmount这几个生命周期方法的统一

#### 基本使用如下
```
useEffect(callback, array)
```

+ callback回调函数, 作用是处理副作用逻辑
    - callback可以返回一个函数, 用作清理
    ```
    useEffect(() => {
        // 副作用处理逻辑
        return () => {
            // 清理副作用需要清理的内容
            //  类似于componentWillUnmount, 组件渲染和组件卸载前执行的代码
        }
    }, [])
    ```
    - array(可选参数): 数组, 用于控制useEffect的执行
    - 分三种情况
        + 空数组, 则只会执行一次(即初始化渲染render), 相当于componentDidMount
        + 非空数组, useEffect会在数组发生改变后执行
        + 不填array这个数组, useEffect每次渲染都会执行

+ 完整例子如下所示
```
import React, {useState, useEffect} from 'react'
import {Button} from 'antd'

export default function EffectStudy() {
    const [count, setState] = useState(0);
    const [name, setName] = useState('罗云大帝');
    useEffect(() => {
        // * 处理副作用逻辑
        // alert('触发你妈卖批')
        if (count >= 80) {
            setName('罗圣')
        } else if (count >= 50) {
            setName('罗云仙帝')
        } else if (count >= 20) {
            setName('罗天圣帝')
        }
        // * useEffect第一个参数, 当第二参数的数组为空数组或数组中是一个常量的时候, 只会在组件卸载的时候执行
        return () => {
            console.info('组件卸载')
        }
    }, [count])
    // * 这个数组中的内容如果是一个常量和非空数组效果一样, 只会执行一次, 但是如果传入一个变量, 当这个变量改变时, 他就会触发
    const handleClick = () => {
        setState(count + 1);
    }
    return (
        <div>
            <p>{`${name} ${count}`}</p>
            <Button onClick={handleClick}>罗云进阶</Button>
        </div>
    )
}

```