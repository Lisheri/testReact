import React, {useState} from 'react'
import {Button} from 'antd'
import EffectStudy from './useEffect'

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
            <h3>使用useEffect</h3>
            {count < 0 ? "罗云大帝陨落" : <EffectStudy />}
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
