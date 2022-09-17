import { NavLink } from 'react-router-dom';
import './index.css';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><img id="carlogo" width="40px" height="auto" /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/newManufacturer">Create Manufacturer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/newModel">Create vehicle model</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/newAuto">Create Automobile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/modelList">List of Models</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/autoList">List of Automobiles</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers">List of Manufacturers</NavLink>
                </li>
              </ul>
          </div>

            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/newSalesPerson">Add sales person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/addCustomer">Add customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/recordSale">Record a sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/listSales">List all sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/salespersonHistory">Sales person history</NavLink>
            </li>
            </ul>
            </div>



            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/newAppointment">Schedule an Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/appointmentList">Appointment List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/searchList">Appointment History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="dropdown-item" to="/newTech">Enroll a Technician</NavLink>
            </li>
            </ul>
            </div>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
