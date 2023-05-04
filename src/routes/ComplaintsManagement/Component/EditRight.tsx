import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Spin, DatePicker, List, Form, Switch, Radio, Input, Button } from 'antd'
import { useAppStores } from '@library/hook/global'
import { isEmptyObj, isNull, isNotNull } from 'public/fun'
import dayjs from 'dayjs'
import { InfoCircleOutlined } from '@ant-design/icons'
interface IProps {
  currentData: any
}

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]
const { RangePicker } = DatePicker

const Index: React.FC<IProps> = (props) => {
  const { currentData } = props
  const [form] = Form.useForm()

  return (
    <div className='content-divider-right around'>
      <h3>Text input box</h3>
      <Form form={form} layout='vertical'>
        <Form.Item label='Form Title(less than 50 words)' required tooltip='This is a required field'>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item label='Tool tip(less than 50 words)' tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}>
          <Input placeholder='input placeholder' />
        </Form.Item>
        <Form.Item label='Mandatory' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item label='Display in the form' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item label='Display in the report' valuePropName='checked'>
          <Switch />
        </Form.Item>
        <Form.Item label='Set as the search filter' valuePropName='checked'>
          <Switch />
        </Form.Item>
        {/* <Form.Item label='Required Mark' name='requiredMarkValue'>
          <Radio.Group>
            <Radio.Button value='optional'>Optional</Radio.Button>
            <Radio.Button value>Required</Radio.Button>
            <Radio.Button value={false}>Hidden</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        {/* <Form.Item>
          <Button type='primary'>Submit</Button>
        </Form.Item> */}
      </Form>
    </div>
  )
}

export default Index
