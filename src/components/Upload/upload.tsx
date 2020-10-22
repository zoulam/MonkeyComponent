import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'


// &文件信息数组
export interface UploadFile {
  /** 文件id */
  uid: string;
  /** 文件大小 */
  size: number;
  /** 文件名 */
  name: string;
  /** 上传状态 */
  status?: UploadFileStatus;
  /** 上传百分比 */
  percent?: number;
  /** 源文件 */
  raw?: File;
  /** 响应体设置 */
  response?: any;
  /** 错误信息 */
  error?: any;
}
/**
 * 声明周期函数
 */
export interface UploadProps {
  /** 后端接口地址 */
  action: string;
  /** mock的文件数组 */
  defaultFileList?: UploadFile[];
  /** 文件重命名 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 显示进度的回调函数 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功的回调函数 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传错误的回调函数 */
  onError?: (err: any, file: File) => void;
  /** 选取文件之后的回调函数 */
  onChange?: (file: File) => void;
  /** 中途放弃上传  */
  onRemove?: (file: UploadFile) => void;
  /** request headers设置 */
  headers?: { [key: string]: any };
  /** 发送到后台的文件名（建议添加hash值） */
  name?: string;
  /** 可对file对象添加数据，如token */
  data?: { [key: string]: any };
  /** 是否携带cookie */
  withCredentials?: boolean;
  /** input属性，可设置限制文件类型 */
  accept?: string;
  /** 文件多选 */
  multiple?: boolean;
  /** 支持拖拽 */
  drag?: boolean;
}


/**
 *
 * ~~~js
 * import { Upload } from 'monkey-component'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  // 文件列表
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  /**
   * @param updateFile 旧文件信息数组
   * @param updateObj 插入的对象（原来包含就修改）
   * @description 封装更新文件信息的函数
   */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  // 触发点击的是 input file实体
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  // 获取选取文件的信息
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    // 上传文件
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  // 多文件上传
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }

  // 中途放弃(点击删除)
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  // 封装aixos的post请求
  const post = (file: File) => {
    // 封装文件信息
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // ! 无法更新成功：setFileList([_file, ...fileList])
    // 改良方式
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        // 进度计算
        let percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, { status: 'success', response: resp.data })
      console.log(resp)
      if (onSuccess) onSuccess(resp.data, file)
      if (onChange) onChange(file)
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err })
      if (onError) onError(err, file)
      if (onChange) onChange(file)
    })
  }

  return (
    <div
      className="zoulam-upload-component"
    >
      {/* 此处对input进行封装 */}
      <div className="zoulam-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}>
        {drag
          ?
          <Dragger onFile={(files) => { uploadFiles(files) }}>
            {children}
          </Dragger>
          :
          children
        }
        <input
          className="zoulam-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
  withCredentials: false
}
export default Upload;