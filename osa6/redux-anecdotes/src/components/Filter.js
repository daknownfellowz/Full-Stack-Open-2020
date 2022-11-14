import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = ({ filter }) => {    
    const handleChange = (event) => {      
      
      console.log('Filter: ', event.target.value)
      filter(event.target.value)
      
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const stateToProps = (state) => {
    return {
      filter: state.filter,
    };
  };
  
  const StateToFilter = connect(stateToProps, { filter }) (Filter)
  export default StateToFilter

