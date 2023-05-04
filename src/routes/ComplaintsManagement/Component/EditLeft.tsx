import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Spin, DatePicker, List, Card, Row, Button, Space } from 'antd'
import { ContactsOutlined } from '@ant-design/icons'
import UseDrag from './UseDrag'

interface IProps {}

export declare type DragItem = {
  title: string
  key: string
  index?: number //排序依据
}

const defaultList = [
  { key: '1001', type: 'input', title: 'Aa Text Input Box' },
  { key: '1002', type: 'radio', title: 'Check Box' },
  { key: '1003', type: 'date', icon: <ContactsOutlined />, title: 'Date' },
  { key: '1003', type: 'select', title: 'Select' },
]
const { RangePicker } = DatePicker

const Index: React.FC<IProps> = (props) => {
  const {} = props

  return (
    <div className='content-divider around'>
      <h3>Basic</h3>
      <Space direction='vertical' size={10} style={{ width: '100%' }}>
        {defaultList.map((item) => {
          return (
            <UseDrag data={item} type='Field'>
              <Row>
                <Button block className='dragger-title'>
                  {item.icon}{item.title}
                </Button>
              </Row>
            </UseDrag>
          )
        })}
      </Space>
    </div>
  )
}

export default Index
