import React from 'react';

export default class AppointmentList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vip: '',
            vehicles: [],
            owner: '',
            date: '',
            time: '',
            reason: '',
            technicians: [],
        };

        this.handleAppointmentChange = this.handleAppointmentChange.bind(this);
    }

    async handleAppointmentChange(event) {
        const value = event.target.value;
        const appointmentUrl =  'http://localhost:8080/api/appointments/${value}';
        const appointmentResponse = await fetch(appointmentUrl);

        if (appointmentResponse.ok) {
            const appointmentData = await appointmentResponse.json();

            this.setState({ sales: appointmentData });
        }
    }

    async componentDidMount() {
        
        const appointmentUrl =  'http://localhost:8080/api/appointments/';
        const appointmentResponse = await fetch(appointmentUrl);

        if (appointmentResponse.ok) {
            const appointmentData = await appointmentResponse.json();
console.log("HEY YOU SHOULD LOOK AT THIS STUFF SO LOOK AT IT ALREADY >>>>>>>>>>>>>>>", appointmentData)
            this.setState({ salespeople: appointmentData.sales_people })
            
        }
    }

    render() {
        return (
            <>
                <><div className="px-4 py-5 my-5 mt-0 text-center">
            <img className="bg-white rounded shadow d-block mx-auto mb-4" alt="" width="600" />
            <h1 className="display-5 fw-bold">appointment History</h1>
        </div><div className="mb-3 my-5">
                <select onChange={this.handleAppointmentChange} value={this.state.appointment} required id="appointment" name="appointment" className="form-select">
                    <option value="">appointment</option>
                    {this.state.salespeople.map(appointment => {                   
                        return (
                            <option key={appointment.employeeNumber} value={appointment.employeeNumber}>{appointment.name}</option>
                        );
                    })}
                </select>
            </div><table className="table">
                <thead>
                    <tr>
                        <th>appointment</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.appointment.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table></>
            </>
        );
    }

}