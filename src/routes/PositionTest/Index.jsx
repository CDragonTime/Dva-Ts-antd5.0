import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import styles from './Index.less'
import { Tabs, TabsProps } from 'antd'
import axios from 'axios'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return [
      // position的z-index属性，比较规则：
      //      如果都没设置z-index，则从div由上到下顺序，后来者居上
      //      如果都设置z-index，则按大小来比较
      //      如果多层position，没设置z-index的一律按后来者居上，
      //    设置了z-index就是拉平去对比其他最外层设置z-index的div，相当于设置了z-index按拉平来顺序排列
      <div className={styles.under}>
        <div className={styles.position1}>
          position1{' '}
          <div className={styles.positionChild1}>
            positionChild1
            <div className={styles.positionChildChild1}>positionChildChild1</div>
          </div>
        </div>

        <div className={styles.position2}>
          position2 <div className={styles.positionChild2}>positionChild2</div>
        </div>
        <div className={styles.outerDiv}>outerDiv</div>
      </div>,
    ]
  }
}

export default connect()(IndexPage)
