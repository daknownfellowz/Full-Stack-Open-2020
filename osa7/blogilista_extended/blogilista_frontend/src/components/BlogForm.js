import React,{ useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Paper,
} from "@mui/material"
import PropTypes from 'prop-types'

const BlogForm = ({ blogAdder }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChangeTitle = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }

  const handleChangeAuthor = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleChangeUrl = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogAdder({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2 className="header">create new</h2>

      <form onSubmit={addBlog}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>title:</TableCell>
              <TableCell>
              <input
                id='title'
                placeholder='Title'
                value={newTitle}
                onChange={handleChangeTitle}
              />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>author:</TableCell>
              <TableCell>
              <input
                id='author'
                placeholder='Author'
                value={newAuthor}
                onChange={handleChangeAuthor}
              />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>url:</TableCell>
              <TableCell>
              <input
                id='url'
                placeholder='Url'
                value={newUrl}
                onChange={handleChangeUrl}
              />
              </TableCell>
            </TableRow>
            <Button variant="contained" color="primary" type="submit" id="create">
            create
            </Button>


            </TableBody>
          </Table>
        </TableContainer>
      </form>

    </div>
  )
}

BlogForm.propTypes = {
  handleChangeTitle: PropTypes.func.isRequired
}

export default BlogForm