import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const ErrorMessage = ({errorMessage}) => {
  if(errorMessage === null) return null
  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const SuscessMessage = ({suscessMessage}) => {
  if(suscessMessage === null) return null
  return (
    <div className="suscess">
      {suscessMessage}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [suscessMessage, setSuscessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username, password
      })
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(userLogin)
      )
    } catch (ex) {
      setErrorMessage('Wrong user name or password')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.upload({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setUrl('')
      setAuthor('')
      setSuscessMessage(`a new blog ${blog.title} by ${blog.author} is added`)
      setTimeout(() => {setSuscessMessage(null)}, 5000)
    } catch(ex) {
      setErrorMessage('Invalid input')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  if(user === null) {
    return (
      <>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }
  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />
      <SuscessMessage suscessMessage={suscessMessage} />
      <h2>blogs</h2>
      {user.username} logged in 
      <button onClick={() => {
        window.localStorage.clear()
        setUser(null)
      }}>log out</button>
      <form onSubmit={handleBlog}>
        <h2>Creating new blog</h2>
        Title:<input type='text' value={title} onChange={({target}) => setTitle(target.value)}/><br />
        Author:<input type='text' value={author} onChange={({target}) => setAuthor(target.value)}/><br />
        Url:<input type='text' value={url} onChange={({target}) => setUrl(target.value)}/><br />
        <button type='submit'>Create</button>
      </form>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App