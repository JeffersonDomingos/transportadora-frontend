import { Routes, Route } from "react-router-dom";
import TrucksList from "../pages/Trucks/TrucksList";
import CreateTruck from '../pages/Trucks/CreateTruck';
import UpdateTruck from '../pages/Trucks/UpdateTruck';
import DriversList from "../pages/Drivers/DriversList";
import CreateDriver from "../pages/Drivers/CreateDrivers";
import UpdateDriver from "../pages/Drivers/UpdateDrivers";
import DeliveriesList from "../pages/Deliveries/DeliveriesList";
import CreateDelivery from "../pages/Deliveries/CreateDeliverie";
import UpdateDelivery from "../pages/Deliveries/UpdateDeliveries";
import CargoList from "../pages/Cargo/CargoList";
import CreateCargo from "../pages/Cargo/CreateCargo";
import UpdateCargo from "../pages/Cargo/UpdateCargo";
import PageTitle from "../components/PageTitle";
import DefaultLayout from "../layout/DefaultLayout";
import Dashboard from "../pages/Dashboard";

export const AppRoutes = () => {
  return (
    <DefaultLayout>
    <Routes>
    <Route
      index
      path="/"
      element={
        <>
          <PageTitle title="JEFF Transportadora | Dashboard" />
          <Dashboard/>
          
        </>
      }
    />
    <Route
      path="/truck-list"
      element={
        <>
          <PageTitle title="Caminhões" />
          <TrucksList />
        </>
      }
    />
    <Route path="/create-truck" element={<CreateTruck />} />
    <Route path="/update-truck/:id" element={<UpdateTruck />} />
    <Route
      path="/driver-list"
      element={
        <>
          <PageTitle title="Motoristas" />
          <DriversList />
        </>
      }
    />
    <Route path="/create-driver" element={<CreateDriver />} />
    <Route path="/update-driver/:id" element={<UpdateDriver />} />
    <Route
      path="/delivery-list"
      element={
        <>
          <PageTitle title="Entregas" />
          <DeliveriesList />
        </>
      }
    />
    <Route path="/create-delivery" element={<CreateDelivery />} />
    <Route path="/update-delivery/:id" element={<UpdateDelivery />} />
    <Route
      path="/cargo-list"
      element={
        <>
          <PageTitle title="Cargas" />
          <CargoList />
        </>
      }
    />
    <Route path="/create-cargo" element={<CreateCargo />} />
    <Route path="/update-cargo/:id" element={<UpdateCargo />} />
    <Route path="*" element={<h1>404</h1>} />
  </Routes>
  </DefaultLayout>
  );
};