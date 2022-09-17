import React from "react";

class NewModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
            manufacturer: []
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        const data = {...this.state};

        delete data.manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelUrl, fetchConfig);

        if (response.ok) {
            const newModel = await response.json();

            const cleared = {
                name: '',
                picture_url: '',
                manufacturer: [],
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({picture_url: value})
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer_id: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers';
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();

            this.setState({manufacturer: data.manufacturer})
        }
    }

    render() {
        return(
            <div className="row">
                <div className="offset-4 col-8">
                    <div className="shadow p-3 mt-4">
                        <h1> Create a new Vehicle Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                            <div className="form-floating mb-4">
                                <input onChange={this.handleNamechange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input onChange={this.handlePictureChange} value={this.state.picture_url} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="form-floating mb-4">
                                <select onChange={this.handleManufacturerChange} value={this.state.manufacturer_id} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                                    <option value="">Choose Manufacturer</option>
                                    {this.state.manufacturer.map(manufacturer_id => {
                                        return (
                                            <option key={manufacturer_id.id} value={manufacturer_id.id}>{manufacturer_id.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary" id="vehicleModelBtn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewModelForm;