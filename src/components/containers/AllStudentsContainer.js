import { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchAllStudentsThunk} from "../../store/thunks";
import {AllStudentsView} from "../views";

class AllStudentsContainer extends Component {
  componentDidMount(){
    console.log(this.props);
    this.props.fetchAllStudents();
  }

  render(){
    return(
      <AllStudentsView 
        allStudents={this.props.allStudents}
      />
    );
  }
}

//map state to props
const mapState = (state) => {
  return {
    allStudents: state.allStudents,
  };
};

//map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () =>dispatch(fetchAllStudentsThunk()),
  };
};

//check prop types
AllStudentsContainer.propTypes = {
  allStudents: PropTypes.array.isRequired,
  fetchAllStudentsThunk: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(AllStudentsContainer);