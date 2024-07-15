import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Delivery } from '../../services/deliveriesService';
import { Cargo } from '../../services/cargoService';

interface DeliveryItemProps {
  delivery: Delivery;
  cargo: Cargo;
  onDelete: (id: number) => void;
}

const DeliveryItem = ({ delivery, cargo, onDelete }:DeliveryItemProps) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    if (delivery.id) {
      const confirmDelete = window.confirm(`Tem certeza que deseja apagar a entrega para ${delivery.destination}?`);
      if (confirmDelete) {
        onDelete(delivery.id);
      }
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        {delivery.truckId}
      </td>
      <td className="px-6 py-4">
        {cargo.type}
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {new Date(delivery.startTime).toLocaleString()}
      </th>
      <td className="px-6 py-4">
        {delivery.endTime ? new Date(delivery.endTime).toLocaleString() : 'N/A'}
      </td>
      <td className="px-6 py-4">
        {delivery.destination}
      </td>
      <td className="px-6 py-4">
        {delivery.value.toFixed(2)}
      </td>
      <td className="px-6 py-4">
        {delivery.isValuable ? 'Sim' : 'Não'}
      </td>
      <td className="px-6 py-4">
        {delivery.isInsurance ? 'Sim' : 'Não'}
      </td>
      <td className="px-6 py-4">
        {delivery.isDangerous ? 'Sim' : 'Não'}
      </td>
      <td className="px-6 py-4 flex items-center space-x-4">
        <FaEdit
          className="text-blue-700 cursor-pointer"
          size={20}
          onClick={() => navigate(`/update-delivery/${delivery.id}`)}
        />
        <MdDelete
          className="text-red-700 cursor-pointer"
          size={20}
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
};

export default DeliveryItem;