import React, { useEffect, useState } from 'react';
import { getDrivers, deleteDrivers } from '../../services/driversService';
import DriverItem from './DriversItem';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../..//components/Breadcrumbs/Breadcrumbs';


const DriversList: React.FC = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  const handleDelete = async (id: number) => {
    await deleteDrivers(id);
    loadDrivers();
  };

  return (
    <>
    <Breadcrumb pageName="Lista de Motoristas" />
      <div className="relative overflow-x-auto">
        
        <div className="flex justify-left mt-3">
        <button onClick={() => navigate('/create-driver')} className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Adicionar Motorista
        </button>
      </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Entregas por mês
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center">Nenhum motorista disponível.</td>
              </tr>
            ) : (
              drivers.map((driver) => (
                <DriverItem key={driver.id} driver={driver} onDelete={handleDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DriversList;
