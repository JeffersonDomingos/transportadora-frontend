import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface CargoItemProps {
  cargo: { id: number; description: string; type: string };
  onDelete: (id: number) => void;
}

const CargoItem = ({ cargo, onDelete }:CargoItemProps) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Tem certeza que deseja apagar a carga ${cargo.description}?`);
    if (confirmDelete) {
      onDelete(cargo.id);
    }
  };

  return (
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {cargo.description}
      </th>
      <td className="px-6 py-4">
        {cargo.type}
      </td>
      <td className="px-6 py-4 flex items-center space-x-4">
        <FaEdit
          className="text-blue-700 cursor-pointer"
          size={20}
          onClick={() => navigate(`/update-cargo/${cargo.id}`)}
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

export default CargoItem;
