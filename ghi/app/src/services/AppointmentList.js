import React from 'react';

export default class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            vip: '',
            vehicle: '',
            owner: '',
            date: '',
            time: '',
            reason: '',
            technicians: [],
            canceled: '',
            finished:'',
        };

        this.handleAppointmentChange = this.handleAppointmentChange.bind(this);
    }

    async handleAppointmentChange(event) {
        const value = event.target.value;
        const appointmentUrl =  `http://localhost:8080/api/appointments/${value}`;
        const appointmentResponse = await fetch(appointmentUrl);

        if (appointmentResponse.ok) {
            const appointmentData = await appointmentResponse.json();

            this.setState({ appointments: appointmentData });
        }
    }

    async componentDidMount() {
        
        const appointmentUrl =  'http://localhost:8080/api/appointments/';
        const appointmentResponse = await fetch(appointmentUrl);

        if (appointmentResponse.ok) {
            const appointmentData = await appointmentResponse.json();
        console.log("HEY YOU SHOULD LOOK AT THIS STUFF SO LOOK AT IT ALREADY >>>>>>>>>>>>>>>", appointmentData)
            this.setState({ appointments: appointmentData.appointments })
            
        }
    }
    
    


    render() {
        return (
            <>
                <><div className="px-4 py-5 my-5 mt-0 text-center">
            <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
            <h1 className="display-5 fw-bold">Appointments</h1>
        </div><div className="mb-3 my-5">
                <select onChange={this.handleAppointmentChange} value={this.state.appointment} required id="appointment" name="appointment" className="form-select">
                    <option value="">appointment</option>
                    {this.state.appointments.map(appointment => {                   
                        return (
                            <option key={appointment.id} value={appointment.vehicle.vin}>{appointment.owner}</option>
                        );
                    })}
                </select>
            </div><table className="table">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Owner</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vehicle.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.reason}</td>
                                <td key={appointment.technician.id}>{appointment.technician.name}</td>
                                <button type="button" className="btn btn-outline-danger" id="cancel">Cancel</button>
                                <button type="button" className="btn btn-outline-success" id="cancel">Finished</button>
                            </tr>
                        );
                    })}
                </tbody>
            </table></>
            </>
        );
    }

}