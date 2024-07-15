import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrucks, updateTruck, Truck } from '../../services/truckService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const UpdateTruck: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [maxDeliveriesPerMonth, setMaxDeliveriesPerMonth] = useState(4);
  const [deliveriesCount, setDeliveriesCount] = useState(0);

  useEffect(() => {
    const fetchTruck = async () => {
      if (id) {
        try {
          const trucks = await getTrucks();
          const truck = trucks.find((t: Truck) => t.id === parseInt(id));
          if (truck) {
            setModel(truck.model);
            setPlateNumber(truck.plateNumber);
            setMaxDeliveriesPerMonth(truck.maxDeliveriesPerMonth);
            setDeliveriesCount(truck.deliveriesCount);
          }
        } catch (error) {
          console.error('Error fetching truck:', error);
        }
      }
    };
    fetchTruck();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      try {
        await updateTruck(parseInt(id), { id: parseInt(id), model, plateNumber, maxDeliveriesPerMonth, deliveriesCount });
        navigate('/truck-list');
      } catch (error) {
        console.error('Error updating truck:', error);
      }
    } else {
      console.error('Truck ID is undefined');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Atualizar Caminhão" />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Modelo do Caminhão
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="plateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Placa
          </label>
          <input
            type="text"
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Atualizar caminhão
        </button>
      </form>
    </>
  );
};

export default UpdateTruck;
