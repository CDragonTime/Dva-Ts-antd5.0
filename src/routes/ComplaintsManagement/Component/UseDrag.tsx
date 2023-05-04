import React, { useEffect, useRef } from 'react'
import { useDrag, useDragDropManager, useDrop } from 'react-dnd'
import { DragItem } from './EditLeft'

const draggableOpacity = 0.3

interface IProps {
  data: DragItem
  type: string
  changePosition?: (a, b) => void
}

const CustDrag: React.FC<IProps> = (props) => {
  const { data, type, changePosition } = props
  const { index } = data
  const ref = useRef(null)
  const [{ opacity, isDragging }, drag, preview] = useDrag({
    type: type,
    item: data,
    end: () => {},
    isDragging: (monitor) => {
      return index === monitor.getItem().index
    },
    collect: (monitor) => ({
      opacity: monitor?.isDragging() ? draggableOpacity : 1,
      isDragging: monitor.isDragging(),
    }),
  })
  const [{}, drop] = useDrop({
    accept: type,
    hover: (item: DragItem, monitor) => {
      if (!ref.current || typeof item.index !== 'number') return
      let dragIndex = item.index
      let hoverIndex = index
      if (dragIndex === hoverIndex) return // 如果回到自己的坑，那就什么都不做
      changePosition(dragIndex, hoverIndex) // 调用传入的方法完成交换
      item.index = hoverIndex // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    },
    drop: (item, monitor) => {},
  })

  return (
    <>
      <div ref={drag(drop(ref)) as any} style={{ opacity, cursor: 'move' }}>
        {props.children}
      </div>
    </>
  )
}
export default CustDrag
