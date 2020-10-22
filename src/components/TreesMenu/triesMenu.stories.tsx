import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TreesMenu, { treesProps } from './triesMenu'

let mockChildrens: treesProps[] = [
    {
        title: '1',
        index: "1",
        type: "floder",
        isToggle: false,
        childrens: [
            {
                title: '1-1',
                index: "1-1",
                type: "file",
                isToggle: false
            },
            {
                title: '1-2',
                index: "1-2",
                type: "floder",
                isToggle: false,
                childrens: [
                    {
                        title: '1-2-1',
                        index: "1-2-1",
                        type: "file",
                        isToggle: false,
                    }
                ]
            }
        ]
    },
    {
        title: '2',
        index: "2",
        type: "file",
        isToggle: false
    },
    {
        title: '3',
        index: "3",
        type: "file",
        isToggle: false
    }
]

const defaultTreesMenu = () => {
    return (
        <div>
            <TreesMenu title="father"  isToggle={true} type="floder" childrens={mockChildrens} />
        </div>
    )
}


storiesOf('treesMenu component', module)
    .add('default trees', defaultTreesMenu)
