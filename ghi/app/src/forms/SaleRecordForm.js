import React from 'react';

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobiles: [],
            salespeople: [],
            customers: [],
            price: '',
        };

        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalespersonChange = this.handleSalespersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        data.salesperson = data.salesperson;

        delete data.salesperson;
        delete data.automobiles;
        delete data.salespeople;
        delete data.customers;

        const saleUrl = `http://localhost:8090/api/sales/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            const new_sale = await response.json();

            const cleared = {
                salespeople: [],
                automobiles: [],
                customers: [],
                price: '',
            };
            this.setState(cleared);
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalespersonChange(event) {
        const value = event.target.value;
        this.setState({ salesperson: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({ price: value })
    }

    async componentDidMount() {
    
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);
        const salespersonUrl = 'http://localhost:8090/api/new_salesperson/';
        const salespersonResponse = await fetch(salespersonUrl);
        const customerUrl = 'http://localhost:8090/api/new_customer/';
        const customerResponse = await fetch(customerUrl);

        if (automobileResponse.ok && salespersonResponse.ok && customerResponse.ok) {

            const automobileData = await automobileResponse.json();
            const salespersonData = await salespersonResponse.json();
            const customerData = await customerResponse.json();

            this.setState({ automobiles: automobileData.autos })
            this.setState({ salespeople: salespersonData.salesperson})
            this.setState({ customers: customerData.customers })
        }
    }



    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-record-form">

                            <div className="mb-3">
                                <select onChange={this.handleAutomobileChange} value={this.state.automobile} required id="automobile" name="automobile" className="form-select">
                                    <option value="">Automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleSalespersonChange} value={this.state.salesperson} required id="salesperson" name="salesperson" className="form-select">
                                    <option value="">Salesperson</option>
                                    {this.state.salespeople.map(salesperson => {
                                        return (
                                            <option key={salesperson.employeeNumber} value={salesperson.employeeNumber}>{salesperson.name}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="mb-3">
                                <select onChange={this.handleCustomerChange} value={this.state.customer} required id="customer" name="customer" className="form-select">
                                    <option value="">Customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="text" name="price" id="price" className="form-control" aria-label="Amount" />
                                <div className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </div>
                            </div>

                            <button className="btn btn-primary" id="newSaleBtn">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SaleRecordForm;

