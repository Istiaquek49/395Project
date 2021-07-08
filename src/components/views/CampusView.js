import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import axios from "axios";

const deleteCampus = async (id) => {
  await axios
    .delete(`/api/campuses/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  window.location.replace(`/campuses`);
};


const CampusView = (props) => {
  const {campus} = props;
  return (
    <div>      
    <div className="navigationBar" >
      <AppBar position="static" elevation={0} style={{backgroundColor: '#ffdc40', shadows:'none'}}>
        <Toolbar style={{display:'flex',justifyContent:'space-evenly'}}>
          <Link to={'/'} >
            <Typography variant="h6" style={{textAlign:'left', fontType: 'bold', fontFamily: 'OCR A Std, monospace', fontSize: '30px', color: '#000000'}}>
              CRUD App
            </Typography>
          </Link>
          <div className="navButtons">
            <Link to={'/campuses'} >
              <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
                All Campuses
              </Button>
            </Link>
            <Link to={'/students'} >
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
        <h1>{campus.name}</h1>
        <Button variant="contained" onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </Button>
      </div>
      <img src={campus.imageUrl} alt="Campus Image" width="150" height="150" />
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>

      <h2>Students on campus</h2>
      <ul>
      {campus.students.map( student => {
        let name = student.firstname + ", " + student.lastname;
        return (
          <li key={student.id}>
            <Link to={`/student/${student.id}`}>
                <p>{name}</p>
            </Link>
            <img src={student.imageUrl} alt="Student Image" width="150" height="150" />
            </li>
        );
      })}
      </ul>
    </div>
  </div>
  );

};

export default CampusView;