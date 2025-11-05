import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncCreateThread } from '../states/threadsSlice'

function CreateThreadPage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCreateThread = (event) => {
    event.preventDefault()

    dispatch(asyncCreateThread({ title, body, category }))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        alert(`Gagal membuat thread: ${error}`)
      })
  }

  return (
    <section className='create-thread-page'>
      <h2>Buat Thread Baru</h2>
      <form className='create-thread-form' onSubmit={onCreateThread}>
        <label htmlFor='title'>Judul</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Judul thread'
          required
        />

        <label htmlFor='category'>Kategori (Opsional)</label>
        <input
          type='text'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Kategori (contoh: #redux)'
        />

        <label htmlFor='body'>Isi</label>
        <textarea
          id='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Tuliskan isi thread Anda di sini...'
          rows={10}
          required
        />

        <button type='submit'>Buat Thread</button>
      </form>
    </section>
  )
}

export default CreateThreadPage
