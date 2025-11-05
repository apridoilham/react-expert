import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveLeaderboards } from '../states/leaderboardsSlice'
import Loading from '../components/Loading'

function LeaderboardPage() {
  const { list: leaderboards, status, error } = useSelector((state) => state.leaderboards)

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(asyncReceiveLeaderboards())
    }
  }, [status, dispatch])

  if (status === 'loading' || status === 'idle') {
    return <Loading />
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>
  }

  return (
    <section className='leaderboard-page'>
      <h2>Peringkat Pengguna Aktif</h2>
      <div className='leaderboard-list'>
        <header className='leaderboard-header'>
          <span>Pengguna</span>
          <span>Skor</span>
        </header>
        {leaderboards.map((item) => (
          <div key={item.user.id} className='leaderboard-item'>
            <div className='user-info'>
              <img src={item.user.avatar} alt={item.user.name} />
              <span>{item.user.name}</span>
            </div>
            <strong>{item.score}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LeaderboardPage
