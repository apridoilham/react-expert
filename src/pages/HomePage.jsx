import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  asyncReceiveThreads,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
} from '../states/threadsSlice'
import { asyncReceiveUsers } from '../states/usersSlice'
import { setFilterCategory } from '../states/filterSlice'
import Loading from '../components/Loading'

function HomePage() {
  const {
    list: threads,
    status: threadsStatus,
    error: threadsError,
  } = useSelector((state) => state.threads)

  const {
    list: users,
    status: usersStatus,
    error: usersError,
  } = useSelector((state) => state.users)

  const authUser = useSelector((state) => state.authUser.value)
  const activeCategory = useSelector((state) => state.filter.activeCategory)

  const dispatch = useDispatch()

  useEffect(() => {
    if (threadsStatus === 'idle') {
      dispatch(asyncReceiveThreads())
    }
    if (usersStatus === 'idle') {
      dispatch(asyncReceiveUsers())
    }
  }, [threadsStatus, usersStatus, dispatch])

  const onUpvote = (threadId) => {
    if (!authUser) return alert('Anda harus login untuk vote!')
    dispatch(asyncToggleUpvoteThread({ threadId, authUserId: authUser.id }))
  }

  const onDownvote = (threadId) => {
    if (!authUser) return alert('Anda harus login untuk vote!')
    dispatch(asyncToggleDownvoteThread({ threadId, authUserId: authUser.id }))
  }

  const onFilterCategory = (category) => {
    dispatch(setFilterCategory(category))
  }

  if (
    threadsStatus === 'loading' ||
    usersStatus === 'loading' ||
    threadsStatus === 'idle' ||
    usersStatus === 'idle'
  ) {
    return <Loading />
  }

  if (threadsStatus === 'failed') {
    return <p>Error loading threads: {threadsError}</p>
  }
  if (usersStatus === 'failed') {
    return <p>Error loading users: {usersError}</p>
  }

  const threadsWithOwners = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId) || { name: 'Unknown', avatar: '' },
  }))

  const categories = threadsWithOwners.map((thread) => thread.category)
  const uniqueCategories = [...new Set(categories.filter(Boolean))]

  const filteredThreads = activeCategory
    ? threadsWithOwners.filter((thread) => thread.category === activeCategory)
    : threadsWithOwners

  return (
    <div className='home-page'>
      <div className='home-header'>
        <h2>Daftar Thread</h2>
        {authUser && (
          <Link to='/create-thread' className='create-thread-button'>
            + Buat Thread Baru
          </Link>
        )}
      </div>

      <div className='category-filter-list'>
        <button
          type='button'
          className={`category-item ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => onFilterCategory('')}
        >
          Semua
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            type='button'
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onFilterCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>

      <div className='threads-list'>
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => {
            const isUpvoted = authUser ? thread.upVotesBy.includes(authUser.id) : false
            const isDownvoted = authUser ? thread.downVotesBy.includes(authUser.id) : false

            return (
              <article key={thread.id} className='thread-item'>
                <header className='thread-item-header'>
                  <div className='thread-owner-info'>
                    <img src={thread.owner.avatar} alt={thread.owner.name} />
                    <span>{thread.owner.name}</span>
                  </div>
                  <h3>
                    <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
                  </h3>
                  <p className='thread-category'>#{thread.category}</p>
                </header>

                <div
                  className='thread-body'
                  dangerouslySetInnerHTML={{ __html: thread.body.substring(0, 150) + '...' }}
                />
                <footer className='thread-footer'>
                  <div className='vote-buttons'>
                    <button
                      type='button'
                      className={`vote-button ${isUpvoted ? 'voted' : ''}`}
                      onClick={() => onUpvote(thread.id)}
                    >
                      👍 ({thread.upVotesBy.length})
                    </button>
                    <button
                      type='button'
                      className={`vote-button ${isDownvoted ? 'voted' : ''}`}
                      onClick={() => onDownvote(thread.id)}
                    >
                      👎 ({thread.downVotesBy.length})
                    </button>
                  </div>
                  <p>Komentar: {thread.totalComments}</p>
                  <p>Dibuat pada: {new Date(thread.createdAt).toLocaleDateString()}</p>
                </footer>
              </article>
            )
          })
        ) : (
          <p>Tidak ada thread dalam kategori ini.</p>
        )}
      </div>
    </div>
  )
}

export default HomePage
