import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import { TextField } from '@material-ui/core';

import axios from "axios";

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;

  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to={`student/new`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }
  
  const onDelete = async (id) => {
    await axios
      .delete(`/api/students/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.replace(`/students`);
  };

  class AllStudentsView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        addingStudent: false,
        studfirstname: "",
        studlastname: "",
        studEmail: "",
        studGPA: 0.0,
        studImg: "",
        registerError: ""
      }
    }

    changeFirstName = (event) => {
      this.setState({ studfirstname: event.target.value })
    }
    changeLastName = (event) => {
      this.setState({ studlastname: event.target.value })
    }
    changeEmail = (event) => {
      this.setState({ studEmail: event.target.value })
    }
    changeGPA = (event) => {
      this.setState({ studGPA: event.target.value })
    }
    changestudImg = (event) => {
      this.setState({ studImg: event.target.value })
    }

    startSAdd = () => {
      this.setState({
        addingStudent: true,
        studfirstname: "",
        studlastname: "",
        studEmail: "",
        studGPA: null,
        studImg: ""
      })
      console.log("Starting Add Student")
    }

    closeSAdd = () => {
      console.log("Closing Add Student Form")
      this.setState({ addingStudent: false })
    }

    addStudent = async (event) => {
      if (this.state.studfirstname === "") this.setState({ registerError: "Please enter the student's name" })
      if (this.state.studlastname === "") this.setState({ registerError: "Please enter the student's name" })
      else if (this.state.studEmail === "") this.setState({ registerError: "Please enter the student's email" })
      else {
        console.log("Adding Student: ", this.state.studfirstname, this.state.studlastname, this.state.studEmail, this.state.studGPA, this.state.studImg)
        event.preventDefault();
        let data = {
          firstname: this.state.studfirstname,
          lastname: this.state.studlastname,
          email: this.state.studEmail,
          gpa: this.state.studGPA,
          imageUrl: this.state.studImg
        }
        await axios
          .post(`/api/students/`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        window.location.replace(`/students/`);
        this.setState({ addingStudent: false })
      }
    }

    render() {
      return (
        <div>
          <div className="navigationBar">
            <AppBar position="static" elevation={0} style={{ backgroundColor: '#ffdc40', shadows: 'none' }}>
              <Toolbar style={{ display: 'flex', justifyContent: 'space-evanly' }}>
                <Link to={'/'}  >
                  <Typography variant="h6" style={{ textAlign: 'left', fontType: 'bold', fontFamily: 'OCR A Std, monospace', fontSize: '30px', color: "#000000" }}>
                    CRUD App
                  </Typography>
                </Link>
                <div className="navButtons">
                  <Link to={'/campuses'}  >
                    <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                      All Campuses
                    </Button>
                  </Link>
                  <Link to={'/students'}>
                    <Button variant="contained" color="primary">
                      All Students
                    </Button>
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Header">
            <h1 style={{ marginLeft: '20px', fontFamily: 'OCR A Std, monospace' }}>All Students</h1>
            <Button variant="contained" color="primary" onClick={this.startSAdd}>
              Add Student
            </Button>
          </div>
          <div className="List">
            {this.props.allStudents.map((student) => (
              <div className="studentList Item" key={student.id}>
                <div className="Title">
                  <Link className="Name" to={`/student/${student.id}`}>
                    <h2>{student.firstname} {student.lastname}</h2>
                  </Link>
                  <Button className="deleteButton" variant="contained" style={{ height: '25px', marginLeft: '10px' }} onClick={() => onDelete(student.id)}>
                    X
                  </Button>
                </div>
                <Link to={`/student/${student.id}`}>
                  <img src={student.imageUrl} alt="No photo provided" width="150" height="150" />
                </Link>
              </div>
            ))}
          </div>
            
          <div className="AddStudentComponent">
            <Dialog
              fullWidth
              maxWidth="md"
              open={this.state.addingStudent}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Adding Student</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  id="studfirstname"
                  label="First Name"
                  type="string"
                  fullWidth
                  onChange={this.changeFirstName}
                />
                <TextField
                  autoFocus
                  id="studlastname"
                  label="Last Name"
                  type="string"
                  fullWidth
                  onChange={this.changeLastName}
                />
                <TextField
                  autoFocus
                  id="studEmail"
                  label="Email"
                  type="string"
                  fullWidth
                  onChange={this.changeEmail}
                />
                <TextField
                  autoFocus
                  id="studGPA"
                  label="GPA"
                  type="decimal"
                  fullWidth
                  onChange={this.changeGPA}
                />
                <TextField
                  autoFocus
                  id="studImg"
                  label="Image Link"
                  type="string"
                  fullWidth
                  onChange={this.changestudImg}
                />
                <div style={{ color: 'red' }}>
                  {this.state.registerError}
                </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={this.closeSAdd}>
                  Close
                </Button>
                <Button variant="contained" color="primary" onClick={this.addStudent}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )
    };
  };

  AllStudentsView.propTypes = {
    allStudents: PropTypes.array.isRequired,
  };

  export default AllStudentsView;
}
