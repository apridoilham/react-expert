import React from 'react'
import Loading from './Loading'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: {},
})

export default {
  title: 'Components/Loading',
  component: Loading,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <BrowserRouter>
          <div style={{ backgroundColor: '#0f0f12', padding: '2rem' }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
}

const Template = (args) => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {}