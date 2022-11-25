import React from 'react'
import { Form, Button } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function Login() {
  let navigate = useNavigate()
  const regExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

  const handleSubmit = (e) => {
    console.log('success', e)
    let data = {
      name: e.UserName,
      phone: e.Phone
    }
    console.log(data)
    // fetch('https://sudokuserver.boxz.dev/signin/', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // }).then((res) => {
    //   console.log(res)
    //   navigate('/notice')
    // }).catch((err) => {
    //   console.log(err)
    // })
    
  }

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
