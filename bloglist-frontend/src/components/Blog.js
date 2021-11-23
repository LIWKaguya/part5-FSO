import React from 'react'
import Togglable from './Toggable'

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog.user.username)

  return ( 
  <div style={blogStyle}>
    {blog.title} by {blog.author} <br />
    <Togglable buttonLabel='show' cancelLabel='hide'>
    {blog.url} <br />
    likes : {blog.likes} <br />
    {blog.user.username} <br />
    </Togglable>
  </div>  
  )}

export default Blog