import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
  Label,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
        cancel
        </Button>
        


      </div>
      <div style={showWhenVisible}>
        {props.children}
        
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
        cancel
        </Button>
        
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable