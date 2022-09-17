import React from 'react';


function SaleColumn(props) {
    return (
        <div className="col">
            {props.list.map(sale => {
                console.log(props)
                return (
                    <div key={sale.id} className="card mb-3 shadow">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <h4 className="card-title">Sale {sale.id}:</h4>
                                <ul>
                                    <li><strong>Salesperson:</strong><p id="liData">{sale.salesperson.name}</p></li>
                                    <li><strong>Employee Number:</strong><p id="liData">{sale.salesperson.employeeNumber}</p></li>
                                    <li><strong>Customer:</strong><p id="liData">{sale.customer.name}</p></li>
                                    <li><strong>VIN:</strong><p id="liData">{sale.automobile.vin}</p></li>
                                    <li><strong>Price:</strong><p id="liData">{sale.price}</p></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

class AllSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saleColumns: [[], [], []],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();

                const requests = [];
                for (let sale of data.sales) {
                    const detailUrl = `http://localhost:8090/api/sales/${sale.id}/`;
                    requests.push(fetch(detailUrl));
                }

                const responses = await Promise.all(requests);

                const saleColumns = [[], [], []];

                let i = 0;
                for (const saleResponse of responses) {
                    if (saleResponse.ok) {
                        const details = await saleResponse.json();
                        saleColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(saleResponse);
                    }
                }

                this.setState({ saleColumns: saleColumns });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <>
                <div className="px-4 py-5 my-5 mt-0 text-center">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
                    <h1 className="display-5 fw-bold">All Sales</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4" id="vehModSub">
                            Sales Records
                        </p>

                    </div>
                </div>
                <div className="container" id='salesContainer'>
                    <h3 id="salesScroll"></h3>
                    <div className="row">
                        {this.state.saleColumns.map((saleList, index) => {
                            return (
                                <SaleColumn key={index} list={saleList} />
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default AllSales;

