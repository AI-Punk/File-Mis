import React, {Component} from 'react'
import { List, Avatar, Icon  } from 'antd'
import { connect } from 'dva'
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
      page: 0
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
    console.log('changeing page', page)
    this.setState({page})
  }
  render () {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            this.changePage(page)
          },
          pageSize,
        }}
        dataSource={this.props.fileList}
        footer={<div><b>ant design</b> footer part</div>}
        renderItem={(item, index) => (
          <List.Item
            key={item.title}
            actions={[<IconText type="user" text="156" />, <IconText type="calendar" text="156" />, <IconText type="video-camera" text="2" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a onClick={() => {this.enterFile(item.id)}}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}
export default connect((state) => {
  return state.manager
  // return { fileList: state.home.fileList, dispatch: state.home.dispatch }
})(ResourceSegment)
