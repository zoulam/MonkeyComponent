import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  Upload,
  UploadFile
} from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'
// ! 文件状态描述
const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: '上传中……', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: '上传完成', status: 'success', percent: 100 },
  { uid: '121', size: 1234, name: '上传失败', status: 'error', percent: 30 }
]
// !自定义文件校验，如文件类型、文件大小等
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('文件大小超过50k！')
    return false;
  }
  return true;
}
// !重命名
// const filePromise = (file: File) => {
//   let type: string = file.type.split('/')[1]
//   const newFile = new File([file], `new_name.${type}`, { type: file.type })
//   return Promise.resolve(newFile)
// }
const SimpleUpload = () => {
  return (
    <div>
      <span>支持拖拽和点击上传,支持多文件上传</span>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action('changed')}
        onRemove={action('removed')}
        defaultFileList={defaultFileList}
        // beforeUpload={checkFileSize}
        // beforeUpload={filePromise}
        // data={{ 'key': 'value' }}
        // headers={{'zoulam':'component'}}
        name="fileName"
        multiple
        drag
      >
        <Icon icon="upload" size="5x" theme="secondary" />
        <br />
        <p>Drag file over to upload</p>
      </Upload>
    </div>
  )
}

const CheckUpload = () => {
  return (
    <div>
      <span>支持自定义上传样式，限制文件大小最大为50k</span>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action('changed')}
        onRemove={action('removed')}
        beforeUpload={checkFileSize}
        // beforeUpload={filePromise}
        // data={{ 'key': 'value' }}
        // headers={{'zoulam':'component'}}
        name="fileName"
        multiple
        drag={false}
      >
        <Button btnType="default">点击上传</Button>
      </Upload>
    </div>
  )
}

storiesOf('Upload component', module)
  .add('Upload', SimpleUpload)
  .add('CheckUpload', CheckUpload)