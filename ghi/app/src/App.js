import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

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

          <Route path="/newManufacturer" element={<NewManufacturerForm />} />
          <Route path="/manufacturers" element={<ManufacturerList/>} />
          <Route path="/newModel" element={<NewModelForm/>} />
          <Route path="/newTech" element={<AddTechnician/>}/>
          <Route path="/newSalesPerson" element={<SalesPersonForm/>}/>
          <Route path="/newAppointment" element={<AppointmentForm/>}/>
          {/* <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/>
          <Route path="" element={< />}/> */}
        </Routes>
      </div>
    </header>
  </BrowserRouter>
  );
}

export default App;
