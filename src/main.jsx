import React from 'react'
import { render } from 'react-dom'
import { install } from 'offline-plugin/runtime'
import { whyDidYouUpdate } from 'why-did-you-update'
import configureStore from './configureStore'
import Root from 'containers/Root'
import 'styles/styles.global.css'

install()

if (!__PROD__) {
  whyDidYouUpdate(React, {
    exclude: /^Connect/
  })
}

const store = configureStore()

render(<Root store={store} />, document.getElementById('app'))
