import React, { useState, useEffect } from 'react'
import { Tabs, TabPane, Button, Popconfirm, Spin  } from '@douyinfe/semi-ui'
import Sudoku from '../../components/sudoku'
import moment, { Moment } from 'moment'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function SudokuPage() {
  let navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [notArrive, setNotArrive] = useState(true)
  const [question1, setQuestion1] = useState("")
  // const [question2, setQuestion2] = useState("")
  const [answer1, setAnswer1] = useState(question1)
  // const [answer2, setAnswer2] = useState(question2)
  const [now, setNow] = useState(moment()) // 会返回当前状态的属性 和修改状态的方法
  const [submit, setSubmit] = useState(false)
  
  const onConfirm = () => {
    setLoading(true)
    console.log('a1', answer1)
    // console.log('a2', answer2)
    let data=new FormData()
    data.append('paper1',answer1)
    // data.append('paper2',answer2)
    console.log(data)
    fetch('https://sudokuserver.boxz.dev/api/submitpaper/', {
      method: 'POST',
      // credentials: 'include',
      body: data
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        setSubmit(true)
        navigate('/submitted')
      } else {
        setSubmit(false)
        setLoading(false)
        console.log('wrong')
      }
    }).catch((err) => {
      setSubmit(false)
      setLoading(false)
      console.log(err)
    })
  }

  // fetchData
  useEffect(() => {
    let ignore = false
    const fetchData = async() => {
      const res  = await fetch('https://sudokuserver.boxz.dev/api/getpaper/',{
        method:'GET',
        credentials: 'include',
        mode: 'cors'
      })
      if (!ignore) {
        try{
          const jsonRes = await res.json()
          setQuestion1(jsonRes.data.paper1.content)
          // setQuestion2(jsonRes.data.paper2.content)
          
        } catch(e) {
          alert(e)
        }
      }
      console.log("q1\n", question1)
      // console.log("q2\n", question2)
    }
    fetchData()
    setLoading(false)
    return () => {
      ignore = true;
    };
  }, [])

  // 定时器函数
  useEffect(() => {
    const t = setInterval(() => {
      setNow(moment())
      // 未到答题时间：需改成开始时间
      if (moment().unix() >= 1669396400) {
        setNotArrive(false)
      }
    }, 1000)
    return () => {
      clearTimeout(t)
    }
  }, [])

  if (notArrive) {
    return <p>未到答题时间</p>
  }

  // 自动提交函数：需改成提交时间
  if (now.unix() >= 2669396800 && !submit) {
    setSubmit(true)
    console.log('auto')
    onConfirm()
    // setLoading(true)
  }
  
  if (loading) {
    return (
      <div style={{marginTop: '30px'}}>
        <Spin className='custom' size="large" />
      </div>
    );
  }
  

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
            <Sudoku puzzle={question1} setAnswer={setAnswer1} />
          </div>
        </TabPane>
        {/* <TabPane tab="题目2" itemKey="2">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingLeft: '30px',
            }}
          >
            <Sudoku puzzle={question2} setAnswer={setAnswer2} />
          </div>
        </TabPane> */}
      </Tabs>
      <div className="right-sider">
        <div style={{fontSize: '16px', fontWeight: '600'}}>北京时间</div>
        <div className='timer'>{now.format('HH:mm:ss')}</div>
        <div>
          <Popconfirm
            title="确定是否要提交回答？"
            content="请确认已经完成两道题目后提交"
            onConfirm={onConfirm}
            // onCancel={onCancel}
          >
            <Button style={{ alignSelf: 'center', color: 'black' }}>
              提交答案
            </Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}
