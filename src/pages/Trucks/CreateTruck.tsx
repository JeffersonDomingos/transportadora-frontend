import React, { useState } from 'react';
import { createTruck } from '../../services/truckService';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const CreateTruck: React.FC = () => {
  const [model, setModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [maxDeliveriesPerMonth] = useState(4);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createTruck({ model, plateNumber, maxDeliveriesPerMonth, deliveriesCount: 0 });
      navigate('/truck-list');
    } catch (error) {
      console.error('Error creating truck:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Adicionar Caminhão" />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Modelo
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
          Adicionar caminhão
        </button>
      </form>
    </>
  );
};

export default CreateTruck;
