import React, { useEffect, useState } from 'react';
import { getDeliveries, deleteDelivery, Delivery } from '../../services/deliveriesService';
import { getCargos, Cargo } from '../../services/cargoService';
import DeliveryItem from './DeliveriesItem';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumbs';


const DeliveriesList: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDeliveries();
    loadCargos();
  }, []);

  const loadDeliveries = async () => {
    const data = await getDeliveries();
    setDeliveries(data);
  };

  const loadCargos = async () => {
    const data = await getCargos();
    setCargos(data);
  };

  const handleDelete = async (id: number) => {
    await deleteDelivery(id);
    loadDeliveries();
  };

  return (
    <>
    <Breadcrumb pageName="Lista de Entregas" />
      <div className="relative overflow-x-auto">
        
        <div className="flex justify-left mt-3">
          <button
            onClick={() => navigate('/create-delivery')}
            className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Adicionar Entrega
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Caminhão</th>
              <th scope="col" className="px-6 py-3">Tipo de Carga</th>
              <th scope="col" className="px-6 py-3">Início da entrega</th>
              <th scope="col" className="px-6 py-3">Final da entrega</th>
              <th scope="col" className="px-6 py-3">Destino</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Valiosa</th>
              <th scope="col" className="px-6 py-3">Seguro</th>
              <th scope="col" className="px-6 py-3">Perigosa</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center">Nenhuma entrega disponível</td>
              </tr>
            ) : (
              deliveries.map((delivery) => {
                const cargo = cargos.find(cargo => cargo.id === delivery.cargoId);
                return (
                  <DeliveryItem
                    key={delivery.id}
                    delivery={delivery}
                    cargo={cargo || { id: 0, description: 'Desconhecido', type: 'Desconhecido' }}
                    onDelete={handleDelete}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DeliveriesList;