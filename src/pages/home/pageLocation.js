import React, {Component} from 'react'
import { Breadcrumb } from 'antd'
const pageList = ['Home', 'File']
class PageLocation extends Component {
  changePos = (pos) => {
    this.props.dispatch({
      type: 'home/changePos',
      pos
    })
  }
  render () {
    const {pos = 0} = this.props
    return (
      <Breadcrumb separator=">">
        {pageList.slice(0, pos + 1).map((item, index) => {
          return (<Breadcrumb.Item style={{cursor: 'pointer'}} onClick={() => {this.changePos(index)}} key={item}>{item}</Breadcrumb.Item>)
        })}
      </Breadcrumb>
    )
  }
}
export default PageLocation
