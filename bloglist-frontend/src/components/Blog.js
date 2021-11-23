import React from 'react'
import Togglable from './Toggable'


const Blog = ({blog, updateBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updatingBlog = object => {
    updateBlog({
      ...blog, likes: blog.likes+1
    })
  }

  return ( 
  <div style={blogStyle}>
    {blog.title} by {blog.author} <br />
    <Togglable buttonLabel='show' cancelLabel='hide'>
    {blog.url} <br />
    likes : {blog.likes} <button onClick={updatingBlog}>Like</button><br />
    {blog.user.username} <br />
    </Togglable>
  </div>  
  )}

export default Blog