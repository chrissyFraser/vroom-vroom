import React from 'react';

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {manufacturers: []}
    }
    async componentDidMount() {
        const url = "http://localhost:8100/api/manufacturers/";

        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            let manufacturers = data
            this.setState({manufacturers : data.manufacturers})
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-4 col-8">
                    <div className="shadow p-3 mt-4">
                    <h1>Manufacturers</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.manufacturers.map(manufacturer => {
                                return (
                                    <tr key={ manufacturer.id }>
                                    <td>{ manufacturer.name }</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManufacturerList;
