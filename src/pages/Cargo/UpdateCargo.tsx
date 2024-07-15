import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCargos, updateCargo } from '../../services/cargoService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';

const UpdateCargo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchCargo = async () => {
      if (id) {
        try {
          const cargos = await getCargos();
          const cargo = cargos.find((c: any) => c.id === parseInt(id));
          if (cargo) {
            setDescription(cargo.description);
            setType(cargo.type);
          }
        } catch (error) {
          console.error('Error fetching cargo:', error);
        }
      }
    };
    fetchCargo();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      try {
        await updateCargo(parseInt(id), { description, type });
        navigate('/cargo-list');
      } catch (error) {
        console.error('Error updating cargo:', error);
      }
    } else {
      console.error('Cargo ID is undefined');
    }
  };

  return (
   <>
   <Breadcrumb pageName="Atualizar Carga" />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tipo da entrega
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Atualizar Carga
        </button>
      </form>
    </>
  );
};

export default UpdateCargo;
