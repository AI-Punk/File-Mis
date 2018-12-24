import React from 'react'
import {Table} from 'antd'
function FinishPage (props) {
  const {fileList} = props
  const columnProps = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    }
  ]
  return (
    <Table 
      scroll={{ y: 240 }} 
      dataSource={fileList} 
      columns={columnProps}
      pagination={{ pageSize: 10 }}
      rowKey={(record) => record.id}
      />
  )
}

export default FinishPage