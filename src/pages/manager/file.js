import React, {Component} from 'react'
import { Form, Input, Select, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
class FileInfo extends Component {
  render () {
    return (
      <Form>
        <FormItem label="title">
          <Input />
        </FormItem>
        <FormItem label="content">
          <Input />
        </FormItem>
        <FormItem label="type">
          <Button>Upload</Button>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

export default FileInfo
