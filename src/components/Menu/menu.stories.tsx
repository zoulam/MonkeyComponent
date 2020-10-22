import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'

export const defaultMenu = () => (
  <div>
    <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} >
      <MenuItem>
        cool link
    </MenuItem>
      <MenuItem disabled>
        disabled
    </MenuItem>
      <MenuItem>
        cool link 2
    </MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>
          子菜单1
    </MenuItem>
        <MenuItem >
          子菜单2
    </MenuItem>
        <MenuItem>
          子菜单3
    </MenuItem>
      </SubMenu>
    </Menu>
  </div>
)


const vertialMenu = () => (
  <div>
    <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} mode="vertical">
      <MenuItem>
        cool link
    </MenuItem>
      <MenuItem disabled>
        disabled
    </MenuItem>
      <MenuItem>
        cool link 2
    </MenuItem>
      <SubMenu title="垂直方向的下拉菜单" >
        <MenuItem>
          子菜单1
  </MenuItem>
        <MenuItem >
          子菜单2
  </MenuItem>
        <MenuItem>
          子菜单3
  </MenuItem>
      </SubMenu>
    </Menu>
  </div>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('vertial menu', vertialMenu)