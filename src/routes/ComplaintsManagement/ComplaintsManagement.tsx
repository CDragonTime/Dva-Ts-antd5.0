import { useLoading } from '@library/hook/global'
import React, { useEffect, useState, useRef } from 'react'
import type { ColumnsState, ProColumns, ActionType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, FormInstance, message, DatePicker, Tooltip, Modal, Select, Row, Col, Popconfirm, AutoComplete, Popover, Space } from 'antd'
import { useAppStores } from '@library/hook/global'
import { getMaskList } from '@library/services/suggestion'
import OperationButtons from '@library/components/permission/OperationButtons'
import { isArray, isNotNull, isNull, isEmptyObj, convertListToTreeData } from '@library/public/fun'
import ComplaintEdit from './ComplaintEdit'
import PermissionButton from '@library/components/permission/Button'
import { DEFAULTTIMEZONE, Stars, V } from '@library/util/const'
import { SYSTEM_ID } from 'public/setting'

const { RangePicker } = DatePicker

interface DataSource {
  id: string
  dimension: string
  type: string
  caseId: string
  index: string
  startTime: string
  endTime: string
  timeZone: string
  note: string
  optId: number
  optName: string
  status: number
  createTime?: string
}

export default function ChatMgtList(params) {
  const appStore = useAppStores()
  const gidsRef = useRef([])
  const TableRef = useRef<ActionType>()
  const pageRef = useRef({ total: 0, list: [], pageIndex: 1, pageSize: 20, query: null })
  const TableFormRef = useRef<FormInstance>()
  const [selectedRow, setSelectedRow] = useState([])
  const [timeZone, setTimeZone] = useState(appStore.userStore.setting.timezone || DEFAULTTIMEZONE)
  // const [loading, queryChatMgtList] = useLoading(imApi.getChatMgtList)
  const [recordDetail, setRecordDetail] = useState<DataSource | string>(null)
  const [height, setHeight] = useState(500)
  const isAdmin = appStore.userStore.permissionsData.has('/crm/chat/detail/admin')
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    handleTime: {
      show: false,
    },
    firstReaction: {
      show: false,
    },
    openCountry: {
      show: false,
    },
    registerRegion: {
      show: false,
    },
  })

  const getTimezoneList = async () => {
    const res = await appStore.suggestionStore.queryTimeList()
    TableFormRef.current.setFieldsValue({ timeZone })
    const arr = []
    res?.map((item) => {
      arr.push({ value: item.code, label: item.name })
    })
    TableFormRef.current.submit()
    return arr
  }

  // 下拉框标签数据
  const columns: ProColumns[] = [
    // {
    //   title: appStore.$p('Im.im_59'),
    //   dataIndex: 'timeZone',
    //   hideInTable: true,
    //   hideInSearch: true,
    //   initialValue: timeZone,
    //   order: 9,
    //   request: getTimezoneList,
    //   fieldProps: {
    //     allowClear: false,
    //   },
    // },
    // {
    //   title: 'ID',
    //   hideInSearch: true,
    //   dataIndex: 'id',
    //   width: 60,
    //   order: 18,
    //   render: (val) => <span>{val}</span>,
    // },
    {
      title: 'Dimension',
      valueType: 'select',
      fieldProps: {},
      dataIndex: 'dimension',
      width: 100,
      order: 18,
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {},
      hideInSearch: true,
      width: 100,
      order: 17,
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'ID',
      dataIndex: 'caseId',
      hideInSearch: true,
      render: (val) => {
        return val === '-' ? (
          val
        ) : (
          <Popover placement='topLeft' content={<div className={'tooltip-overflow'}>{val}</div>}>
            <div className={'inner-val-overflow'}>{val}</div>
          </Popover>
        )
      },
      hideInSetting: true,
    },
    {
      title: 'Tag',
      dataIndex: 'tagName',
      hideInSearch: true,
      render: (val) => {
        return val === '-' ? (
          val
        ) : (
          <Popover placement='topLeft' content={<div className={'tooltip-overflow'}>{val}</div>}>
            <div className={'inner-val-overflow'}>{val}</div>
          </Popover>
        )
      },
      hideInSetting: true,
    },
    {
      title: 'Index',
      dataIndex: 'index',
      hideInForm: true,
      hideInSearch: true,
      render: (val) => {
        return val === '-' ? (
          val
        ) : (
          <Popover placement='topLeft' content={<div className={'tooltip-overflow'}>{val}</div>}>
            <div className={'inner-val-overflow'}>{val}</div>
          </Popover>
        )
      },
    },
    {
      title: 'Time Period',
      dataIndex: '',
      order: 1,
      hideInSearch: true,
      render: (val, r) => {
        return `${r.startTime || ''}~${r.endTime || ''} ${r.timeZone || ''}`
      },
    },
    {
      title: 'Operator',
      dataIndex: 'optName',
      width: 90,
      hideInForm: true,
      hideInSearch: true,
      render: (val, record) => {
        return val
      },
    },
    {
      title: 'Submit Time',
      dataIndex: 'createTime',
      hideInForm: true,
      hideInSearch: true,
      render: (val, record) => {
        return val
      },
    },
    {
      key: 'Note',
      dataIndex: 'note',
      title: 'Note',
      hideInForm: true,
      hideInSearch: true,
      width: 180,
      render: (val) => {
        return val === '-' ? (
          val
        ) : (
          <Popover placement='topLeft' content={<div className={'tooltip-overflow'}>{val}</div>}>
            <div className={'inner-val-overflow'}>{val}</div>
          </Popover>
        )
      },
    },
    {
      title: 'Operation',
      width: 140,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (val, record) => [
        <OperationButtons
          dataSource={[
            {
              name: appStore.$p('editor'),
              url: '/api/crm/dataBlackList/update',
              onClick: () => setRecordDetail(record),
            },
            {
              name: appStore.$p('delete'),
              url: '/api/crm/dataBlackList/delete',
              onClick: () => deleteBlacklist(record),
              confirm: appStore.$p('youDeleteIt'),
            },
          ]}
        />,
      ],
    },
  ]
  useEffect(() => {
    initTagList()
  }, [])
  const initTagList = async () => {
    getTimezoneList()
    const headHeight = 330
    setHeight(appStore.__WindowBase__.height - headHeight)
    if (isEmptyObj(appStore.suggestionStore.suggestionTagTree)) {
      await appStore.suggestionStore.queryAllTagList()
    }
  }

  function search(params, sorter, filter) {
    // 表单搜索项会从 params 传入，传递给后端接口。
    const orderFileds = []
    const { dealType, ...rest } = params
    Object.keys(sorter).forEach((item) => {
      switch (sorter[item]) {
        case 'ascend':
          // 升序
          orderFileds.push({ name: item, order: 'ASC' })
          break
        case 'descend':
          // 降序
          orderFileds.push({ name: item, order: 'DESC' })
          break
        default:
          break
      }
    })
    setTimeZone(params.timeZone)
    const searchValue = {
      ...rest,
      dealType: dealType ? dealType[0] : null,
      pageIndex: params.current,
      mark: params.mark?.join(','),
      imType: params.imType?.join(','),
      orderFileds,
    }
    for (const valueItem in searchValue) {
      if (isNotNull(valueItem)) {
        if (isNull(searchValue[valueItem]) || (isArray(searchValue[valueItem]) && isEmptyObj(searchValue[valueItem]))) {
          delete searchValue[valueItem]
        }
      }
    }
    return getTableData(searchValue)
  }
  const getTableData = async (data) => {
    const { beginTime = [], endTime = [], satDegree, ...rest } = data
    const params = { ...rest }
    const res = await appStore.BlackListStore.getBlacklistList(params)
    pageRef.current = {
      total: res?.total || 0,
      list: res?.rows || [],
      pageIndex: data.pageIndex,
      pageSize: data.pageSize,
      query: params,
    }
    return { data: res?.rows, total: res?.total, success: true }
  }
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRow(selectedRowKeys)
    const list = selectedRows.filter((v) => v.status !== 4).map((v) => v.groupId)
    gidsRef.current = [...new Set(list)]
  }
  const rowSelection = {
    selectedRowKeys: selectedRow,
    onChange: onSelectChange,
  }
  // 刷新表格
  const onReload = () => {
    TableRef.current.reload()
  }

  // 解决分页冲突
  const changePage = (page, size) => {
    pageRef.current = {
      ...pageRef.current,
      pageIndex: page,
      pageSize: size,
    }
  }
  /**
   * 删除行
   * @param record
   */
  const deleteBlacklist = (record) => {
    console.log(record)
    const res = appStore.BlackListStore.deleteBlacklist({ id: record.id })
    if (res) {
      message.success('delete success')
    }
    onReload()
  }

  const onClose = () => {
    setRecordDetail(null)
    onReload()
  }

  return (
    <>
      <ProTable
        className='chat-detail-table'
        tableStyle={{ padding: 0 }}
        scroll={{ x: 1400, y: height }}
        defaultSize='large'
        revalidateOnFocus={false}
        formRef={TableFormRef}
        columns={columns.filter(Boolean)}
        request={search}
        actionRef={TableRef}
        rowKey='code'
        // loading={loading}
        rowSelection={false}
        pagination={{
          onChange: changePage,
          showQuickJumper: true,
          showSizeChanger: true,
          size: 'small',
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
          className: 'chat-mgr-form',
          // onCollapse: onCollapse,
        }}
        dateFormatter='string'
        headerTitle={[
          <Space>
            <PermissionButton
              key='Transfer'
              url='/api/crm/dataBlackList/add'
              type='primary'
              onClick={() => {
                setRecordDetail('add')
              }}
            >
              Edit the form
            </PermissionButton>
            <PermissionButton type='primary' url='/api/crm/im/session/batchSetAutoTag' key='tag' onClick={() => {}}>
              Export the ASIC IDR Report
            </PermissionButton>
            <PermissionButton url='/api/crm/im/session/batchSetAutoTag' key='tag' onClick={() => {}}>
              <DownloadOutlined /> Export
            </PermissionButton>
          </Space>,
        ]}
        toolBarRender={() => []}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
      />
      {!recordDetail && <ComplaintEdit userModel={recordDetail} onClose={onClose} />}
    </>
  )
}
