import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import axios from "axios";

const StudentView = (props) => {
  const { student } = props;

  const deleteStudent = async (id) => {
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

  return (
    <div>      
    <div className="navigationBar" >
        <AppBar position="static" elevation={0} style={{backgroundColor: '#ffdc40', shadows:'none'}}>
          <Toolbar style={{display:'flex',justifyContent:'space-evanly'}}>
            <Link to={'/'}  >
              <Typography variant="h6" style={{textAlign:'left', fontType: 'bold', fontFamily: 'OCR A Std, monospace', fontSize: '30px', color:"#000000"}}>
                CRUD App
              </Typography>
            </Link>
          <div className="navButtons">
            <Link to={'/campuses'}  >
              <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
                All Campuses
              </Button>
            </Link>
            <Link to={'/students'}  >
              <Button variant="contained" color="secondary">
                All Students
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
    <div className="Body">
      <div className="Header">
        <h1>{student.firstname} {student.lastname}</h1>
        <Button variant="contained" onClick={() => deleteStudent(student.id)}>
          Delete Student
        </Button>
      </div>
      <img src={student.imageUrl} alt="Student Image" width="150" height="150" />
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa===null||student.gpa===undefined ? ("No GPA given") : (student.gpa)}</p>
      <div className="studentCampus">
        <h2>Campus</h2>
        {student.campus===null||student.campus===undefined ? ("The student is not in any campus") : (<Link to={`/campus/${student.campusId}`}>{student.campus.name}</Link>)}
      </div>
    </div>
  </div>
  );
};


export default StudentView;
