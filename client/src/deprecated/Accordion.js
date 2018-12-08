import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AccordionSection from './AccordionSection'

class Accordion extends Component {
    static propTypes = {
      children: PropTypes.instanceOf(Object).isRequired,
    };
  
    constructor(props) {
      super(props);
      const openSections = {};
      this.state = { openSections };
    }
  
    onClick = label => {
      const {
        props: { allowMultipleOpen },
        state: { openSections },
      } = this;
  
      const isOpen = !!openSections[label];
  
      if (allowMultipleOpen) {
        this.setState({
          openSections: {
            ...openSections,
            [label]: !isOpen
          }
        });
      } else {
        this.setState({
          openSections: {
            [label]: !isOpen
          }
        });
      }
    };
  
    render() {
      const {
        onClick,
        state: { openSections },
      } = this;
  
      return (
        // <div style={{ border: '2px solid #008f68' }}>
        <div className="accordion">
            <AccordionSection
              isOpen={!!openSections[this.props.label]}
              label={this.props.label}
              onClick={onClick}
            >
              {this.props.children}
            </AccordionSection>
        </div>
      );
    }
  }
  
export default Accordion;
  