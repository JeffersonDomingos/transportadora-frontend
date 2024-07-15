import { useEffect, useState } from 'react';
import { getTrucks, deleteTruck } from '../../services/truckService';
import TruckItem from '../../pages/Trucks/TruckItem';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrucksList = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrucks();
  }, []);

  const loadTrucks = async () => {
    const data = await getTrucks();
    setTrucks(data);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTruck(id);
      loadTrucks();
      toast.success('Caminhão deletado com sucesso.');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Caminhão vinculado com alguma entrega. ${error.response.data.message}`);
      } else {
        toast.error('Caminhão vinculado com alguma entrega.');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Lista de caminhões" />
      <div className="relative overflow-x-auto">
        <div className="flex justify-left mt-3">
          <button
            onClick={() => navigate('/create-truck')}
            className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Adicionar Caminhão
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Placa
              </th>
              <th scope="col" className="px-6 py-3">
                Entregas no mês
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {trucks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  No trucks available
                </td>
              </tr>
            ) : (
              trucks.map((truck) => (
                <TruckItem
                  key={truck.id}
                  truck={truck}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TrucksList;
