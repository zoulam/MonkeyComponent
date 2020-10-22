import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'
export interface ProgressProps {
  /** 样式百分比 */
  percent: number;
  /** 进度条的高度 */
  strokeHeight?: number;
  /** 是否在进度条上显示百分比数据 */
  showText?: boolean;
  /** 自定义样式对象 */
  styles?: React.CSSProperties;
  /** 填充的主题颜色 */
  theme?: ThemeProps;
}

/**
 *
 * ~~~js
 * import { Progress } from 'monkey-component'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="zoulam-progress-bar" style={styles}>
      <div className="zoulam-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div
          className={`zoulam-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;
