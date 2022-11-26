import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'
import BGImage from '../src/assets/bg.png'
import Notice from '../src/pages/notice/index'
import Submit from '../src/pages/submit/index'
import Login from '../src/pages/login/index'
import Sudoku from '../src/pages/soduku/index'
import { Layout } from '@douyinfe/semi-ui'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
const { Header, Footer, Sider, Content } = Layout

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/notice',
    element: <Notice />,
  },
  {
    path: '/sudoku',
    element: <Sudoku />,
  },
  {
    path: '/submitted',
    element: <Submit />,
  },
])

root.render(
  <React.StrictMode>
    <div style={{ height: '100%' }}>
      <Header
        style={{ height: '180px', background: '#bfb9db', padding: '18px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div>
              <h3>2022年深圳市智力运动系列赛事之数独公开赛</h3>
            </div>
            <div>主办单位：深圳市文化广电旅游体育局</div>
            <div>承办单位：深圳市数独协会</div>
          </div>
        </div>
      </Header>
      <Layout
        style={{
          height: 'calc(100% - 100px)',
          backgroundImage: `url(${BGImage})`,
          backgroundSize: '100%,100%',
        }}
      >
        <Sider style={{ width: 180 }}></Sider>
        <Content>
          {/* <Sudoku /> */}
          <RouterProvider router={router} />
        </Content>
        <Sider style={{ width: 180 }}></Sider>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </div>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
