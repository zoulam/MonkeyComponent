import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
type fileType = "floder" | "file"

export interface treesProps {
    /** 根据type的文本添加指定icon */
    icon?: IconProp;
    /** 文件名 */
    title: string;
    /** 独一无二的标识 */
    index?: string;
    /** 菜单类型 */
    type: fileType;
    /** 是否折叠 */
    isToggle?: boolean;
    /** children */
    childrens?: treesProps[]
}

export const TreesMenu: FC<treesProps> = ({ }) => {
    let klass = classNames('zoulam-trees-menu', {

    })
    return (
        <>

        </>
    )
}


TreesMenu.defaultProps = {
    type: "file",
    isToggle: false
}

export default TreesMenu;