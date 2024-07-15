import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrivers, updateDrivers } from '../../services/driversService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const UpdateDriver: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [deliveriesPerMonth, setDeliveriesPerMonth] = useState(0);

  useEffect(() => {
    const fetchDriver = async () => {
      if (id) {
        try {
          const drivers = await getDrivers();
          const driver = drivers.find((d: any) => d.id === parseInt(id));
          if (driver) {
            setName(driver.name);
            setDeliveriesPerMonth(driver.deliveriesCount);
          }
        } catch (error) {
          console.error('Error fetching driver:', error);
        }
      }
    };
    fetchDriver();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      try {
        await updateDrivers(parseInt(id), { name, deliveriesPerMonth });
        navigate('/driver-list');
      } catch (error) {
        console.error('Error updating driver:', error);
      }
    } else {
      console.error('Driver ID is undefined');
    }
  };

  return (
    <>
    <Breadcrumb pageName="Atualizar Motorista" />
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
          Atualizar Motorista
        </button>
      </form>
    </>
  );
};

export default UpdateDriver;
