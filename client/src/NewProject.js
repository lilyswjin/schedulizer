import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import validator from 'validator';

export default class NewProject extends Component {

    state = {
        // clientList: [],
        name: "",
        startDate: new Date(),
        endDate: new Date(),
        isValid: false,
        errorMsg: ""
    }

    handleChangeStart = (date) => {
        this.setState({
          startDate: date
        })
      }
    
    handleChangeEnd = (date) => {
        this.setState({
            endDate: date
        })
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

        this.validateForm()

        if (this.state.isValid) {
            this.newProject();
       
            this.props.handleClose();
        }
    }

    newProject = () => {
        let url = `http://localhost:8080/projects`;
        let body = {
            startDate: moment(this.state.startDate).startOf("day").valueOf(),
            endDate: moment(this.state.endDate).endOf("day").valueOf(),
            clientID: this.props.clientID,
            name: this.state.name
        }

        let init = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json"
            }
        }

        fetch(url, init)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    
                    this.props.fetchProjects();
                    this.clearForm();
                

                } else {
                    this.setState({
                        errorMsg: "Internal server error. Please try again."
                    })
                }

            })
            .catch(err => console.log(err))
    }

    validateForm = () => {
        if (this.state.name !== "") {
            this.setState({
                isValid: true,
                errorMsg: ""
            })
        } else {
            this.setState({
                errorMsg: "Please enter in a project name."
            })
        }
    }

    clearForm = () => {
        this.setState({
            isValid: false,
            errorMsg: "",
            name: ""
        })
    }

    render() {

        const renderOptions = () => {
            let result;

            if (this.props.clientList) {
                result = this.props.clientList.map((client) => {
                    let option;
                    if (Number(this.props.clientID) === client.id ) {
                        option = 
                        <option key={`opt${client.id}`} value={client.id} selected="selected" > 
                            {client.name}
                        </option>
                    } else {
                        option = 
                        <option key={`opt${client.id}`} value={client.id}>
                            {client.name}
                        </option>
                    }

                    return (
                       option
                    )
                })
            } else {
                result = <option></option>
            }
            return result;
        }

        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                    <div><h1><i className="fas fa-file-alt"></i> New Project +</h1></div>
                    <form className="new__form">
                        <label>
                            Client Name: 
                            <select>
                                {renderOptions()}
                            </select>
                        </label>
                        <label>
                            Project Name: <input type="text" className="newProject__name" value={this.state.name} onChange={this.handleChange} ></input>
                        </label>
                        <label className="newProject__date">
                            <div>From: </div>
                            <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart}/>
                        </label>
                        <label className="newProject__date">
                            <div>To: </div>
                            <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd}/>
                        </label>
                        <input onClick={this.handleSubmit} type="submit"></input>
                    </form>
                    <div className=".errorMsg">{this.state.errorMsg}</div>
                </div>
            </div>
        )
    }
}

NewProject.propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  };
  
const flex = {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(57,57,57,0.6)',
    top: 0,
    left: 0
};
  
const modalLayer = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'transparent',
};
    
  
const formModal = {
    position: 'absolute',
    color: 'rgb(57,57,57)',
    backgroundColor: '#FFFFFF',
    minWidth: '50vh',
    maxWidth: '100%',
    minHeight: '70vh',
    maxHeight: '100%',
    zIndex: 2,
    borderRadius: '3px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
};
  
  
  
  