import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 monkey-component</h1>
        <strong>这是一个基于React Hook 和 typescript开发的组件库</strong><br/>
        安装：<code>npm install monkey-component --save</code>
      </>
    )
  }, { info: { disable: true } })