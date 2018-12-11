import React, { Component } from 'react'
import ReactTable from 'react-table'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

// import Modal from './Modal';
import NewClient from './NewClient';
import NewProject from './NewProject';

export default class ClientList extends Component {

    state = {
        // clientList: [],
        // dropdownOpen: false,
        isOpen: false,
        addProjectIsOpen: false,
        activeClientID: null
    }

    // componentDidMount() {
    //     this.fetchClients();
    // }

    // fetchClients = () => {
    //     fetch("http://localhost:8080/clients")
    //     .then(res => res.json())
    //     .then(data => {
    //         this.setState({clientList: data})
    //     })  
    // }

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

    handleOpenProj = (e) => {
        e.preventDefault()
        let clientID = e.target.name
        this.setState({
            addProjectIsOpen: true
        })
        
        if (clientID !== undefined) {
            this.setState({
                activeClientID: clientID
            })
        }
    }

    handleCloseProj = (e) => {
        e.preventDefault()
        this.setState({
            addProjectIsOpen: false
        })
    }

    deleteClients = (e) => {
        let id = e.target.name
   
        let url = `http://localhost:8080/clients/${id}`;
        let init = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        };

        fetch(url, init)
            .then( res => {
                this.props.fetchClients();
                res.json();
            })
    }

    render() {

        // set up data structure for react table
        const data = this.props.clientList.map((client)=>{
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
                            <MenuItem onClick={this.handleOpenProj} name={row.value.id} ><i className="fas fa-file-alt" ></i>   Add Project</MenuItem>
                            <MenuItem><i className="fas fa-pencil-alt"></i>   Edit</MenuItem>
                            <MenuItem onClick={this.deleteClients} name={row.value.id}><i className="fas fa-trash-alt"></i>   Delete</MenuItem>
                        </DropdownButton>
                    )
                }
            }
        ];

        return (
            <div className="client">
                <ReactTable data={data} columns={columns} defaultPageSize={15}  className="-striped -highlight" minRows={1}/>
                <button onClick={this.handleOpen} className="newItem">++<i className="fas fa-building"></i></button>
                <NewClient isOpen={this.state.isOpen} handleClose={this.handleClose} fetchClients={this.props.fetchClients} /> 
                <NewProject isOpen={this.state.addProjectIsOpen} handleClose={this.handleCloseProj}  clientID={this.state.activeClientID} clientList={this.props.clientList} />
            </div>
        )
    }
}
