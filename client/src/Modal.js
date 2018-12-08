import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    render() {
        return (
            <div style={{...flex, display: this.props.isOpen ? 'flex' : 'none'}}>
                <div className='modal-layer' onClick={this.props.handleClose} style={modalLayer}></div>
                <div className="form-container" style={formModal}>
                    <h1>Test Modal</h1>
                    {/* Insert Component here */}
                    <form>
                    </form>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default Modal;

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
    width: '85vh',
    maxWidth: '100%',
    height: '85vh',
    maxHeight: '100%',
    zIndex: 2,
    borderRadius: '3px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  };



