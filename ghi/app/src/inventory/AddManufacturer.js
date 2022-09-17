import React from 'react';

class NewManufacturerForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleNameChange(event) {
        const value= event.target.value
        this.setState({ name: value})
    }

    async handleSubmit(event){
        event.preventDefault()
        const data = {...this.state}
        const TechUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(TechUrl, fetchConfig)
        if (response.ok) {
            const newTech = await response.json()
            const cleared = {
                name: '',
            }
            this.setState(cleared)
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-4 col-8">
                    <div className="shadow p-3 mt-4">
                        <h1>Create Manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                            <div className="form-floating mb-4">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="manufacturer">Name</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewManufacturerForm