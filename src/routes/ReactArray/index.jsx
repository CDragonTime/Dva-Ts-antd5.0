import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import styles from './index.css'
import { Tabs, TabsProps } from 'antd'
import axios from 'axios'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return [
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/index.js</code> and save to reload.
        </li>
        <li>
          <a href='https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md'>Getting Started</a>
        </li>
      </ul>,
      <div>1231212421412421</div>,
      <span>1231212421412421</span>,
      <>1231212421412421</>,
      <>1231212421412421</>,
    ]
  }
}

export default connect()(IndexPage)
