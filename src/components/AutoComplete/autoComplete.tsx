import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

// 传入的数据类型的难以确定的
interface DataSourceObject {
  /** 数据值 */
  value: string;
}
// 利用泛型在使用时确定
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 自定义数据获取函数(即过滤行为)  */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选定数据后的回调函数 */
  onSelect?: (item: DataSourceType) => void;
  /** 渲染模板 可自定义（需要包含sring类型的value） */
  renderOption?: (item: DataSourceType) => ReactElement;
}


/**
 *
 * **此处搜索内容接入GitHub的搜索框**
 * ~~~js
 * import { AutoComplete } from 'monkey-component'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSugestions] = useState<DataSourceType[]>([]) // 需要渲染的数组
  const [loading, setLoading] = useState(false) // 是否显示loading图标
  const [showDropdown, setShowDropdown] = useState(false)//  下拉显示
  const [highlightIndex, setHighlightIndex] = useState(-1)// 高亮条目
  const triggerSearch = useRef(false) // 避免反复搜索
  const componentRef = useRef<HTMLDivElement>(null)// 点击非组件范围，收起下拉列表
  const debouncedValue = useDebounce(inputValue, 300) // 防抖
  useClickOutside(componentRef, () => { setSugestions([]) })
  // 支持异步
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSugestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSugestions(results)
        setShowDropdown(true)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  // 高亮的选择逻辑
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  // 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // esc
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      // ⬆
      case 38:
        highlight(highlightIndex - 1)
        break
      // ⬇
      case 40:
        highlight(highlightIndex + 1)
        break
      // enter
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  // 选择之后的操作
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  // 匹配模板渲染和普通渲染
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  // 数据展示
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => { setSugestions([]) }}
      >
        <ul className="zoulam-suggestion-list">
          {/* 添加loadingicon */}
          {loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          }
          {suggestions.map((item, index) => {
            // 高亮类名
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="zoulam-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete;

