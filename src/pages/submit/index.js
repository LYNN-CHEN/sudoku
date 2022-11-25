import React from 'react'
import { Modal, Button } from '@douyinfe/semi-ui'
import BGImage from '../../assets/bg.png'

export default function Submit() {
  return (
    <div style={{width: 180}}>
      <Modal
        title="提交成功！"
        visible={true}
        closable={false}
        // header={<></>}
        footer={
          <></>
        }
      >
        <div style={{minHeight: 250}}>
          {/* <h3>提交成功！</h3> */}
        恭喜你已经成功完成两道试题！<br/>
        （其他提示考生离开考场的提示语）
        </div>
      </Modal>
    </div>
  )
}
