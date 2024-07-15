import { useEffect, useState } from 'react';
import { getCargos, deleteCargo } from '../../services/cargoService';
import CargoItem from './CargoItem';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';


const CargoList = () => {
  const [cargos, setCargos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCargos();
  }, []);

  const loadCargos = async () => {
    const data = await getCargos();
    setCargos(data);
  };

  const handleDelete = async (id: number) => {
    await deleteCargo(id);
    loadCargos();
  };

  return (
      <>
      <Breadcrumb pageName="Lista de Cargas" />
      <div className="relative overflow-x-auto">
        
        <div className="flex justify-left mt-3">
          <button onClick={() => navigate('/create-cargo')} className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Adicionar Carga
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Descrição</th>
              <th scope="col" className="px-6 py-3">Tipo da entrega</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cargos.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center">Nenhuma carga disponível.</td>
              </tr>
            ) : (
              cargos.map((cargo) => (
                <CargoItem key={cargo.id} cargo={cargo} onDelete={handleDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CargoList;
