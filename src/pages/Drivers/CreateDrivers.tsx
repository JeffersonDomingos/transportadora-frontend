import React, { useState } from 'react';
import { createDrivers } from '../../services/driversService';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const CreateDriver = () => {
  const [name, setName] = useState('');
  const [deliveriesPerMonth] = useState(0);
  const [deliveriesCount] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createDrivers({ name, deliveriesPerMonth, deliveriesCount });
      navigate('/driver-list');
    } catch (error) {
      console.error('Error creating driver:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Adicionar Motorista" />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Adicionar Motorista
        </button>
      </form>
    </>
  );
};

export default CreateDriver;
