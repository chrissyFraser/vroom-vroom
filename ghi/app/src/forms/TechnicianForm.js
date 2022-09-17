import React from 'react';

class AddTechnician extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            id:'',

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const techUrl= 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(techUrl, fetchConfig);

        if (response.ok) {
            const cleared = {
                name: '',
                id: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name:value})
    }

    handleIdChange(event) {
        const value = event.target.value;
        this.setState({id:value})
    }

    render(){
        return(
            <div className="row">
                <div className="offset-4 col-8">
                    <div className="shadow p-3 mt-4">
                        <h1>New Technician Form</h1>
                        <form onSubmit={this.handleSubmit} id="create-tech-form">
                            <div className="form floating mb-4">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form floating mb-4">
                                <input onChange={this.handleIdChange} value={this.state.id} placeholder="id" required type="text" name="id" id="id" className="form-control" />
                                <label htmlFor="id">Technician ID Number</label>
                            </div>
                            <button className="btn btn-primary" id="techBtn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTechnician