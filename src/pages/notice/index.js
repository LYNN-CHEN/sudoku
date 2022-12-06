import React from 'react'
import { Card, Button, Form } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

export default function Notice() {
  let navigate = useNavigate()
  const handleSubmit = () => {
    navigate('/sudoku')
  }
  return (
    <div
      style={{
        padding: 40,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'white',
        border: '3px solid black',
      }}
    >
      {/* <h3>2022 年深圳市智力运动系列赛事之数独公开赛-初赛</h3> */}
      <Card
        style={{ minHeight: 180, width: '100%', marginBottom: 24 }}
        bordered={true}
        headerLine={true}
        title="考试规范与须知"
      >
        <ol style={{ fontSize: '16px' }}>
          {/* <li>深圳市数独公开赛分为选拔赛、初赛、决赛，选拔赛为线上举办，初赛和决赛将在线下举办；</li> */}
          <li>
            选手凭手机号码等信息登录，进入“2022
            年深圳市智力运动系列赛事之数独公开赛”页面，在规定时间内答题
          </li>
          <li>本次初赛时间20分钟，比赛内容为一道九宫标准数独初级题</li>
          <li>20 分钟内答对一道九宫标准初级题者，进入决赛</li>
          <li>
            参加过深圳市数独协会举办的段位考试，通过业余一段及以上的选手，免初赛，直接进入决赛{' '}
          </li>
          <li>
            通过由承办单位指派监考人员的初赛的选手，可申请兑换业余一段段位
          </li>
        </ol>
      </Card>
      <Form onSubmit={values => handleSubmit(values)}>
        {({ formstate, values, formApi }) => (
          <>
            <Form.Checkbox field="agree" noLabel>我已经认真阅读考试须知</Form.Checkbox>
            <br />
            <Button
              disabled={!values.agree}
              htmlType="submit"
              style={{ width: 200, color: 'black' }}
            >
              下一页
            </Button>
          </>
        )}
      </Form>
    </div>
  )
}
