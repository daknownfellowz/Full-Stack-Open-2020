import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {    
    const handleChange = (event) => {      
      
      console.log('Filter: ', event.target.value)
      props.filter(event.target.value)
      
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

  const mapStateToProps = (state) => {
    return {
      filter: state.filter,
    };
  };
  
  const StateToFilter = connect(mapStateToProps, { filter }) (Filter)
  export default StateToFilter