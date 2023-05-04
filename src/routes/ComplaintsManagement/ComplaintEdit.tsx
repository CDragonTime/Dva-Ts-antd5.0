import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Spin, Descriptions, Form, Modal, message, Col, Row, Divider, DatePicker } from 'antd'
import EditLeft from './Component/EditLeft'
import EditCenter from './Component/EditCenter'
import EditRight from './Component/EditRight'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragItem } from './Component/EditLeft'
interface IProps {
  onClose?: () => void
  userModel: any
}

const { RangePicker } = DatePicker

const Index: React.FC<IProps> = (props) => {
  const { onClose, userModel } = props
  const isAdd = userModel === 'add'
  const [form] = Form.useForm()
  const [currentData, setCurrentData] = useState<DragItem>(null)
  const [isPreview, setIsPreview] = useState<boolean>(false)

  const onSubmit = async () => {
    onClose()
  }

  /**
   * 预览
   */
  const changePreviewData = (e) => {
    setIsPreview(e)
  }

  useEffect(() => {
    console.log(currentData, 'sdfdsfds')
  }, [currentData])

  return (
    <Modal
      className='complaints-edit'
      style={{ top: '10vh' }}
      width={'80vw'}
      title={`Create new`}
      onCancel={() => onClose()}
      open={true}
      footer={false}
      maskClosable={false}
    >
      <DndProvider backend={HTML5Backend}>
        <Divider />
        <Row style={{ height: '80vh' }}>
          <Col span={5}>
            <EditLeft />
          </Col>
          <Col span={13}>
            <EditCenter
              isPreview={isPreview}
              changePreviewData={changePreviewData}
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
          </Col>
          <Col span={6}>
            <EditRight currentData={currentData} />
          </Col>
        </Row>
      </DndProvider>
    </Modal>
  )
}

export default Index
