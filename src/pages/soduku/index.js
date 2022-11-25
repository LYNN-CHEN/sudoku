import React, {useState, useEffect} from 'react'
import { Tabs, TabPane, Button } from '@douyinfe/semi-ui'
import Sudoku from '../../components/sudoku'
import moment, { Moment } from 'moment'

// async function getData

export default function SudokuPage() {
  useEffect(()=> {
    let ignore = false
    const fetchData = async() => {
      const res  = await fetch('https://sudokuserver.boxz.dev/api/getpaper/',{
        method:'GET',
        credentials: 'include',
        mode: 'cors'
      })
      if (!ignore) {
        console.log(res)
      }
    }
    fetchData()
    return () => {
      ignore = true;
    };
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '30px 80px',
        background: 'white',
        border: '3px solid black',
      }}
    >
      <Tabs type="line" tabPosition="left" style={{ width: '100%' }}>
        <TabPane tab="题目1" itemKey="1">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingLeft: '30px',
            }}
          >
            <Sudoku />
          </div>
        </TabPane>
        <TabPane tab="题目2" itemKey="2">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingLeft: '30px',
            }}
          >
            <Sudoku />
          </div>
        </TabPane>
      </Tabs>
      <Time />
    </div>
  )
}


function Time () {
  const [now, setNow] = useState(moment())  // 会返回当前状态的属性 和修改状态的方法

  useEffect(() => {  // 可以在函数组件内处理生命周期事件，默认情况，每次渲染都会调用该函数
    const t = setInterval(() => {
      setNow(moment())
    }, 1000)

    return () => {  // 每次卸载都执行此函数，清楚定时器
      clearTimeout(t)
    }
  }, [])

  return (
    <div>
      {/* <span>{ now.format('YYYY-MM-DD') }</span> */}
      <span>{ now.format('HH:mm:ss') }</span>
    </div>
  )
}