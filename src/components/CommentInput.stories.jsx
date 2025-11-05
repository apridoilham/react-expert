import CommentInput from './CommentInput'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
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
  argTypes: {
    onAddComment: { action: 'commentSubmitted' },
  },
}

const store = configureStore({
  reducer: {},
})

const Template = (args) => <CommentInput {...args} />

export const Default = Template.bind({})
Default.args = {
  onAddComment: () => {},
}