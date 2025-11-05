import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CommentInput({ onAddComment }) {
  const [content, setContent] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    onAddComment(content)
    setContent('')
  }

  return (
    <form className='comment-input-form' onSubmit={onSubmit}>
      <label htmlFor='commentBody'>Beri komentar:</label>
      <textarea
        id='commentBody'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Tuliskan komentar Anda...'
        rows={5}
        required
      />
      <button type='submit'>Kirim</button>
    </form>
  )
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
}

export default CommentInput
