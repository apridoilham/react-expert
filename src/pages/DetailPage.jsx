import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/threadDetailSlice'
import CommentInput from '../components/CommentInput'
import Loading from '../components/Loading'

function DetailPage() {
  const { threadId } = useParams()
  const authUser = useSelector((state) => state.authUser.value)
  const { value: threadDetail, status, error } = useSelector((state) => state.threadDetail)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId))
  }, [threadId, dispatch])

  const onAddComment = (content) => {
    dispatch(asyncCreateComment({ threadId, content }))
      .unwrap()
      .catch((err) => alert(`Gagal menambah komentar: ${err}`))
  }

  const onUpvoteThread = () => {
    if (!authUser) {
      alert('Anda harus login untuk vote!')
      return
    }
    dispatch(asyncToggleUpvoteThreadDetail(authUser.id))
  }

  const onDownvoteThread = () => {
    if (!authUser) {
      alert('Anda harus login untuk vote!')
      return
    }
    dispatch(asyncToggleDownvoteThreadDetail(authUser.id))
  }

  const onUpvoteComment = (commentId) => {
    if (!authUser) {
      alert('Anda harus login untuk vote!')
      return
    }
    dispatch(asyncToggleUpvoteComment({ commentId, authUserId: authUser.id }))
  }

  const onDownvoteComment = (commentId) => {
    if (!authUser) {
      alert('Anda harus login untuk vote!')
      return
    }
    dispatch(asyncToggleDownvoteComment({ commentId, authUserId: authUser.id }))
  }

  if (status === 'loading' || status === 'idle' || !threadDetail) {
    return <Loading />
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>
  }

  const isThreadUpvoted = authUser ? threadDetail.upVotesBy.includes(authUser.id) : false
  const isThreadDownvoted = authUser ? threadDetail.downVotesBy.includes(authUser.id) : false

  return (
    <section className='detail-page'>
      <header className='thread-header'>
        <h1>{threadDetail.title}</h1>
        <p>Kategori: #{threadDetail.category}</p>
        <div className='thread-owner'>
          <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} />
          <span>Dibuat oleh: {threadDetail.owner.name}</span>
        </div>
        <p>Dibuat pada: {new Date(threadDetail.createdAt).toLocaleString()}</p>

        <div className='vote-buttons detail-vote'>
          <button
            type='button'
            className={`vote-button ${isThreadUpvoted ? 'voted' : ''}`}
            onClick={onUpvoteThread}
          >
            👍 ({threadDetail.upVotesBy.length})
          </button>
          <button
            type='button'
            className={`vote-button ${isThreadDownvoted ? 'voted' : ''}`}
            onClick={onDownvoteThread}
          >
            👎 ({threadDetail.downVotesBy.length})
          </button>
        </div>
      </header>

      <article className='thread-body' dangerouslySetInnerHTML={{ __html: threadDetail.body }} />

      <section className='comments-section'>
        <h2>Komentar ({threadDetail.comments.length})</h2>

        {authUser ? (
          <CommentInput onAddComment={onAddComment} />
        ) : (
          <p>
            Anda harus <a href='/login'>login</a> untuk berkomentar.
          </p>
        )}

        <div className='comments-list'>
          {threadDetail.comments.map((comment) => {
            const isCommentUpvoted = authUser ? comment.upVotesBy.includes(authUser.id) : false
            const isCommentDownvoted = authUser ? comment.downVotesBy.includes(authUser.id) : false

            return (
              <div key={comment.id} className='comment-item'>
                <header className='comment-header'>
                  <img src={comment.owner.avatar} alt={comment.owner.name} />
                  <strong>{comment.owner.name}</strong>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </header>
                <div
                  className='comment-body'
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
                <footer className='comment-footer'>
                  <div className='vote-buttons'>
                    <button
                      type='button'
                      className={`vote-button ${isCommentUpvoted ? 'voted' : ''}`}
                      onClick={() => onUpvoteComment(comment.id)}
                    >
                      👍 ({comment.upVotesBy.length})
                    </button>
                    <button
                      type='button'
                      className={`vote-button ${isCommentDownvoted ? 'voted' : ''}`}
                      onClick={() => onDownvoteComment(comment.id)}
                    >
                      👎 ({comment.downVotesBy.length})
                    </button>
                  </div>
                </footer>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default DetailPage
