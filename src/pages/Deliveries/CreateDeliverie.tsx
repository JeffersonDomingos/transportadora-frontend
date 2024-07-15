import React, { useState, useEffect } from 'react';
import { createDelivery } from '../../services/deliveriesService';
import { getTrucks, Truck } from '../../services/truckService';
import { getCargos, Cargo } from '../../services/cargoService';
import { getDrivers, Driver } from '../../services/driversService'; 
import { useNavigate } from 'react-router-dom';
import { Delivery } from '../../services/deliveriesService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateFinalValue } from '../../utils/deliveryUtils';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const CreateDelivery = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [destination, setDestination] = useState('');
  const [value, setValue] = useState(0);
  const [truckId, setTruckId] = useState<number | null>(null);
  const [cargoId, setCargoId] = useState<number | null>(null);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [isInsurance, setIsInsurance] = useState(false);
  const [isDangerous, setIsDangerous] = useState(false);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrucks = async () => {
      try {
        const data = await getTrucks();
        setTrucks(data);
      } catch (error: any) {
        toast.error('Erro ao carregar caminhões: ' + error.message);
      }
    };

    const loadCargos = async () => {
      try {
        const data = await getCargos();
        setCargos(data);
      } catch (error: any) {
        toast.error('Erro ao carregar cargas: ' + error.message);
      }
    };

    const loadDrivers = async () => {
      try {
        const data = await getDrivers();
        setDrivers(data);
      } catch (error: any) {
        toast.error('Erro ao carregar motoristas: ' + error.message);
      }
    };

    loadTrucks();
    loadCargos();
    loadDrivers();
  }, []);

  const handleCargoChange = (cargoId: number) => {
    setCargoId(cargoId);
    const selectedCargo = cargos.find(cargo => cargo.id === cargoId);
    if (selectedCargo) {
      setIsInsurance(selectedCargo.type.toLowerCase() === 'eletrônicos');
      setIsDangerous(selectedCargo.type.toLowerCase() === 'combustível');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!truckId || !cargoId || !driverId) {
      toast.error('Por favor, selecione um caminhão, uma carga e um motorista.');
      return;
    }
    try {
      const finalValue = calculateFinalValue(value, destination); 

      const newDelivery: Delivery = {
        startTime,
        endTime,
        destination,
        value: finalValue,
        truckId: truckId,
        cargoId: cargoId,
        driverId: driverId,
        isValuable: value >= 30000,
        isInsurance: isInsurance,
        isDangerous: isDangerous
      };

      await createDelivery(newDelivery);
      toast.success('Entrega cadastrada com sucesso', {
        autoClose: 1000,
        onClose: () => navigate('/delivery-list')
      });
      console.log(newDelivery)
    } catch (error: any) {
      console.error('Erro ao criar entrega:', error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error('Erro ao criar entrega: ' + error.response.data.error);
      } else {
        toast.error('Erro ao criar entrega: Falha na comunicação com o servidor');
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Adicionar Entrega" />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Início da entrega
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fim da entrega
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Destino
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Valor
          </label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="truckId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Caminhão
          </label>
          <select
            id="truckId"
            value={truckId || ''}
            onChange={(e) => setTruckId(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>Selecione um caminhão</option>
            {trucks.map(truck => (
              <option key={truck.id} value={truck.id}>{truck.model} - {truck.plateNumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="cargoId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Carga
          </label>
          <select
            id="cargoId"
            value={cargoId || ''}
            onChange={(e) => handleCargoChange(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>Selecione uma carga</option>
            {cargos.map(cargo => (
              <option key={cargo.id} value={cargo.id}>{cargo.description} - {cargo.type}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="driverId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Motorista
          </label>
          <select
            id="driverId"
            value={driverId || ''}
            onChange={(e) => setDriverId(parseInt(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>Selecione um motorista</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Adicionar Entrega
        </button>
      </form>
    </>
  );
};

export default CreateDelivery;