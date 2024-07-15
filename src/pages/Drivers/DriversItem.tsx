import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface DriverItemProps {
  driver: { id: number; name: string; deliveriesPerMonth: number, deliveriesCount: number };
  onDelete: (id: number) => void;
}

const DriverItem: React.FC<DriverItemProps> = ({ driver, onDelete }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    const confirmDelete = window.confirm(`Tem certeza que deseja apagar ${driver.name}?`);
    if (confirmDelete) {
      onDelete(driver.id);
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {driver.name}
      </th>
      <td className="px-6 py-4">
        {driver.deliveriesCount}
      </td>
      <td className="px-6 py-4 flex items-center space-x-4">
        <FaEdit
          className="text-blue-700 cursor-pointer"
          size={20}
          onClick={() => navigate(`/update-driver/${driver.id}`)}
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

export default DriverItem;
