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
