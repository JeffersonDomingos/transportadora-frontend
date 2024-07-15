import axios from 'axios';

const API_URL = 'https://transportadora-backend.onrender.com/deliveries';

export interface Delivery {
  id?: number,
  startTime: string;
  endTime?: string;
  destination: string;
  value: number;
  isValuable?: boolean;
  isInsurance?: boolean;
  isDangerous?: boolean;
  truckId: number;
  cargoId?: number;
  driverId: number;
}

export const getDeliveries = async (): Promise<Delivery[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDelivery = async (delivery: Delivery): Promise<Delivery> => {
  const response = await axios.post(API_URL, delivery);
  return response.data;
};

export const updateDelivery = async (id: number, delivery: Delivery): Promise<Delivery> => {
  const response = await axios.put(`${API_URL}/${id}`, delivery);
  return response.data;
};

export const deleteDelivery = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
