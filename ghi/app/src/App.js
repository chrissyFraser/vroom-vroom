import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalesPersonForm from './forms/SalespersonForm';
import CustomerForm from './forms/CustomerForm';
import SalesRecordForm from './forms/SaleRecordForm';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonHistory from './SalespersonHistory';
import AllSales from './AllSales'
import AddAutomobile from './inventory/AddAutomobile';
import ListAutomobiles from './inventory/ListAutomobiles';
import ListVehicleModels from './inventory/ListVehicleModels';

// Inventory
import NewManufacturerForm from './inventory/AddManufacturer';
import ManufacturerList from './inventory/ListManufacturers';
import NewModelForm from './inventory/AddVehicleModel';

// Services
import AddTechnician from './forms/TechnicianForm';
import AppointmentForm from './forms/AppointmentForm';

// Sales
import SalesPersonForm from './forms/SalesPersonForm';

function App(props) {
  return (
    <BrowserRouter>
      <header>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/new_customer" element={<CustomerForm />} />
            <Route path="/new_salesperson" element={<SalesPersonForm />} />
            <Route path="/salesperson_history" element={<SalespersonHistory />} />
            <Route path="/new_sale" element={<SalesRecordForm />} />
            <Route path="/all_sales" element={<AllSales />} />
            <Route path="/add_auto" element={<AddAutomobile />} />
            <Route path="/auto_list" element={<ListAutomobiles />} />
            <Route path="/model_list" element={<ListVehicleModels />} />
          </Routes>
        </div>
      </header>
    </BrowserRouter>
  );
}

export default App;
