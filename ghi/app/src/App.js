import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

//Sales
import SalespersonForm from './sales/SalespersonForm';
import CustomerForm from './sales/CustomerForm';
import SalesRecordForm from './sales/SaleRecordForm';
import SalespersonHistory from './sales/SalespersonHistory';
import AllSales from './sales/AllSales'


// Inventory
import NewManufacturerForm from './inventory/AddManufacturer';
import ManufacturerList from './inventory/ListManufacturers';
import NewModelForm from './inventory/AddVehicleModel';
import AddAutomobile from './inventory/AddAutomobile';
import ListAutomobiles from './inventory/ListAutomobiles';
import ListVehicleModels from './inventory/ListVehicleModels';

// Services
import AddTechnician from './services/TechnicianForm';
import AppointmentForm from './services/AppointmentForm';
import AppointmentList from './services/AppointmentList';


function App(props) {
  return (
    <BrowserRouter>
      <header>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />


            {/* Inventory Nav */}
            <Route path="/add_auto" element={<AddAutomobile />} />
            <Route path="/auto_list" element={<ListAutomobiles />} />
            <Route path="/new_model" element={<NewModelForm />} />
            <Route path="/model_list" element={<ListVehicleModels />} />
            <Route path="/new_manufacturer" element={<NewManufacturerForm />} />
            <Route path="/manufacturer_list" element={<ManufacturerList />} />
            

            {/* Sales Nav */}
            <Route path="/new_customer" element={<CustomerForm />} />
            <Route path="/new_salesperson" element={<SalespersonForm />} />
            <Route path="/salesperson_history" element={<SalespersonHistory />} />
            <Route path="/new_sale" element={<SalesRecordForm />} />
            <Route path="/all_sales" element={<AllSales />} />


            {/* Services Nav */}
            <Route path="/new_appointment" element={<AppointmentForm />} />
            <Route path="/appt_list" element={<AppointmentList />} />
            <Route path="/new_technician" element={<AddTechnician />} />



            
          </Routes>
        </div>
      </header>
    </BrowserRouter>
  );
}

export default App;
