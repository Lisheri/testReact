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