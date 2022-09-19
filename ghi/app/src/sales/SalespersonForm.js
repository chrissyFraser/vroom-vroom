import React from 'react';

class SalespersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        const salespersonUrl = `http://localhost:8090/api/new_salesperson/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);

        if (response.ok) {
            const new_salesperson = await response.json();

            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employeeNumber: value })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Salesperson</h1>
                        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} placeholder="EmployeeNumber" required type="text" name="employeeNumber" id="employeeNumber" className="form-control" />
                                <label htmlFor="employeeNumber">Salesperson Employee Number (Up to 4 Digits)</label>
                            </div>
                            <button className="btn btn-primary" id="salespersonBtn">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalespersonForm;