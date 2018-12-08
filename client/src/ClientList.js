import React, { Component } from 'react'
import ReactTable from 'react-table'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import Modal from './Modal';
import NewClient from './NewClient';

export default class ClientList extends Component {

    state = {
        clientList: [],
        // dropdownOpen: false,
        isOpen: false
    }

    componentDidMount() {
        this.fetchClients();
    }

    fetchClients = () => {
        fetch("http://localhost:8080/clients")
        .then(res => res.json())
        .then(data => {
            this.setState({clientList: data})
        })  
    }

    toggle = () => {
        this.setState( prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }

    handleClose = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: false
        })
    }

    handleOpen = (e) => {
        e.preventDefault()
        this.setState({
            isOpen: true,
        })
    }

    render() {

        // set up data structure for react table
        const data = this.state.clientList.map((client)=>{
            return (
                {
                    id: client.id,
                    name: client.name
                }
            )
        })
        
          // set up heading structure for react table
        const columns = [
            {
                Header: "ID",
                accessor: 'id'
            }, 
            {
                Header: "Client Name",
                accessor: 'name'
            },
            {
                Header: "",
                accessor: "",
                Cell: row => {
                    return (
                        <DropdownButton title={""} id={`dropdown${row.id}`} noCaret>
                            <MenuItem><i className="fas fa-pencil-alt"></i>   Edit</MenuItem>
                            <MenuItem><i className="fas fa-trash-alt"></i>   Delete</MenuItem>
                        </DropdownButton>
                    )
                }
            }
        ];

        return (
            <div className="client">
                <ReactTable data={data} columns={columns} defaultPageSize={8}  className="-striped -highlight" minRows={1}/>
                <button onClick={this.handleOpen} className="newItem">++<i className="fas fa-building"></i></button>
                <NewClient isOpen={this.state.isOpen} handleClose={this.handleClose}/> 
              
            </div>
        )
    }
}
