import React, {Component} from 'react'
import { Form, Input, Select, Button } from 'antd'
const FormItem = Form.Item
// const Option = Select.Option
class UserInfo extends Component {
  render () {
    return (
      <Form>
        <FormItem label="username">
          <Input />
        </FormItem>
        <FormItem label="password">
          <Input />
        </FormItem>
        <FormItem label="email">
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

export default UserInfo
