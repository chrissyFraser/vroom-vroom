import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SalesPersonForm from './forms/SalesPersonForm';
import CustomerForm from './forms/CustomerForm';
import SalesRecordForm from './forms/SaleRecordForm';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonHistory from './SalespersonHistory';
import AllSales from './AllSales'

function App() {
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
          </Routes>
        </div>
      </header>
    </BrowserRouter>
  );
}

export default App;
