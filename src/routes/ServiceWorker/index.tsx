import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import styles from './index.less'
import { Tabs, TabsProps } from 'antd'
import axios from 'axios'

interface DataListType {
  keyword: string
  hotTags: number
  searches: string
  changeRate: number
}

function IndexPage() {
  const [dataList, setDataList] = useState<Array<DataListType | null>>([])
  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const res = await axios.get('/api/hotword?pn=1&rn=15&t=1675231118719')
    const { data = [] } = res?.data
    setDataList(data)
  }

  return (
    <div className={styles.normal}>
      {/* // <4.23.0 可用，>=4.23.0 时不推荐 🙅🏻‍♀️ */}
      <div className={styles.tabs}>
        <Tabs
          defaultActiveKey={dataList[0]?.searches?.toString()}
          items={dataList.map((v) => ({
            key: v.searches,
            label: v.keyword?.substring(0, 2),
            children: v.keyword,
          }))}
        />
      </div>
      <div className={styles.tabs}>
        <Tabs defaultActiveKey={dataList[0]?.searches?.toString()}>
          {dataList.map((v) => (
            <Tabs.TabPane tab={v.keyword?.substring(0, 2)} key={v.searches}>
              {v.keyword}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>

    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
