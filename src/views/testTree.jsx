import { Tree, Input, Button } from 'antd';
import React, { isValidElement } from 'react';
import './index.css';
import Title from './title'

const originData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
]

const getNewTreeData = (data, vm) => {
    // * 初始化title节点
    return data.map(item => {
        item.title = (props) => (<Title
            title={vm.state.titleObj[props.key]}
            handleTitleChange={vm.handleTitleChange.bind(vm, props.key)}
            key={props.key}
        />)
        if (item.children && Array.isArray(item.children)) {
            item.children = getNewTreeData(item.children, vm)
        }
        return item
    })
}

class TestTree extends React.Component {
    state = {
        treeData: [],
        expandedKeys: ['0-0', '0-1', '0-2'],
        titleObj: {},
    };

    componentDidMount() {
        // * 初始化数据
        this.setState({
            treeData: getNewTreeData(originData, this),
            titleObj: this.getNewTitleObj(this, originData)
        }, () => {
            console.info(this.state.titleObj)
        })
    }

    handleTitleChange = (key, e) => {
        // * 子组件中触发更新title
        this.state.titleObj[key] = e.target.value;
        this.forceUpdate();
    }

    getNewTitleObj(vm, treeData, newVal = {}) {
        // * 初始化title对象
        treeData.forEach(item => {
            newVal[item.key] = item.key;
            if (item.children && Array.isArray(item.children)) {
                vm.getNewTitleObj(vm, item.children, newVal);
            }
        })
        return newVal;
    }

    render() {
        return <div>
            <Tree
                className="tree-node"
                defaultExpandedKeys={this.state.expandedKeys}
                // defaultExpandedAll
                blockNode
                treeData={this.state.treeData}
            />
        </div>
    }
}

export default TestTree;