import { useSelector } from 'react-redux'
import Blog from './Blog'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  
  return (
    <div>
      <h2 className="header">blogs</h2>

      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>          
                <Blog key={blog.id} blog={blog} />
              </TableCell>
              <TableCell>
                {blog.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default BlogList