export interface Truck {
  id: number;
  model: string;
  plateNumber: string;
  maxDeliveriesPerMonth: number;
  deliveriesCount: number;
}

import axios from 'axios';
import { CreateTruckDTO } from '../types/Truck';

const API_URL = 'https://transportadora-backend.onrender.com/trucks'; 

export const getTrucks = async (): Promise<Truck[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTruck = async (truck: CreateTruckDTO): Promise<Truck> => {
  const response = await axios.post(API_URL, truck);
  return response.data;
};

export const updateTruck = async (id: number, truck: Truck): Promise<Truck> => {
  const response = await axios.put(`${API_URL}/${id}`, truck);
  return response.data;
};

export const deleteTruck = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
