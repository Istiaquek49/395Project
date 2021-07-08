import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const CampusView = (props) => {
  const {campus} = props;
  return (
    <div>      
      <h1>{campus.name}</h1>
      <p>{campus.description}</p>
      <ul>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <li key={student.id}>{name}</li>
        );
      })}
      </ul>
    </div>
  );

};

export default CampusView;