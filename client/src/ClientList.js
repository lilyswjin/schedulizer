import React, { Component } from 'react'


export default class ClientList extends Component {

    state = {
        clientList: []
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

    render() {
        let clientRows = this.state.clientList.map((client) => {
            return (
                <div className="client__row" key={client.id} >
                    <span>{client.id}</span> 
                    <span>{client.name}</span> 
                    <span></span>
                    {/* <span><img src="./assets/icons/employee2.svg" height="25px" width="25px" alt="employee"/></span> */}
                </div>
            )
        });

        return (
            <div className="client">
            <div className="client__row">
                <span>ID</span>
                <span>Client Name</span>
                <span><i className="fas fa-ellipsis-h"></i></span> 
            </div>
            {clientRows}
        </div>
        )
    }
}
