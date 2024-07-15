import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';

interface TruckItemProps {
    truck: { id: number; model: string; plateNumber: string; maxDeliveriesPerMonth: number, deliveriesCount: number };
    onDelete: (id: number) => void;
}

const TruckItem: React.FC<TruckItemProps> = ({ truck, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Tem certeza que deseja apagar ${truck.model}?`);
        if (confirmDelete) {
            onDelete(truck.id);
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {truck.model}
            </th>
            <td className="px-6 py-4">
                {truck.plateNumber}
            </td>
            <td className="px-6 py-4">
                {truck.deliveriesCount}
            </td>
            <td className="px-6 py-4 flex items-center space-x-4">
                <FaEdit
                    className="text-blue-700 cursor-pointer"
                    size={25}
                    onClick={() => navigate(`/update-truck/${truck.id}`)}
                />

                <MdDelete
                    className="text-red-700 cursor-pointer"
                    size={25}
                    onClick={handleDelete}
                />

            </td>
        </tr>
    );
};

export default TruckItem;
