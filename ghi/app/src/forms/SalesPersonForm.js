import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": '',
            "employeeNumber": '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumber = this.handleEmployeeNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        const url = 'http://localhost:8090/list_salespeople/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ salesperson: data.salesperson });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const salespersonUrl = 'http://localhost:8000/api/salesperson/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);
            this.setState({
                "name": '',
                "employeeNumber": '',
            });
        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }

    handleChangeEmployeeNumber(event) {
        const value = event.target.value;
        this.setState({ employeeNumber: value });
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Salesperson</h1>
                        <form onSubmit={this.handleSubmit} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employeeNumber} onChange={this.handleEmployeeNumberChange} placeholder="EmployeeNumber" required type="number" name="employeeNumber" id="employeeNumber" className="form-control" />
                                <label htmlFor="employeeNumber">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonForm;