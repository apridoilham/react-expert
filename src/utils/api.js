import axios from 'axios'

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1'

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token)
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  async function _fetchWithAuth(url, options = {}) {
    return axios(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
  }

  async function register({ name, email, password }) {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.user
  }

  async function login({ email, password }) {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.token
  }

  async function getAllUsers() {
    const response = await axios.get(`${BASE_URL}/users`)

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.users
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`)

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.user
  }

  async function createThread({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      data: {
        title,
        body,
        category,
      },
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.thread
  }

  async function getAllThreads() {
    const response = await axios.get(`${BASE_URL}/threads`)

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.threads
  }

  async function getThreadDetail(threadId) {
    const response = await axios.get(`${BASE_URL}/threads/${threadId}`)

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.detailThread
  }

  async function createComment({ threadId, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      data: {
        content,
      },
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.comment
  }

  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function neutralizeThreadVote(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
    })

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function upVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      }
    )

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function downVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      }
    )

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function neutralizeCommentVote(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      }
    )

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.vote
  }

  async function getLeaderboards() {
    const response = await axios.get(`${BASE_URL}/leaderboards`)

    const { status, message, data } = response.data
    if (status !== 'success') {
      throw new Error(message)
    }
    return data.leaderboards
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralizeThreadVote,
    upVoteComment,
    downVoteComment,
    neutralizeCommentVote,
    getLeaderboards,
  }
})()

export default api
