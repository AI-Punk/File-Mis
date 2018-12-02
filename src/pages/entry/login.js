import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.css'
const FormItem = Form.Item;

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  login = () => {
    const {username, password} = this.state
    this.props.dispatch({
      type: 'entry/login',
      payload: {
        username,
        password
      }
    })
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            <Input
              value={this.state.username}
              onChange={(ev) => {this.setState({username: ev.target.value})}}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        </FormItem>
        <FormItem>  
            <Input
              password={this.state.password}
              onChange={(ev) => {this.setState({password: ev.target.value})}}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        </FormItem>
        <FormItem>
            <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" className="login-form-button" onClick={this.login}>
            Log in
          </Button>
          Or <a onClick={() => {this.props.changeMode(1)}}>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default Login
