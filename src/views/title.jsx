import { Tree, Input, Button } from 'antd';
import React from 'react';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }
    handleClick = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    render() {
        return (<div style={{ textAlign: 'left' }}>
            {!this.state.isEdit ? <span style={{ width: '100px' }}>{this.props.title}</span> : <Input style={{ width: '100px' }} value={this.props.title} onChange={this.props.handleTitleChange} />}
            <Button onClick={this.handleClick}>{this.state.isEdit ? '确认' : '修改'}</Button>
        </div >)
    }
}

export default Title;