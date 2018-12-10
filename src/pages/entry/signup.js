import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item
class Signup extends Component {
  state = {
    username: '',
    password: '',
    repassword: '',
    email: ''
  }
  register = () => {
    this.props.dispatch({
      type: 'entry/register'
    })
  }
  setFormField = (ev, field) => {
    let value = ev.target.value
    this.setState({
      [field]: value
    })
  }
  render() {
    const {username, password, repassword, email} = this.state
    return (
      <Form className="login-form">
        <FormItem validateStatus={username.length > 0 ? 'success': 'warning'}
          help="This field should not be empty">
            <Input
              onChange={(ev) => {this.setFormField(ev, 'username')}} value={username}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </FormItem>
        <FormItem validateStatus={password.length > 0 ? 'success': 'warning'}
          help="This field should not be empty">  
            <Input
              onChange={(ev) => {this.setFormField(ev, 'password')}} value={password}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </FormItem>
        <FormItem validateStatus={password === repassword > 0 ? 'success': 'error'}
          help="Should be the same with password.">  
            <Input
              onChange={(ev) => {this.setFormField(ev, 'repassword')}} value={repassword}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Check Password" />
        </FormItem>
        <FormItem>  
            <Input
              onChange={(ev) => {this.setFormField(ev, 'email')}} value={email}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
        </FormItem>
        <FormItem>
            <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" className="login-form-button" onClick={this.register}>
            Register
          </Button>
          Or <a onClick={() => {this.props.changeMode(0)}}>Login now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Signup
