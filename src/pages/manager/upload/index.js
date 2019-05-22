import React, {Component} from 'react'
import {Steps, Button} from 'antd'
import UploadStep from './upload.js'
import FileInfo from './fileInfo.js'
import FileModel from './file.model.js'
import FinishPage from './finish'
const Step = Steps.Step;
class UploadPage extends Component {
  state = {
    step: 0,
    fileList: [],
    allowNext: false
  }
  updateFileList = (fileList) => {
    const userList = this.props.userList
    if (fileList.length > 0) {
      this.allowNext()
    }
    let fileInfoList = fileList.filter(file => {
      return typeof file.response !== 'undefined'
    }).map(file => {
      return new FileModel({file, userList})
    })
    this.setState({
      fileList: fileInfoList
    })
  }
  allowNext = () => {
    this.setState({
      allowNext: true
    })
  }
  nextStep = () => {
    let step = this.state.step
    if (step === 2) {
      this.props.dispatch({
        type: 'manager/save',
        payload: {
          currentWindow: 'fileList'
        }
      })
      this.props.dispatch({
        type: 'manager/getFileList'
      })
      this.props.dispatch({
        type: 'manager/getUserList'
      })
    } else { 
      this.setState({
        step: step + 1,
        allowNext: step === 1 ? true : false
      })
    }
  }
  render () {
    const {step, fileList, allowNext} = this.state
    const {userList, uploadGroup} = this.props
    const StepPages = [
      <UploadStep dispatch={this.props.dispatch} updateFileList={this.updateFileList} uploadGroup={uploadGroup} />,
      <FileInfo dispatch={this.props.dispatch} fileList={fileList} userList={userList} allowNext={this.allowNext}/>,
      <FinishPage fileList={fileList} />
    ]
    return (<div>
      <Steps current={step}>
        <Step title="Upload Files" description="This is a description." />
        <Step title="Edit Info" description="This is a description." />
        <Step title="Completed" description="This is a description." />
      </Steps>
      <div style={{marginTop: '1rem'}}>
      {
        StepPages[step]
      }
      </div>
      <Button style={{marginTop: '1rem'}} onClick={this.nextStep} disabled={!allowNext}>Next Step</Button>
    </div>)
  }
}
export default UploadPage