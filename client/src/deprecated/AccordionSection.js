import React, { Component } from 'react'
import PropTypes from 'prop-types';

class AccordionSection extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Object).isRequired,
      isOpen: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    };
  
    onClick = () => {
      this.props.onClick(this.props.label);
    };
  
    render() {
      const {
        onClick,
        props: { isOpen, label },
      } = this;
  
    return (
        <div className="accordion__section">
          <div onClick={onClick} style={{ cursor: 'pointer' }}>
            {label}
            <div className="accordion__button">
              {!isOpen && <span className="accordion__button--span">&#9660;</span>}
              {isOpen && <span className="accordion__button--span">&#9650;</span>}
            </div>
          </div>
          {isOpen && (
            <div className="accordion__content">
              {this.props.children}
            </div>
          )}
        </div>
      );
    }
  }
  
export default AccordionSection;