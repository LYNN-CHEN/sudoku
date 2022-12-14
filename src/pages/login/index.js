import React, { useState } from 'react'
import { Form, Button, Banner } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  let navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/

  const handleSubmit = (e) => {
    // console.log('success', e)
    let data=new FormData()
    data.append('name',e.UserName)
    data.append('phone',e.Phone)
    console.log(data)
    fetch('https://sudokuserver.boxz.dev/api/signin/', {
      method: 'POST',
      // credentials: 'include',
      body: data
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        setVisible(false)
        navigate('/notice')
      } else {
        setVisible(true)
        console.log('wrong')
      }
    }).catch((err) => {
      setVisible(true)
      console.log(err)
    })
    
  }

  const changeVisible = () => {
    setVisible(!visible)
  }

  const banner = (
    <Banner 
      type="danger"
      description="请输入正确的姓名和手机号码！"
      onClose={changeVisible}
    />
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 150px',
        background: 'white',
        border: '3px solid black',
      }}
    >
      {visible ? banner : null}
      <h4>登录考试页面</h4>
      <Form
        layout="vertical"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={values => handleSubmit(values)}
      >
        <Form.Input
          field="UserName"
          label="姓名"
          style={{ width: 400 }}
          rules={[{ required: true, message: '此为必填项' }]}
        />
        <Form.Input
          field="Phone"
          label="电话号码"
          style={{ width: 400 }}
          rules={[
            { required: true, message: '此为必填项' },
            {
              validator: (rule, value) => regExp.test(value),
              message: '请填写正确的电话号码',
            },
          ]}
        />
        <br />
        <br />
        <Button
          style={{ width: 200, alignSelf: 'center', color: 'black' }}
          htmlType="submit"
          // onClick={onFinish}
        >
          登录
        </Button>
      </Form>
    </div>
  )
}
