import { React, useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={handleBlog}>
        <h2>Creating new blog</h2>
        Title:<input type='text' id='title' value={title} onChange={({ target }) => setTitle(target.value)}/><br />
        Author:<input type='text' id='author' value={author} onChange={({ target }) => setAuthor(target.value)}/><br />
        Url:<input type='text' id='url' value={url} onChange={({ target }) => setUrl(target.value)}/><br />
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default BlogForm