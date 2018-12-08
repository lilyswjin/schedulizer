import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

export default class NewEmployee extends Component {
    state = {
        formData: {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            province: "",
            country: "",
            postCode: "",
        },
        formErrors: {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            province: "",
            country: "",
            postCode: "",
        },
        isValid: false,
        errorMsg: ""
    }

    handleInputChange = (e) => {
        let formData = {...this.state.formData}
        if (e.target.name !== undefined && e.target.value !== undefined) {
          formData[e.target.name] = e.target.value
          
            this.setState({
                formData: formData
            })
        } 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateForm();
    
        if (this.state.isValid) {
            this.newEmployee();
            this.clearForm();
        }
    }

    newEmployee = () => {
        let addressString = (Object.values(this.state.formData).splice(2,5)).join(", ");
        console.log(addressString)

        let url = `http://localhost:8080/employees`;
        let body = {
            address: addressString,
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName
        }
        console.log(body)

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
            })
            .catch(err => console.log(err))
    }


    validateForm = (e) => {
        // declare RegEx conditions
        let streetAddress = new RegExp(/^\s*\S+(?:\s+\S+){2}/);

        let data = this.state.formData;

        let isValid = {
            firstName: false,
            lastName: false,
            street: false,
            city: false,
            province: false,
            country: false,
            postCode: false,
        }

        let errMsg = {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            province: "",
            country: "",
            postCode: ""
        }

        let isBlank = true;

        // check for blanks
        for (let key in data) {
            if (data[key] !== null && data[key] !== "") {
                isBlank = false;
            } else {
                errMsg[key] = "Field cannot be blank!"
            }
        }
     
        if (!isBlank) {
            // check for valid postal code
            if (validator.isPostalCode(data.postCode, 'CA') || validator.isPostalCode(data.postCode, 'US') ) {
                isValid.postCode = true;
            } else {
                errMsg.postCode = "Invalid postal/zip code"
            }
        
            // check for valid street address
            if (streetAddress.test(data.street)) {
                isValid.street = true;
            } else {
                errMsg.street = "Invalid address"
            }


            // check for valid alpha characters in name
            if (validator.isAlpha(data.firstName) ) {
                isValid.firstName = true;
            }  else {
                errMsg.firstName = "Invalid characters in name"
            }

            if (validator.isAlpha(data.lastName) ) {
                isValid.lastName = true;
            } else {
                errMsg.lastName = "Invalid characters in name"
            }

            // check for valid alpha characters in city
            if (validator.isAlpha(data.city) ) {
                isValid.city = true;
            } else {
                errMsg.city = "Invalid characters in city"
            }

            // check for valid alpha characters in province
            if (validator.isAlpha(data.province) ) {
                isValid.province = true;
            } else {
                errMsg.province = "Invalid characters in province"
            }

             // check for valid alpha characters in country
             if (validator.isAlpha(data.country) ) {
                isValid.country = true;
            } else {
                errMsg.country = "Invalid selection!"
            }
        }

        // if all conditions true, set state to isValid
        let result = true;
        for (let key in isValid) {
            if (isValid[key] === false ) {
                result = false;
                break;
            } 
        }

        if (result === true) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                formErrors: errMsg
            })
        }

    }

    clearForm = (e) => {
        this.setState({
            formData: {
                firstName: "",
                lastName: "",
                street: "",
                city: "",
                province: "",
                country: "",
                postCode: "",
            },
            formErrors: {
                firstName: "",
                lastName: "",
                street: "",
                city: "",
                province: "",
                country: "",
                postCode: "",
            },
            isValid: false,
            errorMsg: ""
        })
    }

    render() {

        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                    <h1><i className="fas fa-male"></i> New Employee +</h1>
                    <form className="new__form">
                        <label className="new__name">
                            <div>Name</div>
                            <input name="firstName" placeholder="First Name" type="text" value={this.state.formData.firstName} onChange={this.handleInputChange}></input>
                            <div className="errorMsg">{this.state.formErrors.firstName}</div>
                            <input name="lastName" placeholder="Last Name" type="text" value={this.state.formData.lastName} onChange={this.handleInputChange}></input>
                            <div className="errorMsg">{this.state.formErrors.lastName}</div>
                        </label>
                        <label className="address">
                            <div>Address</div>
                            <input name="street" type="text" placeholder="Street Number & Name" value={this.state.formData.street} onChange={this.handleInputChange} ></input>
                            <div className="errorMsg">{this.state.formErrors.street}</div>
                            <input name="city" placeholder="City" type="text" value={this.state.formData.city} onChange={this.handleInputChange} ></input>
                            <div className="errorMsg">{this.state.formErrors.city}</div>
                            <input name="province" placeholder="Province" type="text" value={this.state.formData.province} onChange={this.handleInputChange} ></input>
                            <div className="errorMsg">{this.state.formErrors.province}</div>
                            <select name="country" value={this.state.formData.country} onChange={this.handleInputChange}>
                                <option disabled hidden style={{display: "none"}} >Select Country</option>
                                <option className="country" value="" disabled >Select Country</option>
                                <option value="CAN">Canada</option>
                                <option value="USA">United States</option>
                            </select>
                            <div className="errorMsg">{this.state.formErrors.country}</div>
                            <input name="postCode" placeholder="Postal Code" type="text" value={this.state.formData.postCode} onChange={this.handleInputChange} ></input>
                            <div className="errorMsg">{this.state.formErrors.postCode}</div>
                        </label>
                        <input onClick={this.handleSubmit} type="submit"></input>
                    </form>
                </div>
            </div>
      
        )
    }
}

NewEmployee.propTypes = {
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




