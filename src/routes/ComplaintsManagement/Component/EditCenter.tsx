import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Spin, DatePicker, List, Row, Space, message, Popconfirm, Col, Empty } from 'antd'
import { useAppStores } from '@library/hook/global'
import { isEmptyObj, isNull, isNotNull } from 'public/fun'
import { SaveFilled, EyeFilled, DeleteFilled, DeleteOutlined, MenuOutlined, FormOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useDrop, useDrag } from 'react-dnd'
import UseDrag from './UseDrag'
import { DragItem } from './EditLeft'
import Input from 'antd/es/input/Input'
import PreviewForm from './PreviewForm'

interface IProps {
  isPreview: boolean
  currentData: DragItem
  changePreviewData: (e) => void
  setCurrentData?: (data) => void
}
const { RangePicker } = DatePicker

const Index: React.FC<IProps> = (props) => {
  const { setCurrentData, currentData, changePreviewData, isPreview } = props
  const [sortableList, setSortableList] = useState<DragItem[]>([{ key: '1002', title: 'Radio Button' }])
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'Field',
    drop: (item: DragItem) => {
      const targetValue = [...sortableList]
      // 判断是否列表中的
      if (typeof item?.index === 'number') {
        console.log(item, 'data index')
      } else {
        targetValue.push({ ...item })
        onChange(targetValue)
      }
    },
    collect: (monitor) => ({
      // 是否放置在目标上
      isOver: monitor.isOver(),
      // 是否开始拖拽
      canDrop: monitor.canDrop(),
    }),
  })

  // 是否拖拽到指定位置
  const showCanDrop = () => {
    return canDrop && isOver
  }

  /**
   * 删除数据
   * @param {number} ind
   */
  const delItem = (ind: number) => {
    const newValue = [...sortableList]
    newValue.splice(ind, 1)
    setSortableList(newValue)
  }

  /**
   * 拖动变更
   * @param {*} targetValue 新标记数据Î
   */
  const onChange = (targetValue) => {
    setSortableList(targetValue)
  }

  /**
   * 保存操作
   */
  const saveData = () => {
    message.success('save success')
  }

  const changePosition = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = sortableList.slice()
    const temp = data[dragIndex]
    // 交换位置
    data[dragIndex] = data[hoverIndex]
    data[hoverIndex] = temp
    setSortableList(data)
  }

  return (
    <div className='right-divider'>
      <Row justify='space-between' align='middle' className='list-divider'>
        <h3>Form</h3>
        <div className='cursor'>
          <Space size={20}>
            <Row
              onClick={() => {
                saveData()
              }}
            >
              <SaveFilled />
              &nbsp;Save
            </Row>
            {isPreview ? (
              <Row
                onClick={() => {
                  changePreviewData(!isPreview)
                }}
              >
                <FormOutlined />
                &nbsp;Back to edit
              </Row>
            ) : (
              <Row
                onClick={() => {
                  changePreviewData(!isPreview)
                }}
              >
                <EyeFilled />
                &nbsp;Preview
              </Row>
            )}
          </Space>
        </div>
      </Row>
      {!isPreview ? (
        <div ref={drop} className={`${showCanDrop() ? 'drag-in-color' : ''} scroll-content`}>
          {sortableList.map((item, index: number) => {
            return (
              <UseDrag data={{ ...item, index }} type='Field' changePosition={changePosition}>
                <Row
                  onClick={() => {
                    setCurrentData({ ...item, index })
                  }}
                  justify={'space-between'}
                  className='sortable-every'
                  style={currentData?.index === index ? { background: 'rgba(64,155,255,0.1)' } : {}}
                >
                  <Col span={6} className='center-text'>
                    {' '}
                    {item?.title}
                  </Col>
                  <Col span={12}>
                    {' '}
                    <Input disabled />
                  </Col>
                  <Col span={6} className='center-text flex-justify'>
                    <MenuOutlined className='sortable-icon' />
                    <Popconfirm title='sure delete?' onConfirm={() => delItem(index)} onCancel={() => {}}>
                      <DeleteOutlined />
                    </Popconfirm>
                  </Col>
                </Row>
              </UseDrag>
            )
          })}
        </div>
      ) : (
        <PreviewForm currentData={currentData} />
      )}
    </div>
  )
}

export default Index
