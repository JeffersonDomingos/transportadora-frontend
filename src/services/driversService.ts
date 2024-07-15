import axios from 'axios';

const API_URL = 'https://transportadora-backend.onrender.com/drivers';

export interface Driver {
  id: number;
  name: string;
  deliveriesCount: number;
}

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDrivers = async (drivers: { name: string; deliveriesPerMonth: number, deliveriesCount: number }) => {
  const response = await axios.post(API_URL, drivers);
  return response.data;
};

export const updateDrivers = async (id: number, drivers: { name: string; deliveriesPerMonth: number }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, drivers);
      return response.data;
    } catch (error) {
      console.error('Error updating truck:', error);
      throw error;
    }
  };

export const deleteDrivers = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
