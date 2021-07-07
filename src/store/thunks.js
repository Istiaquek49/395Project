import * as ac from './actions/actionCreators';
const axios = require('axios');

// THUNKS

//All campuses
export const fetchAllCampusesThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/campuses`);
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

//Single campus
export const fetchCampusThunk = (id) => async (dispatch) => {
  // thunk creator would not an be async function 
  // if using Promise.then:
  // return axios
  //   .get(`/api/campuses/${id}`)
  //   .then((res) => res.data)
  //   .then((campus) => dispatch(ac.fetchCampus(campus)))
  //   .catch((err) => console.log(err));
  try {
    let res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

//All students
export const fetchAllStudentsThunk = () => async (dispatch) => {
  try {
    let res = await axios.get(`/api/students`);
    dispatch(ac.fetchAllStudents(res.data));
  } catch(err) {
    console.error(err);
  }
};

export const addStudentThunk = (student) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/students`, student);
    dispatch(ac.addStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};

export const deleteStudentThunk = studentId => async dispatch => {
  try {
    await axios.delete(`/api/students/${studentId}`);
    //delete succesful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch(err) {
    console.error(err);
  }
};

export const editStudentThunk = student => async dispatch => {
  try {
    let updatedStudent = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(updatedStudent));
  } catch(err) {
    console.error(err);
  }
};

//Single student
export const fetchStudentThunk = id => async dispatch => {
  try {
    let res = await axios.get(`/api/students/${id}`);
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};

//Add campus thunk
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    let res = await axios.post(`/api/campuses`, campus);
    dispatch(ac.addCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

//Delete campus thunk
export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.log(err);
  }
};

//Edit campus information thunk
export const editCampusThunk = campus => async dispatch => {
  try {
    let updatedCampus = await axios.put(`/api/campuses/${campus}`, campus);
    dispatch(ac.editCampus(updatedCampus));
  } catch(err) {
    console.error(err);
  }
};