import React from 'react';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            vip: '',
            vehicle: [],
            owner: '',
            date: '',
            time: '',
            reason: '',
            technician: [],

        };
        this.handleVipChange = this.handleVipChange.bind(this);
        this.handleVehicleChange = this.handleVehicleChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVipChange(event) {
        const value = event.target.value
        this.setState({vip: value})
    }
    handleVehicleChange(event) {
        const value = event.target.value
        this.setState({vehicle: value})
    }
    handleOwnerChange(event) {
        const value = event.target.value
        this.setState({owner: value})
    }
    handleDateChange(event) {
        const value = event.target.value
        this.setState({date: value})
    }
    handleVipChange(event) {
        const value = event.target.value
        this.setState({vip: value})
    }
    handleTimeChange(event) {
        const value = event.target.value
        this.setState({time: value})
    }
    handleReasonChange(event) {
        const value = event.target.value
        this.setState({reason: value})
    }
    handleTechnicianChange(event) {
        const value = event.target.value
        this.setState({technician: value})
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state, finished:"False", canceled: "False"};
        delete data.vehicle
        delete data.technician

        const appointmentUrl = 'http://localhost:8080/api/appointment';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response=await fetch(appointmentUrl, fetchConfig);

        if (response.ok) {

            const cleared= {
                vip: '', 
                vehicle: [], 
                owner: '', 
                date: '', 
                time: '', 
                reason: '', 
                technician: [], 
                finished:'', 
                canceled:'', 
            };
            this.setState(cleared);
        }
    }

    async componentDidMount() {
        const techUrl = 'http://localhost:8080/api/technicians/';
        const autoUrl = 'http://localhost:8100/api/automobiles/';

        const techResponse = await fetch(techUrl);
        const autoResponse = await fetch(autoUrl);
        if (techResponse.ok) {
            const techData = await techResponse.json();
            const autoData = await autoResponse.json();
            this.setState({vehicle: autoData.autos})// Not sure about this
            this.setState({technician: techData.technicians})// Not sure about this
        }
    }

    render() {
        return(
            <div className="row">
                <div className="offset-4 col-8">
                    <div className="shadow p-3 mt-4">
                        <h1 id="appHeader">Create an Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-appt-form">
                            <div className="mb-4">
                                <select onChange={this.handleVehicleChange} value={this.state.vehicle} required id="vehicle" name="vehicle" className="form-select">
                                    <option value="">Choose Vehicle</option>
                                    {this.state.vehicle.map(vehicle => {
                                        return (
                                            <option key={vehicle.vin} value={vehicle.vin}>{vehicle.vin}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className='form-floating mb-4'>
                                <select onChange={this.handleVipChange} value={this.state.vip} placeholder="VIP" required type="text" name="VIP" id="VIP" className="form-select" >
                                    <option value="">Is VIP?</option>
                                    <option value="True">Yes</option>
                                    <option value="False">No</option>
                                </select>
                            </div>

                            <div className='form-floating mb-4'>
                                <input onChange={this.handleOwnerChange} value={this.state.owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                                <label htmlFor='owner'>Vehicle Owner</label>
                            </div>

                            <div className='form-floating mb-4'> 
                                <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                                <label htmlFor="date">Date: MM / DD / YYYY</label>
                            </div>

                            <div className='form-floating mb-4'> 
                                <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Time</label>
                            </div>

                            <div className='form-floating mb-4'> 
                                <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason for appointment" required type="text" name="reason" id="reason" className='form-control' />
                                <label htmlFor="reason">Reason For Appointment</label>
                            </div>

                            <div className='form-floating mb-4'> 
                                <select onChange={this.handleTechChange} value={this.state.technician} required id="Technician" name="technician" className="form-select">
                                    <option value="">Choose Tech</option>
                                    {this.state.technician.map(technician => {
                                        return (
                                            <option key={technician.employee_id} value={technician.employee_id}>{technician.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>      
        )
    }
}

export default AppointmentForm;