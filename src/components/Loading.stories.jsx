import React from 'react'
import Loading from './Loading'
// Hapus Provider, configureStore, dan BrowserRouter

// Hapus mock store

export default {
  title: 'Components/Loading',
  component: Loading,
  decorators: [
    (Story) => (
      // Hapus wrapper Provider dan BrowserRouter
      <div style={{ backgroundColor: '#0f0f12', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {}