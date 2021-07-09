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
import { Link } from "react-router-dom";
import { TextField } from '@material-ui/core';
import axios from 'axios';


const AllCampusesView = (props) => {
  if (!props.allCampuses.length) {
    return <div>There are no campuses.</div>;
  }

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

  class AllCampusesView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        addingCampus: false,
        CampName: "",
        CampImg: "",
        CampAddress: "",
        CampDiscription: ""
      }
    }

    changeCampName = (event) => {
      this.setState({ CampName: event.target.value })
    }
    changeCampImg = (event) => {
      this.setState({ CampImg: event.target.value })
    }
    changeCampAddress = (event) => {
      this.setState({ CampAddress: event.target.value })
    }
    changeCampDiscription = (event) => {
      this.setState({ CampDiscription: event.target.value })
    }

    startAdd = () => {
      this.setState({
        addingCampus: true,
        CampName: "",
        CampImg: "",
        CampAddress: "",
        CampDiscription: "",
        registerError: ""
      })
      console.log("Starting Add")
    }

    closeAdd = () => {
      console.log("Closing Add Form")
      this.setState({ addingCampus: false })
    }

    addCampus = async (event) => {
      if (this.state.CampName === "") this.setState({ registerError: "Please enter campus name" })
      else if (this.state.CampAddress === "") this.setState({ registerError: "Please enter campus address" })
      else {
        console.log("Adding Campus: ", this.state.CampName, this.state.CampImg, this.state.CampAddress, this.state.CampDiscription)
        event.preventDefault();
        let data = {
          name: this.state.CampName,
          address: this.state.CampAddress,
          description: this.state.CampDiscription
        }
        if (this.state.CampImg != "") {
          let data = {
            name: this.state.CampName,
            imageUrl: this.state.CampImg,
            address: this.state.CampAddress,
            description: this.state.CampDiscription
          };
        }
        await axios
          .post(`/api/campuses/`, data)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
        window.location.replace(`/campuses/`);
        this.setState({ addingCampus: false })
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
                  <Link to={'/students'} >
                    <Button variant="contained" color="secondary">
                      All Students
                    </Button>
                  </Link>
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Header">
            <h1 style={{ marginLeft: '20px', fontFamily: 'Courier, sans-serif' }}>All Campuses</h1>
            <Button className="addButton" variant="contained" color="primary" onClick={this.startAdd}>
              Add Campus
            </Button>
          </div>
          <div className="List">
            {this.props.allCampuses.map((campus) => (
              <div key={campus.id} className="Item">
                <div className="Title">
                  <Link className="Name" to={`/campus/${campus.id}`}>
                    <h2>{campus.name}</h2>
                  </Link>
                  <Button className="deleteButton" variant="contained" style={{ height: '25px', marginLeft: '10px' }} onClick={() => deleteCampus(campus.id)}>
                    X
                  </Button>
                </div>
                <Link to={`/campus/${campus.id}`}>
                  <img src={campus.imageUrl} alt="Campuse Image" width="150" height="150" />
                </Link>
              </div>
            ))}
          </div>
        
          <div className="AddCampusComponent">
            <Dialog
              fullWidth
              maxWidth="md"
              open={this.state.addingCampus}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Adding Campus</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  id="CampName"
                  label="Name"
                  type="string"
                  fullWidth
                  onChange={this.changeCampName}
                />
                <TextField
                  autoFocus
                  id="CampImg"
                  label="Image Link"
                  type="string"
                  fullWidth
                  onChange={this.changeCampImg}
                />
                <TextField
                  autoFocus
                  id="CampAddress"
                  label="Address"
                  type="string"
                  fullWidth
                  onChange={this.changeCampAddress}
                />
                <TextField
                  autoFocus
                  id="CampDiscription"
                  label="Description"
                  type="string"
                  fullWidth
                  onChange={this.changeCampDiscription}
                />
                <div style={{ color: 'red' }}>
                  {this.state.registerError}
                </div>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={this.closeAdd}>
                  Close
                </Button>
                <Button variant="contained" color="primary" onClick={this.addCampus}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )
    };
  };


  AllCampusesView.propTypes = {
    allCampuses: PropTypes.array.isRequired,
  };

  export default AllCampusesView;
}