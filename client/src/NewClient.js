import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewClient extends Component {
    state = {
        name: "",
        street: "",
        city: "",
        province: "",
        country: "",
        postCode: "",
        isValid: false,
        errorMsg: ""
    }

    handleInputChange = (e) => {
        if (e.target.name !== undefined && e.target.value !== undefined) {
          this.setState({
            [e.target.name]: e.target.value
          })
        } 
    }

    render() {
        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                    <div><h1><i className="fas fa-building"></i> New Client +</h1></div>
                    <form className="new__form">
                        <label className="new__name">
                            <div>Name</div>
                            <input name="name" type="text" placeholder="Client Name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="address">
                            <div>Address</div>
                            <input name="street" type="text" placeholder="Street Number & Name" value={this.state.street} onChange={this.handleInputChange} ></input>
                            <input name="city" placeholder="City" type="text" value={this.state.city} onChange={this.handleInputChange} ></input>
                            <input name="province" placeholder="Province" type="text" value={this.state.province} onChange={this.handleInputChange} ></input>
                            <select name="country" value={this.state.country} onChange={this.handleInputChange}>
                                <option disabled hidden style={{display: "none"}} >Select Country</option>
                                <option className="country" value="" disabled >Select Country</option>
                                <option value="CAN">Canada</option>
                                <option value="USA">United States</option>
                            </select>
                            <input name="postCode" placeholder="Postal Code" type="text" value={this.state.postCode} onChange={this.handleInputChange} ></input>
                        </label>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
      
        )
    }
}

NewClient.propTypes = {
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
    backgroundColor: 'transparent'
  };
  
  const formModal = {
    position: 'absolute',
    color: 'rgb(57,57,57)',
    backgroundColor: '#FFFFFF',
    minWidth: '50vh',
    maxWidth: '100%',
    minHeight: '50vh',
    maxHeight: '100%',
    zIndex: 2,
    borderRadius: '3px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };



