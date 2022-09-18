import React from 'react';


function VehicleModelColumn(props) {
    return (
        <div className="col">
            {props.list.map(model => {
                return (
                    <div key={model.id} className="card mb-3 shadow">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <h4 className="card-title">Model {model.id}:</h4>
                                <ul>
                                    <li><strong>Manufacturer</strong><p id="liData">{model.manufacturer.name}</p></li>
                                    <li><strong>Model</strong><p id="liData">{model.name}</p></li>
                                    <li><p id="liData"><img src={model.picture_url}></img></p></li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

class  ListVehicleModels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelColumns: [[], [], []],
        };
    }

    async componentDidMount() {
        const modelUrl = 'http://localhost:8100/api/models/';

        try {
            const response = await fetch(modelUrl);
            if (response.ok) {
                const data = await response.json();
                const requests = [];

                for (let model of data.models) {
                    const modelDetailUrl = `http://localhost:8100/api/models/${model.id}/`;
                    requests.push(fetch(modelDetailUrl));
                }
                const responses = await Promise.all(requests);
                
                const modelColumns = [[], [], []];
                let i = 0;
                for (const modelResponse of responses) {
                    if (modelResponse.ok) {
                        const details = await modelResponse.json();
                        modelColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(modelResponse);
                    }
                }
                this.setState({ modelColumns: modelColumns });
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
                    <h1 className="display-5 fw-bold">All Models</h1>
                </div>
                <div className="container" id='vehicleModelContainer'>
                    <h3 id="model"></h3>
                    <div className="row">
                        {this.state.modelColumns.map((modelList, index) => {
                            return (
                                <VehicleModelColumn key={index} list={modelList} />
                            );
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default ListVehicleModels;