import './index.css'
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'

const SuscessMessage = ({suscessMessage}) => {
  if(suscessMessage === null) return null
  return (
    <div className="suscess">
      {suscessMessage}
    </div>
  )
}

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
  const [suscessMessage, setSuscessMessage] = useState(null)
  

  const blogFormRef = useRef()

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

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.upload(blogObj)
    setErrorMessage('aaaa')
    setBlogs(blogs.concat(returnedBlog))
    setSuscessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`)
    console.log(suscessMessage)
    console.log(errorMessage)
    // setTimeout(() => {setSuscessMessage(null)}, 5000)
  }

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

  if(user === null) {
    return (
      <>
      <ErrorMessage errorMessage={errorMessage} />
      <Togglable buttonLabel='login'>
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
      </Togglable>
      </>
    )
  }
  return (
    <div> 
      <SuscessMessage suscessMessage={suscessMessage} />
      <h2>blogs</h2>
      {user.username} logged in 
      <button onClick={() => {
        window.localStorage.clear()
        setUser(null)
      }}>log out</button>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} suscessMessage={suscessMessage}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App