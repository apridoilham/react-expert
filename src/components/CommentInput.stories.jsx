import React from 'react'
import CommentInput from './CommentInput'
// Hapus Provider, configureStore, dan BrowserRouter

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  decorators: [
    (Story) => (
      // Hapus wrapper Provider dan BrowserRouter
      <div style={{ backgroundColor: '#0f0f12', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onAddComment: { action: 'commentSubmitted' },
  },
}

// Hapus mock store

const Template = (args) => <CommentInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onAddComment: () => {
    console.log('Comment Submitted!')
  },
}