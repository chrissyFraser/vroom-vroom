import React from 'react';


function AutomobileColumn(props) {
    return (
        <div className="col">
            {props.list.map(auto => {
                return (
                    <div key={auto.id} className="card mb-3 shadow">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <h4 className="card-title">Automobile {auto.id}:</h4>
                                <ul>
                                    <li><strong>Color</strong><p id="liData">{auto.color}</p></li>
                                    <li><strong>Year</strong><p id="liData">{auto.year}</p></li>
                                    <li><strong>Model</strong><p id="liData">{auto.model.name}</p></li>
                                    <li><strong>VIN</strong><p id="liData">{auto.vin}</p></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

class ListAutomobiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoColumns: [[], [], []],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const requests = [];

                for (let auto of data.autos) {
                    const autoDetailUrl = `http://localhost:8100/api/automobiles/${auto.vin}/`;
                    requests.push(fetch(autoDetailUrl));
                }
                const responses = await Promise.all(requests);
                
                const autoColumns = [[], [], []];
                let i = 0;
                for (const autoResponse of responses) {
                    if (autoResponse.ok) {
                        const details = await autoResponse.json();
                        autoColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(autoResponse);
                    }
                }
                this.setState({ autoColumns: autoColumns });
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
                    <h1 className="display-5 fw-bold">All Automobiles</h1>
                </div>
                <div className="container" id='autoContainer'>
                    <h3 id="autoScroll"></h3>
                    <div className="row">
                        {this.state.autoColumns.map((autoList, index) => {
                            return (
                                <AutomobileColumn key={index} list={autoList} />
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default ListAutomobiles;