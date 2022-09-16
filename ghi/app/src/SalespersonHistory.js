import React from 'react';


class SalespersonHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: [],
            salespeople: [],
            salesperson: '',
        };

        this.handleSalespersonChange = this.handleSalespersonChange.bind(this);
    }

    async handleSalespersonChange(event) {
        const value = event.target.value;
        const salespersonUrl = `http://localhost:8090/api/new_salesperson/${value}`;
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const salespersonData = await salespersonResponse.json();

            this.setState({ sales: salespersonData });
        }
    }

    async componentDidMount() {
        
        const salespersonUrl = 'http://localhost:8090/api/new_salesperson/';
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const salespersonData = await salespersonResponse.json();

            this.setState({ salespeople: salespersonData.salespeople })
        }
    }

    render() {
        return (
            <>
                   <div className="px-4 py-5 my-5 mt-0 text-center">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Salesperson History</h1>
  
                    </div>
                <div className="mb-3 my-5">
                    <select onChange={this.handleSalespersonChange} value={this.state.salesperson} required id="salesperson" name="salesperson" className="form-select">
                        <option value="">Salesperson</option>
                        {this.state.salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>
                            );
                        })}
                    </select>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.name}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}

export default SalespersonHistory;
