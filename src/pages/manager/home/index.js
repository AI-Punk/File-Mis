import React, {Component} from 'react'
import { List, Icon, Input, Button } from 'antd'
import { connect } from 'dva'
import {setTime} from "../../../utils/visit_time"
const Search = Input.Search
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const pageSize = 3
class ResourceSegment extends Component {
  constructor () {
    super()
    this.state = {
      page: 0,
      filter: ''
    }
  }
  enterFile = (fileId) => {
    this.props.dispatch({ type: 'manager/getFile', payload: {fileId} })
    this.props.dispatch({
      type: 'manager/save',
      payload: {
         currentWindow: 'display'
      }
    })
  }
  changePage = (page) => {
    this.setState({page})
  }
  filterData = (filter) => {
    this.setState({
      filter
    })
  }
  clearFilter = () => {
    this.setState({filter: ''})
  }
  UNSAFE_componentWillMount(){
    setTime()
  }
  render () {
    const {filter} = this.state
    let fileList = this.props.fileList
      .filter(item => {
        return item.id.slice(0, 6) !== '_fake_'
      })
      .filter(item => {
      return  item.title.search(filter) !== -1 ||
        item.content.search(filter) !== -1 ||
        item.creator.search(filter) !== -1
    })
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={this.filterData}
          enterButton
          style={{ width: 460 }}
        />
        <Button style={{marginLeft: '10px'}} type="primary" onClick={this.clearFilter}>Clear Filter</Button>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              this.changePage(page)
            },
            pageSize,
          }}
          dataSource={fileList}
          footer={<div><b>File List</b> page</div>}
          renderItem={(item, index) => (
            <List.Item
              key={item.title}
              actions={[<IconText type="user" text="root" />, <IconText type="calendar" text={item.createDate} />, <IconText type="file" text={item.type} />]}
            >
              <List.Item.Meta
                avatar={<Icon type="file-pdf" />}
                title={<a onClick={() => {this.enterFile(item.id)}}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    )
  }
}
export default connect((state) => {
  return state.manager
  // return { fileList: state.home.fileList, dispatch: state.home.dispatch }
})(ResourceSegment)
