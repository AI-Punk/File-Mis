import React from 'react'
import {Form, Input, Radio, InputNumber} from 'antd'
const FormItem = Form.Item
// const Option = Select.Option
const RadioGroup = Radio.Group;
function UserForm (props) {
  const {
    username,
    email,
    password,
    limit,
    limitMode,
    id,
    changeUsername,
    changePassword,
    changeEmail,
    changeLimitMode,
    changeUserLimit
  } = props
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  } 
  return (
    <Form layout="horizontal">
      <FormItem {...formLayout} label="username">
        <Input value={username} onChange={changeUsername} />
      </FormItem>
      <FormItem {...formLayout} label="password">
        <Input disabled={id === -1 ? false: true} value={password} onChange={changePassword} />
      </FormItem>
      <FormItem {...formLayout} label="email">
        <Input value={email} onChange={changeEmail} />
      </FormItem>
      <FormItem {...formLayout} label="limit mode">
        <RadioGroup value={limitMode} onChange={changeLimitMode}>
          <Radio value={true}>limit</Radio>
          <Radio value={false}>unlimit</Radio>
        </RadioGroup>
      </FormItem>
      {
        limitMode ? <FormItem {...formLayout} label="time limit">
          <InputNumber
            defaultValue={3}
            min={0}
            max={100000}
            formatter={value => `${limit}min`}
            parser={value => value.replace('min', '')}
            onChange={changeUserLimit}
          />
        </FormItem> : null
      }
    </Form>
  )
}

export default UserForm
