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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        username, password
      })
      setUser(userLogin)
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(userLogin)
      )
    } catch (ex) {
      setErrorMessage('Wrong user name or password')
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
      <h2>blogs</h2>
      {user.username} logged in 
      <button onClick={(event) => {
        setUsername('')
        setPassword('')
        setUser(null)
      }}>log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App