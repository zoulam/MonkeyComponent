import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from './progress'


const simpleProgress = () =>
    (
        <div>
            <Progress
                percent={30}
            >
            </Progress>
            <br />
            <Progress
                percent={60}
                theme="danger"
                strokeHeight={30}
                showText={false}
            >
            </Progress>
            <br />
            <Progress
                percent={100}
                theme="dark"
            >
            </Progress>
        </div>

    )




storiesOf('progress component', module)
    .add('default progress', simpleProgress)